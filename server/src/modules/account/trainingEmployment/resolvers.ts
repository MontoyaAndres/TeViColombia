import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { University } from "../../../entity/University";
import { SecondarySchool } from "../../../entity/SecondarySchool";
import { Work } from "../../../entity/Work";
import { CV } from "../../../entity/CV";
import UpdateCreate from "../utils/UpdateCreate";
import professionalAptitudes from "./professionalAptitudes";
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
          UpdateCreate(University, id, information.university),
          UpdateCreate(SecondarySchool, id, information.secondaryschool),
          UpdateCreate(Work, id, information.work),
          UpdateCreate(CV, id, information.cv),
          professionalAptitudes(id, information)
        ]);

        return true;
      }
    )
  }
};
