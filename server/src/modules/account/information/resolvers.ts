import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";

export const resolvers: ResolveMap = {
  Query: {
    information: createMiddleware(
      middleware.Mutation.auth,
      async (
        _,
        { id }: GQL.IInformationOnQueryArguments,
        { session, informationLoader }
      ) => informationLoader.load(id ? id : session.userId!)
    )
  }
};
