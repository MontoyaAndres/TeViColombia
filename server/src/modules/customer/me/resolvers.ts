import { ResolveMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Business } from "../../../entity/Business";
import { createMiddleware } from "../../../utils/createMiddleware";
import middleware from "./middleware";

export const resolvers: ResolveMap = {
  Query: {
    me: createMiddleware(middleware, async (_, __, { session }) => {
      const user = await User.findOne({ where: { id: session.userId } });
      const business = await Business.findOne({
        where: { id: session.userId }
      });

      if (user) {
        return {
          type: "User",
          ...user
        };
      }

      if (business) {
        return {
          type: "Business",
          ...business
        };
      }

      return null;
    })
  }
};
