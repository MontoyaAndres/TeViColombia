import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { User } from "../../../entity/User";
import { PersonalSocialNetworks } from "../../../entity/PersonalSocialNetworks";
import { Languages } from "../../../entity/Languages";
import UpdateCreate from "../utils/UpdateCreate";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
import { GeneralInformationValidation } from "../../../utils/validation";
import { formatYupError } from "../../../utils/formatYupError";

export const resolvers: ResolveMap = {
  Mutation: {
    generalInformation: createMiddleware(
      middleware.Mutation.auth,
      async (
        _,
        { id, information }: GQL.IGeneralInformationOnMutationArguments
      ) => {
        try {
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
        }

        // Update user information
        await User.update(
          { id },
          {
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
        ]);

        return true;
      }
    )
  }
};
