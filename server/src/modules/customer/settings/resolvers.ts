import * as bcrypt from "bcryptjs";

import { ResolveMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
import { GQL } from "../../../types/schema";
import { UserConfigurationValidation } from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError";
import { User } from "../../../entity/User";
import { Business } from "../../../entity/Business";
import { removeAllUsersSessions } from "../../../utils/removeAllUsersSessions";

export const resolvers: ResolveMap = {
  Mutation: {
    settings: createMiddleware(
      middleware.auth,
      async (
        _,
        {
          email,
          password,
          newPassword,
          type
        }: GQL.ISettingsOnMutationArguments,
        { session, redis }
      ) => {
        try {
          await UserConfigurationValidation.validate(
            { email, password, newPassword },
            { abortEarly: false }
          );
        } catch (err) {
          return formatYupError(err);
        }

        const account =
          type === "User"
            ? await User.findOne({ where: { id: session.userId } })
            : await Business.findOne({ where: { id: session.userId } });

        if (password || newPassword) {
          const checkPassword = await bcrypt.compare(
            password,
            account.password
          );

          if (!checkPassword) {
            return [
              {
                path: "password",
                message: "Contraseña incorrecta."
              }
            ];
          }

          const hashedPassword = await bcrypt.hash(newPassword, 10);

          if (type === "User") {
            await User.update(
              { id: session.userId },
              { password: hashedPassword }
            );
          } else if (type === "Business") {
            await Business.update(
              { id: session.userId },
              { password: hashedPassword }
            );
          }
        }

        await removeAllUsersSessions(session.userId, redis);

        if (type === "User") {
          await User.update({ id: session.userId }, { email });
        } else if (type === "Business") {
          await Business.update({ id: session.userId }, { email });
        }

        return null;
      }
    )
  }
};
