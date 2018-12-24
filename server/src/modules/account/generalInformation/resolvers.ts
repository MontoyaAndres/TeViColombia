import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { User } from "../../../entity/User";
import socialnetwork from "./update/socialnetwork";
import university from "./update/university";
import language from "./update/language";

export const resolvers: ResolveMap = {
  Mutation: {
    generalInformation: async (
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
        socialnetwork(id, information),
        university(id, information),
        language(id, information)
      ]);

      return true;
    }
  }
};
