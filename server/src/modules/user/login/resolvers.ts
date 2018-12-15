import * as bcrypt from "bcryptjs";

import { ResolveMap } from "../../../@types/graphql-utils";
import { GQL } from "../../../@types/schema";
import { User } from "../../../entity/User";
import { LoginValidation } from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError";
import { userSessionIdPrefix } from "../../../constants";

export const resolvers: ResolveMap = {
  Mutation: {
    login: async (
      _,
      args: GQL.ILoginOnMutationArguments,
      { session, redis, request }
    ) => {
      try {
        await LoginValidation.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return [
          {
            path: "email",
            message: "Correo incorrecto."
          }
        ];
      }

      if (!user.confirmed) {
        return [
          {
            path: "email",
            message: "Por favor confirme su correo."
          }
        ];
      }

      if (user.forgotPasswordLocked) {
        return [
          {
            path: "email",
            message: "Cambio de contraseña, esperando para activar."
          }
        ];
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return [
          {
            path: "password",
            message: "Contraseña incorrecta."
          }
        ];
      }

      // login successful
      session.userId = user.id;
      if (request.sessionID) {
        await redis.lpush(
          `${userSessionIdPrefix}${user.id}`,
          request.sessionID
        );
      }

      return null;
    }
  }
};
