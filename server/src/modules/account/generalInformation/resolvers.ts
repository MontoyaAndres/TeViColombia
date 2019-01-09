import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
/* import { User } from "../../../entity/User";
import { PersonalSocialNetworks } from "../../../entity/PersonalSocialNetworks";
import { Languages } from "../../../entity/Languages";
import UpdateCreate from "../shared/UpdateCreate"; */
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
/* import { GeneralInformationValidation } from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError"; */

export const resolvers: ResolveMap = {
  Mutation: {
    generalInformation: createMiddleware(
      middleware.auth,
      async (
        _,
        { id, information }: GQL.IGeneralInformationOnMutationArguments
      ) => {
        // Examples and for profile and cover photos
        // https://github.com/prisma/graphql-yoga/tree/master/examples/file-upload
        // https://github.com/jaydenseric/graphql-upload/issues/49
        /* try {
          await GeneralInformationValidation.validate(
            {
              identificationDocument: information.identificationDocument,
              telephone: information.telephone,
              website: information.website
            },
            { abortEarly: false }
          );
        } catch (err) {
          return formatYupError(err);
        } */
        // Update images
        console.log(id, information.routePhoto, information.routeCover);

        // Update user information
        /* await User.update(
          { id },
          {
            name: information.name,
            lastname: information.lastname,
            description: information.description,
            identificationDocumentType: information.identificationDocumentType,
            identificationDocument: information.identificationDocument,
            address: information.address,
            telephone: information.telephone,
            departament: information.departament,
            city: information.city,
            civilStatus: information.civilStatus,
            website: information.website,
            gender: information.gender
          }
        );

        await Promise.all([
          UpdateCreate(PersonalSocialNetworks, id, information.socialnetwork),
          UpdateCreate(Languages, id, information.language)
        ]); */

        return null;
      }
    )
  }
};
