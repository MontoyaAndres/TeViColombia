import { In } from "typeorm";

import { ResolveMap } from "../../../../types/graphql-utils";
import { GQL } from "../../../../types/schema";
import { User } from "../../../../entity/User";
import { Business } from "../../../../entity/Business";
import { FeedBack } from "../../../../entity/FeedBack";
import { createMiddleware } from "../../../../utils/createMiddleware";
import { middleware } from "../../../shared/authMiddleware";
import { sendFeedbackEmail } from "../../../../utils/sendEmail";

export const resolvers: ResolveMap = {
  Feedback: {
    from: async ({ fromId }) => {
      const user = await User.findOne({
        where: { id: fromId }
      });
      const business = await Business.findOne({
        where: { id: fromId }
      });

      if (Object.keys(user).length) {
        return user;
      }

      if (Object.keys(business).length) {
        return business;
      }

      return null;
    }
  },
  Query: {
    feedback: createMiddleware(
      middleware.auth,
      async (_, { id, type }: GQL.IFeedbackOnQueryArguments) =>
        FeedBack.find({
          where: { toId: id, feedbackType: type },
          order: { createdAt: "DESC" }
        })
    ),
    countFeedbackStars: createMiddleware(
      middleware.auth,
      async (_, { id, type }: GQL.ICountFeedbackStarsOnQueryArguments) => {
        const response = await FeedBack.query(
          "SELECT SUM(stars) AS sum FROM feed_back WHERE toId = ? AND feedbackType = ?",
          [id, type]
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
        { toId, stars, comment }: GQL.IFeedbackOnMutationArguments,
        { session }
      ) => {
        const user: Array<{
          id: string;
        }> = await User.find({
          where: { id: session.userId },
          select: ["id"]
        });
        const business: Array<{
          id: string;
        }> = await Business.find({
          where: { id: session.userId },
          select: ["id"]
        });

        const accountsIds = await user.concat(business).map(value => value.id);

        if (accountsIds.length > 0) {
          const alreadyCommented = await FeedBack.findOne({
            where: { fromId: In(accountsIds) }
          });

          if (alreadyCommented) {
            return [
              {
                path: "comment",
                message: "No puede comentar más de una vez."
              }
            ];
          }
        }

        if (toId === session.userId) {
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

        await FeedBack.create({
          toId,
          fromId: session.userId,
          feedbackType: user.length > 0 ? "User" : "Business",
          stars,
          comment
        }).save();

        // Getting name and email from toId
        const toUser = await User.findOne({
          where: { id: toId },
          select: ["name", "email"]
        });
        const toBusiness = await Business.findOne({
          where: { id: toId },
          select: ["name", "email"]
        });

        sendFeedbackEmail(
          toUser.email ? toUser.email : toBusiness.email,
          toUser.name ? toUser.name : toBusiness.name,
          comment
        );

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
