import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { User } from "../../../entity/User";
import UpdateCreate from "../utils/UpdateCreate";
import { PersonalSocialNetworks } from "../../../entity/PersonalSocialNetworks";
import { Languages } from "../../../entity/Languages";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";

export const resolvers: ResolveMap = {
  Mutation: {
    generalInformation: createMiddleware(
      middleware.Mutation.auth,
      async (
        _,
        { id, information }: GQL.IGeneralInformationOnMutationArguments
      ) => {
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
            gender: information.gender,
            email: information.email
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
