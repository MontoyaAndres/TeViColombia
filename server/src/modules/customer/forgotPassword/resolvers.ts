import * as bcrypt from "bcryptjs";

import { ResolveMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Business } from "../../../entity/Business";
import { GQL } from "../../../types/schema";
import { createForgotPasswordLink } from "./createForgotPasswordLink";
import { forgotPasswordPrefix } from "../../../constants";
import { formatYupError } from "../../../utils/formatYupError";
import { sendForgotPasswordEmailLink } from "../../../utils/sendEmail";
import { ForgotPasswordValidation } from "../../../utils/validation";
import { forgotPasswordLockAccount } from "./forgotPasswordLockAccount";

export const resolvers: ResolveMap = {
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email, type }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      { redis }
    ) => {
      const account =
        type === "User"
          ? await User.findOne({ where: { email } })
          : await Business.findOne({ where: { email } });

      if (!account) {
        return [
          {
            path: "email",
            message: "El correo electrónico no fue encontrado."
          }
        ];
      }

      await forgotPasswordLockAccount(account.id, type, redis);
      const url = await createForgotPasswordLink(
        process.env.FRONTEND_HOST as string,
        account.id,
        type,
        redis
      );

      sendForgotPasswordEmailLink(email, url);
      return null;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key, type }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;

      const accountId = await redis.get(redisKey);

      if (!accountId) {
        return [
          {
            path: "newPassword",
            message: "La llave ha caducado."
          }
        ];
      }

      try {
        await ForgotPasswordValidation.validate(
          { newPassword },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatePromise =
        type === "User"
          ? User.update(
              { id: accountId },
              {
                forgotPasswordLocked: false,
                password: hashedPassword
              }
            )
          : Business.update(
              { id: accountId },
              {
                forgotPasswordLocked: false,
                password: hashedPassword
              }
            );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updatePromise, deleteKeyPromise]);

      return null;
    }
  }
};
