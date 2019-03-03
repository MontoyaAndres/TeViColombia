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
      { email, password }: GQL.ILoginOnMutationArguments,
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
            message: "El usuario no ha confirmado su correo."
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
          `${accountSessionIdPrefix}${user.id}`,
          request.sessionID
        );
      }

      return null;
    },
    loginBusiness: async (
      _,
      { email, password }: GQL.ILoginBusinessOnMutationArguments,
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

      const business = await Business.findOne({ where: { email } });

      if (!business) {
        return [
          {
            path: "email",
            message: "Correo incorrecto."
          }
        ];
      }

      if (!business.confirmed) {
        return [
          {
            path: "email",
            message: "La empresa no ha confirmado su correo."
          }
        ];
      }

      if (business.forgotPasswordLocked) {
        return [
          {
            path: "email",
            message: "Cambio de contraseña, esperando para activar."
          }
        ];
      }

      const valid = await bcrypt.compare(password, business.password);

      if (!valid) {
        return [
          {
            path: "password",
            message: "Contraseña incorrecta."
          }
        ];
      }

      // login successful
      session.userId = business.id;

      if (request.sessionID) {
        await redis.lpush(
          `${accountSessionIdPrefix}${business.id}`,
          request.sessionID
        );
      }

      return null;
    }
  }
};
