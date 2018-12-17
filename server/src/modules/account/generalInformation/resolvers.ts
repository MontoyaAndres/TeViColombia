import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { User } from "../../../entity/User";

export const resolvers: ResolveMap = {
  Query: {
    generalInformation: async (
      _,
      { id }: GQL.IGeneralInformationOnQueryArguments,
      { session }
    ) => {
      const user = await User.findOne({
        where: { id: id ? id : session.userId },
        relations: ["socialnetwork", "language"]
      });

      return user;
    }
  }
};
