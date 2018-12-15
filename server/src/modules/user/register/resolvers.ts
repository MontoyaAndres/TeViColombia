import { ResolveMap } from "../../../@types/graphql-utils";
import { RegisterValidation } from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError";
import { User } from "../../../entity/User";
import { sendConfirmEmailLink } from "../../../utils/sendEmail";
import { createConfimEmailLink } from "./createConfimEmailLink";
import { GQL } from "../../../@types/schema";

export const resolvers: ResolveMap = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await RegisterValidation.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const {
        name,
        lastname,
        email,
        telephone,
        identificationDocumentType,
        identificationDocument,
        password
      } = args;

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
        return [
          {
            path: "email",
            message: "El correo ya existe."
          }
        ];
      }

      if (telephoneAlreadyExists) {
        return [
          {
            path: "telephone",
            message: "El teléfono ya existe."
          }
        ];
      }

      if (identificationDocumentAlreadyExists) {
        return [
          {
            path: "identificationDocument",
            message: "El documento de identificación ya existe."
          }
        ];
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

      sendConfirmEmailLink(
        email,
        await createConfimEmailLink(url, user.id, redis)
      );

      return null;
    }
  }
};
