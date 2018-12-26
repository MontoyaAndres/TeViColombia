import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { PersonalFeedBack } from "../../../entity/PersonalFeedBack";

export const resolvers: ResolveMap = {
  Mutation: {
    feedback: async (
      _,
      { id, stars, comment }: GQL.IFeedbackOnMutationArguments
    ) => {
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
    },
    deleteFeedback: async (_, __, { session }) => {
      await PersonalFeedBack.delete({ user: session.userId as any });
      return true;
    }
  }
};
