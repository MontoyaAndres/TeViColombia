import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { User } from "../../../entity/User";

export const resolvers: ResolveMap = {
  Query: {
    information: async (
      _,
      { id }: GQL.IInformationOnQueryArguments,
      { session }
    ) => {
      const user = await User.findOne({
        where: { id: id ? id : session.userId },
        relations: [
          "socialnetwork",
          "language",
          "university",
          "secondaryschool",
          "work",
          "cv",
          "professionalAptitude",
          "feedback",
          "necessity",
          "commercialEstablishment"
        ]
      });

      return user;
    }
  },
  Mutation: {
    updateInformation: (_, args: GQL.IUpdateInformationOnMutationArguments) => {
      console.log(args);
      return true;
    }
  }
};
