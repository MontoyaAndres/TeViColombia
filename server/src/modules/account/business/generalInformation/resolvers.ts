import { Like, getRepository } from "typeorm";

import { ResolveMap } from "../../../../types/graphql-utils";
import { createMiddleware } from "../../../../utils/createMiddleware";
import { middleware } from "../../../shared/authMiddleware";
import { GQL } from "../../../../types/schema";
import { formatYupError } from "../../../../utils/formatYupError";
import { GeneralInformationBusinessValidation } from "../../../../utils/validation";
import storeUpload from "../../../../utils/storeUpload";
import { Business } from "../../../../entity/Business";
import { User } from "../../../../entity/User";

export const resolvers: ResolveMap = {
  Query: {
    informationBusiness: async (
      _,
      { id }: GQL.IInformationBusinessOnQueryArguments,
      { informationBusinessLoader }
    ) => informationBusinessLoader.load(id),
    searchMember: createMiddleware(
      middleware.business,
      (_, { value }: GQL.ISearchMemberOnQueryArguments) =>
        User.find({
          where: { email: Like(`%${value}%`) },
          take: 10
        })
    )
  },
  Mutation: {
    generalInformationBusiness: createMiddleware(
      middleware.business,
      async (
        _,
        { id, information }: GQL.IGeneralInformationBusinessOnMutationArguments
      ) => {
        try {
          await GeneralInformationBusinessValidation.validate(
            {
              name: information.name,
              description: information.description,
              telephone: information.telephone,
              telephone2: information.telephone2,
              website: information.website
            },
            {
              abortEarly: false
            }
          );
        } catch (err) {
          return formatYupError(err);
        }

        if (
          (information.nationality !== "Colombia" &&
            information.departament !== "Extranjero") ||
          (information.nationality === "Colombia" &&
            information.departament === "Extranjero")
        ) {
          return [
            {
              path: "departament",
              message: "Departamento invalido."
            }
          ];
        }

        if (information.description.length > 100) {
          return [
            {
              path: "description",
              message: "La descripción no puede tener más de 100 caracteres."
            }
          ];
        }

        if (information.routePhoto instanceof Object) {
          const { createReadStream, mimetype } = await information.routePhoto;
          const extension = mimetype.split("/")[1];

          if (
            extension === "png" ||
            extension === "jpeg" ||
            extension === "gif"
          ) {
            const stream = createReadStream();
            const { fileId } = await storeUpload(
              stream,
              mimetype,
              `public/businessPhoto`
            );
            await Business.update(
              { id },
              { routePhoto: `businessPhoto/${fileId}` }
            );
          } else {
            return [
              {
                path: "businessPhoto",
                message: "Por favor suba una imagen."
              }
            ];
          }
        }

        if (information.routeCover instanceof Object) {
          const { createReadStream, mimetype } = await information.routeCover;
          const extension = mimetype.split("/")[1];

          if (
            extension === "png" ||
            extension === "jpeg" ||
            extension === "gif"
          ) {
            const stream = createReadStream();
            const { fileId } = await storeUpload(
              stream,
              mimetype,
              `public/businessCover`
            );
            await Business.update(
              { id },
              { routeCover: `businessCover/${fileId}` }
            );
          } else {
            return [
              {
                path: "businessCover",
                message: "Por favor suba una imagen."
              }
            ];
          }
        }

        // Members of a business
        const users = await User.findByIds(information.memberUser || []);

        // Update business information
        const postdata = await getRepository(Business).findOne(id);
        postdata.name = information.name;
        postdata.description = information.description;
        postdata.address = information.address;
        postdata.telephoneCountry = information.telephoneCountry;
        postdata.telephone = information.telephone;
        postdata.telephone2Country = information.telephone2Country;
        postdata.telephone2 = information.telephone2;
        postdata.departament = information.departament;
        postdata.town = information.town;
        postdata.nationality = information.nationality;
        postdata.sector = information.sector;
        postdata.website = information.website;
        postdata.googleMapsLocalization = information.googleMapsLocalization;
        postdata.optionalEmail = information.optionalEmail;
        postdata.socialnetwork = information.socialnetwork;
        postdata.skills = information.skills;
        postdata.member = users || null;
        await getRepository(Business).save(postdata);

        return null;
      }
    )
  }
};
