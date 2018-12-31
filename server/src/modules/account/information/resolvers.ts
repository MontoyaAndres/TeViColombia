import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
import { User } from "../../../entity/User";

export const resolvers: ResolveMap = {
  Feedback: {
    user: ({ receiver }) => User.findOne({ where: { receiver } })
  },
  Query: {
    information: createMiddleware(
      middleware.auth,
      async (
        _,
        { id }: GQL.IInformationOnQueryArguments,
        { informationLoader }
      ) => informationLoader.load(id)
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
