import * as bcrypt from "bcryptjs";

import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { User } from "../../../entity/User";
import { Business } from "../../../entity/Business";
import { LoginValidation } from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError";
import { accountSessionIdPrefix } from "../../../constants";

export const resolvers: ResolveMap = {
  Mutation: {
    login: async (
      _,
      { email, password, signInAS }: GQL.ILoginOnMutationArguments,
      { session, redis, request }
    ) => {
      try {
        await LoginValidation.validate(
          { email, password },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      // Who want to log in, an user or a business
      const account =
        signInAS === "User"
          ? await User.findOne({ where: { email } })
          : await Business.findOne({ where: { email } });

      if (!account) {
        return [
          {
            path: "email",
            message: "Correo incorrecto."
          }
        ];
      }

      if (!account.confirmed) {
        return [
          {
            path: "email",
            message: "El usuario no ha confirmado su correo."
          }
        ];
      }

      if (account.forgotPasswordLocked) {
        return [
          {
            path: "email",
            message: "Cambio de contraseña, esperando para activar."
          }
        ];
      }

      const valid = await bcrypt.compare(password, account.password);

      if (!valid) {
        return [
          {
            path: "password",
            message: "Contraseña incorrecta."
          }
        ];
      }

      // login successful
      session.userId = account.id;

      if (request.sessionID) {
        await redis.lpush(
          `${accountSessionIdPrefix}${account.id}`,
          request.sessionID
        );
      }

      return null;
    }
  }
};
