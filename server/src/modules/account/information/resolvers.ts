import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";

export const resolvers: ResolveMap = {
  Query: {
    information: async (
      _,
      { id }: GQL.IInformationOnQueryArguments,
      { session, informationLoader }
    ) => informationLoader.load(id ? id : session.userId!)
  }
};
