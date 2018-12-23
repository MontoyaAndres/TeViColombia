import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
/* import { User } from "../../../entity/User";
import { PersonalSocialNetworks } from "../../../entity/PersonalSocialNetworks"; */

export const resolvers: ResolveMap = {
  Query: {
    information: async (
      _,
      { id }: GQL.IInformationOnQueryArguments,
      { session, informationLoader }
    ) => informationLoader.load(id ? id : session.userId!)
  },
  Mutation: {
    updateInformation: (
      _,
      { id, information }: GQL.IUpdateInformationOnMutationArguments
    ) => {
      console.log(id, information);
      /* const socialnetwork = new PersonalSocialNetworks();
      (socialnetwork as any) = information!.socialnetwork;

      User.update(
        {
          id
        },
        {
          ...(information as any)
        }
      ); */
      return true;
    }
  }
};
