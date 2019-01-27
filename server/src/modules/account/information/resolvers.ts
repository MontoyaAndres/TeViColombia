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
        { informationLoader }
      ) => informationLoader.load(id)
    )
  }
};
