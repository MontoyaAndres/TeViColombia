import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { Study } from "../../../entity/Study";
import { Work } from "../../../entity/Work";
import { CV } from "../../../entity/CV";
import UpdateCreate from "../shared/UpdateCreate";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";

export const resolvers: ResolveMap = {
  Mutation: {
    trainingEmployment: createMiddleware(
      middleware.auth,
      async (
        _,
        { id, information }: GQL.ITrainingEmploymentOnMutationArguments
      ) => {
        await Promise.all([
          UpdateCreate(Study, id, information.study),
          UpdateCreate(Work, id, information.work),
          UpdateCreate(CV, id, information.cv)
        ]);

        return true;
      }
    )
  }
};
