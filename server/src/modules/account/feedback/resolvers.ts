import { ResolveMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { User } from "../../../entity/User";
import { FeedBack } from "../../../entity/FeedBack";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";

export const resolvers: ResolveMap = {
  Feedback: {
    user: ({ receiver }) => User.findOne({ where: { id: receiver } })
  },
  Query: {
    feedback: createMiddleware(
      middleware.auth,
      async (_, { userId }: GQL.IFeedbackOnQueryArguments) => {
        const feedback = await FeedBack.find({
          where: { user: { id: userId } },
          order: { createdAt: "DESC" }
        });
        return feedback;
      }
    ),
    countFeedbackStars: createMiddleware(
      middleware.auth,
      async (_, { userId }: GQL.ICountFeedbackStarsOnQueryArguments) => {
        const response = await FeedBack.query(
          "SELECT SUM(stars) AS sum FROM feed_back WHERE userId = ?",
          [userId]
        );

        return response[0].sum;
      }
    )
  },
  Mutation: {
    feedback: createMiddleware(
      middleware.auth,
      async (
        _,
        { id, stars, comment }: GQL.IFeedbackOnMutationArguments,
        { session }
      ) => {
        const user = await User.findOne({ where: { id } });
        const alreadyCommented = await FeedBack.findOne({
          where: { user, receiver: session.userId }
        });

        if (id === session.userId) {
          return [
            {
              path: "stars",
              message: "No permitido."
            }
          ];
        }

        if (stars < 0) {
          return [
            {
              path: "stars",
              message: "Es necesario como minimo 1 estrasella."
            }
          ];
        }

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

        await FeedBack.create({
          user,
          receiver: session.userId,
          stars,
          comment
        }).save();

        return null;
      }
    ),
    deleteFeedback: createMiddleware(
      middleware.auth,
      async (_, { id }: GQL.IDeleteFeedbackOnMutationArguments) => {
        await FeedBack.delete({ id });
        return true;
      }
    )
  }
};
