import * as bcrypt from "bcryptjs";

import { ResolveMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
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
      { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      { redis }
    ) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return [
          {
            path: "email",
            message: "El correo electrónico no fue encontrado."
          }
        ];
      }

      await forgotPasswordLockAccount(user.id, redis);
      const url = await createForgotPasswordLink(
        process.env.FRONTEND_HOST as string,
        user.id,
        redis
      );

      sendForgotPasswordEmailLink(email, url);
      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;

      const userId = await redis.get(redisKey);

      if (!userId) {
        return [
          {
            path: "key",
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

      const updatePromise = User.update(
        { id: userId },
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
