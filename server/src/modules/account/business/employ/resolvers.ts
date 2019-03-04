import { ResolveMap } from "../../../../types/graphql-utils";
import { createMiddleware } from "../../../../utils/createMiddleware";
import { middleware } from "../../../shared/authMiddleware";
import { GQL } from "../../../../types/schema";
import { Employ } from "../../../../entity/Employ";
import { EmployValidation } from "../../../../utils/validation";
import { formatYupError } from "../../../../utils/formatYupError";

export const resolvers: ResolveMap = {
  Query: {
    employs: async (_, { businessId }: GQL.IEmploysOnQueryArguments) =>
      Employ.find({ where: { business: { id: businessId } } }),
    employ: async (_, { employId }: GQL.IEmployOnQueryArguments) =>
      Employ.findOne({ where: { id: employId } })
  },
  Mutation: {
    employ: createMiddleware(
      middleware.auth,
      async (
        _,
        { employInput }: GQL.IEmployOnMutationArguments,
        { session }
      ) => {
        try {
          await EmployValidation.validate(
            {
              minExperience: employInput.minExperience
            },
            {
              abortEarly: false
            }
          );
        } catch (err) {
          return formatYupError(err);
        }

        if (
          (employInput.country !== "Colombia" &&
            employInput.departament !== "Extranjero") ||
          (employInput.country === "Colombia" &&
            employInput.departament === "Extranjero")
        ) {
          return [
            {
              path: "departament",
              message: "Departamento invalido."
            }
          ];
        }

        if (employInput.id) {
          await Employ.update(
            { id: employInput.id },
            {
              position: employInput.position,
              description: employInput.description,
              minStudy: employInput.minStudy,
              minExperience: employInput.minExperience,
              language: employInput.language,
              travel: employInput.travel,
              residence: employInput.residence,
              country: employInput.country,
              departament: employInput.departament,
              town: employInput.town,
              time: employInput.time,
              contract: employInput.contract,
              minSalary: employInput.minSalary,
              maxSalary: employInput.maxSalary,
              currency: employInput.currency
            }
          );
        } else {
          await Employ.create({
            business: { id: session.userId },
            ...employInput
          }).save();
        }

        return null;
      }
    ),
    deleteEmploy: createMiddleware(
      middleware.auth,
      async (_, { employId }: GQL.IDeleteEmployOnMutationArguments) => {
        await Employ.delete({ id: employId });

        return true;
      }
    )
  }
};
