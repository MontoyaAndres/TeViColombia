import { ResolveMap } from "../../../types/graphql-utils";
import {
  RegisterValidation,
  RegisterBusinessValidation
} from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError";
import { User } from "../../../entity/User";
import { sendConfirmEmailLink } from "../../../utils/sendEmail";
import { createConfimEmailLink } from "./createConfimEmailLink";
import { GQL } from "../../../types/schema";
import { Business } from "../../../entity/Business";

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
        telephoneCountry,
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
        telephoneCountry,
        telephone,
        identificationDocumentType,
        identificationDocument,
        password
      });

      await user.save();

      sendConfirmEmailLink(
        email,
        await createConfimEmailLink(url, "User", user.id, redis)
      );

      return null;
    },
    registerBusiness: async (
      _,
      {
        name,
        telephone,
        telephoneCountry,
        sector,
        email,
        password
      }: GQL.IRegisterBusinessOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await RegisterBusinessValidation.validate(
          { name, telephone, email, password },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      const nameAlreadyExists = await Business.findOne({
        where: { name },
        select: ["id"]
      });

      const emailAlreadyExists = await Business.findOne({
        where: { email },
        select: ["id"]
      });

      const telephoneAlreadyExists = await Business.findOne({
        where: { telephone },
        select: ["id"]
      });

      if (nameAlreadyExists) {
        return [
          {
            path: "name",
            message: "El nombre de la compañia ya existe."
          }
        ];
      }

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

      const business = Business.create({
        name,
        telephoneCountry,
        telephone,
        sector,
        email,
        password
      });

      await business.save();

      sendConfirmEmailLink(
        email,
        await createConfimEmailLink(url, "Business", business.id, redis)
      );

      return null;
    }
  }
};
