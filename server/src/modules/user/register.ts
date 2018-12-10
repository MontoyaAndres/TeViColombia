import { RegisterValidation } from "../../utils/validation";
import { ResolverMap } from "../../types/resolvers-utils";
import { formatYupError } from "../../utils/formatYupError";
import { User } from "../../entity/User";
import { createConfimEmailLink } from "../../utils/createConfimEmailLink";
import { sendEmailLink } from "../../utils/sendEmail";
import { redis } from "../../redis";

const resolvers: ResolverMap = {
  async register(request, response) {
    const body = request.body;

    try {
      await RegisterValidation.validate(body, { abortEarly: false });
    } catch (err) {
      response.send({
        ok: false,
        errors: formatYupError(err)
      });
      return;
    }

    const {
      name,
      lastname,
      email,
      telephone,
      identificationDocumentType,
      identificationDocument,
      password
    } = body;

    const emailAlreadyExists = await User.findOne({
      where: { email },
      select: ["id"]
    });

    const telephoneAlreadyExists = await User.findOne({
      where: { telephone },
      select: ["id"]
    });

    const identificationDocumentAlreadyExists = await User.findOne({
      where: { identificationDocument },
      select: ["id"]
    });

    if (emailAlreadyExists) {
      response.send({
        ok: false,
        errors: [
          {
            path: "email",
            message: "El correo ya existe."
          }
        ]
      });
      return;
    }

    if (telephoneAlreadyExists) {
      response.send({
        ok: false,
        errors: [
          {
            path: "telephone",
            message: "El teléfono ya existe."
          }
        ]
      });
      return;
    }

    if (identificationDocumentAlreadyExists) {
      response.send({
        ok: false,
        errors: [
          {
            path: "identificationDocument",
            message: "El documento de identificación ya existe."
          }
        ]
      });
      return;
    }

    const user = User.create({
      name,
      lastname,
      email,
      telephone,
      identificationDocumentType,
      identificationDocument,
      password
    });

    await user.save();

    sendEmailLink(
      email,
      await createConfimEmailLink(
        request.protocol + "://" + request.get("host"), // backend host
        user.id,
        redis
      )
    );

    response.send({ ok: true });
  }
};

export default resolvers;
