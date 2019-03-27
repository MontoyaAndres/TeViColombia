import { ResolveMap } from "../../../../types/graphql-utils";
import { createMiddleware } from "../../../../utils/createMiddleware";
import { middleware } from "../../../shared/authMiddleware";
import { GQL } from "../../../../types/schema";
import { Employ } from "../../../../entity/Employ";
import { EmployValidation } from "../../../../utils/validation";
import { formatYupError } from "../../../../utils/formatYupError";
import { sendApplyEmployEmail } from "../../../../utils/sendEmail";

export const resolvers: ResolveMap = {
  Query: {
    employs: async (_, { businessId, limit }: GQL.IEmploysOnQueryArguments) =>
      Employ.find({
        where: { business: { id: businessId } },
        order: { createdAt: "DESC" },
        skip: limit,
        take: 10
      }),
    employ: async (_, { employId }: GQL.IEmployOnQueryArguments) =>
      Employ.findOne({ where: { id: employId }, order: { createdAt: "DESC" } })
  },
  Mutation: {
    employ: createMiddleware(
      middleware.business,
      async (_, { id, employ }: GQL.IEmployOnMutationArguments) => {
        try {
          await EmployValidation.validate(
            {
              minExperience: employ.minExperience
            },
            {
              abortEarly: false
            }
          );
        } catch (err) {
          return formatYupError(err);
        }

        if (
          (employ.country !== "Colombia" &&
            employ.departament !== "Extranjero") ||
          (employ.country === "Colombia" && employ.departament === "Extranjero")
        ) {
          return [
            {
              path: "departament",
              message: "Departamento invalido."
            }
          ];
        }

        if (employ.id) {
          await Employ.update(
            { id: employ.id },
            {
              position: employ.position,
              description: employ.description,
              area: employ.area,
              skills: employ.skills,
              minStudy: employ.minStudy,
              minExperience: employ.minExperience,
              language: employ.language,
              travel: employ.travel,
              residence: employ.residence,
              country: employ.country,
              departament: employ.departament,
              town: employ.town,
              time: employ.time,
              contract: employ.contract,
              minSalary: employ.minSalary,
              maxSalary: employ.maxSalary,
              currency: employ.currency
            }
          );
        } else {
          await Employ.create({
            business: { id },
            ...employ
          }).save();
        }

        return null;
      }
    ),
    applyEmploy: createMiddleware(
      middleware.user,
      async (
        _,
        {
          userId,
          userName,
          userLastname,
          email,
          position
        }: GQL.IApplyEmployOnMutationArguments
      ) => {
        // Only users can get any employ.
        sendApplyEmployEmail(
          email,
          `${process.env.FRONTEND_HOST}/profile/user/${userId}`,
          userName,
          userLastname,
          position
        );

        return true;
      }
    ),
    deleteEmploy: createMiddleware(
      middleware.business,
      async (_, { employId }: GQL.IDeleteEmployOnMutationArguments) => {
        await Employ.delete({ id: employId });

        return true;
      }
    )
  }
};
