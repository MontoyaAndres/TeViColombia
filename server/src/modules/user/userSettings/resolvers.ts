import * as bcrypt from "bcryptjs";

import { ResolveMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
import { GQL } from "../../../types/schema";
import { UserConfigurationValidation } from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError";
import { User } from "../../../entity/User";
import { removeAllUsersSessions } from "../../../utils/removeAllUsersSessions";

export const resolvers: ResolveMap = {
  Mutation: {
    userSettings: createMiddleware(
      middleware.auth,
      async (
        _,
        { email, password, newPassword }: GQL.IUserSettingsOnMutationArguments,
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

        const user = await User.findOne({ where: { id: session.userId } });

        if (password || newPassword) {
          const checkPassword = await bcrypt.compare(password, user.password);

          if (!checkPassword) {
            return [
              {
                path: "password",
                message: "Contraseña incorrecta."
              }
            ];
          }

          const hashedPassword = await bcrypt.hash(newPassword, 10);

          await User.update(
            { id: session.userId },
            { password: hashedPassword }
          );
        }

        await removeAllUsersSessions(session.userId, redis);

        await User.update({ id: session.userId }, { email });
        return null;
      }
    )
  }
};
