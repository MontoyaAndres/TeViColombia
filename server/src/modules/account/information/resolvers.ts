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
  }
};
