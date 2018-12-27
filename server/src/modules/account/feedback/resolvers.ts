import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { PersonalFeedBack } from "../../../entity/PersonalFeedBack";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";

export const resolvers: ResolveMap = {
  Mutation: {
    feedback: createMiddleware(
      middleware.auth,
      async (_, { id, stars, comment }: GQL.IFeedbackOnMutationArguments) => {
        const alreadyCommented = await PersonalFeedBack.findOne({
          where: { user: id, commented: true }
        });

        if (stars > 5) {
          return [
            {
              path: "stars",
              message: "No puede añadir más de 5 estrellas."
            }
          ];
        }

        if (alreadyCommented) {
          return [
            {
              path: "comment",
              message: "No puede comentar más de una vez."
            }
          ];
        }

        await PersonalFeedBack.create({
          user: id as any,
          comment,
          stars: stars as any,
          commented: true
        }).save();

        return null;
      }
    ),
    deleteFeedback: createMiddleware(
      middleware.auth,
      async (_, __, { session }) => {
        await PersonalFeedBack.delete({ user: session.userId as any });
        return true;
      }
    )
  }
};
