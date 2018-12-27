import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";

export const resolvers: ResolveMap = {
  Query: {
    information: createMiddleware(
      middleware.auth,
      async (
        _,
        { id }: GQL.IInformationOnQueryArguments,
        { session, informationLoader }
      ) => informationLoader.load(id ? id : session.userId!)
    )
  },
  Mutation: {
    information: createMiddleware(
      middleware.auth,
      async (
        _,
        {
          id,
          name,
          lastname,
          routePhoto,
          routeCover
        }: GQL.IInformationOnMutationArguments
      ) => {
        // Examples
        // https://github.com/prisma/graphql-yoga/tree/master/examples/file-upload
        // https://github.com/jaydenseric/graphql-upload/issues/49
        console.log(id, name, lastname, routePhoto, routeCover);
        return null;
      }
    )
  }
};
