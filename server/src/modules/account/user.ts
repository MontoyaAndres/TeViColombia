import * as bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { ResolverMap } from "../../@@types/resolvers-utils";
import { UserConfiguration } from "../../utils/validation";
import { formatYupError } from "../../utils/formatYupError";

const resolvers: ResolverMap = {
  async generalInformation(request, response) {
    if (request.session) {
      const user = await User.findOne({
        select: [
          "description",
          "identificationDocumentType",
          "identificationDocument",
          "address",
          "telephone",
          "departament",
          "city",
          "civilStatus",
          "website",
          "gender",
          "email"
        ],
        where: { id: request.session.userId },
        relations: ["socialnetwork", "language"]
      });

      response.send({ ok: true, user });
    }
  },
  async updateUser(request, response) {
    const body = request.body;

    try {
      await UserConfiguration.validate(body, { abortEarly: false });
    } catch (err) {
      response.send({
        ok: false,
        errors: formatYupError(err)
      });
      return;
    }

    const { name, lastname, email, oldPassword, newPassword } = body;

    if (request.session) {
      const user = await User.findOne({
        where: { id: request.session.userId }
      });

      if (user) {
        if (oldPassword || newPassword) {
          const checkPassword = await bcrypt.compare(
            oldPassword,
            user.password
          );

          if (!checkPassword) {
            response.send({
              ok: false,
              errors: [
                {
                  path: "oldPassword",
                  message: "Contraseña incorrecta."
                }
              ]
            });
            return;
          }

          const hashedPassword = await bcrypt.hash(newPassword, 10);

          await User.update(
            { id: request.session.userId },
            { password: hashedPassword }
          );
        }

        await User.update(
          { id: request.session.userId },
          { name, lastname, email }
        );

        response.send({ ok: true });
        return;
      }
    }
  }
};

export default resolvers;
