import { ResolveMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
import { GQL } from "../../../types/schema";

export const resolvers: ResolveMap = {
  Mutation: {
    portafolio: createMiddleware(
      middleware.auth,
      async (
        _,
        { multimedia, description }: GQL.IPortafolioOnMutationArguments
      ) => {
        console.log(multimedia, description);
      }
    )
  }
};
