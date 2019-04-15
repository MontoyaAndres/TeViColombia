import { ResolveMap } from "../../../../types/graphql-utils";
import { createMiddleware } from "../../../../utils/createMiddleware";
import { middleware } from "../../../shared/authMiddleware";
import { GQL } from "../../../../types/schema";
import { Necessity } from "../../../../entity/Necessity";
import { User } from "../../../../entity/User";

export const resolvers: ResolveMap = {
  Query: {
    necessity: createMiddleware(
      middleware.auth,
      async (_, { userId, limit }: GQL.INecessityOnQueryArguments) => {
        const response = await Necessity.find({
          where: {
            user: {
              id: userId
            }
          },
          order: { updatedAt: "DESC" },
          skip: limit,
          take: 10
        });

        const count = await Necessity.count({
          where: {
            user: {
              id: userId
            },
            finished: false
          }
        });

        return {
          response,
          count
        };
      }
    )
  },
  Mutation: {
    necessity: createMiddleware(
      middleware.user,
      async (
        _,
        { finished, comment }: GQL.INecessityOnMutationArguments,
        { session }
      ) => {
        if (comment.length < 3) {
          return [
            {
              path: "comment",
              message: "Debe de añadir un comentario más largo"
            }
          ];
        }

        const user = await User.findOne({ where: { id: session.userId } });
        await Necessity.create({ finished, comment, user }).save();
        return null;
      }
    ),
    updateNecessity: createMiddleware(
      middleware.user,
      async (
        _,
        { id, finished, comment }: GQL.IUpdateNecessityOnMutationArguments
      ) => {
        if (comment.length < 3) {
          return [
            {
              path: "comment",
              message: "Debe de añadir un comentario más largo"
            }
          ];
        }

        await Necessity.update({ id }, { finished, comment });
        return null;
      }
    ),
    deleteNecessity: createMiddleware(
      middleware.user,
      async (_, { id }: GQL.IDeleteNecessityOnMutationArguments) => {
        await Necessity.delete({ id });
        return true;
      }
    )
  }
};
