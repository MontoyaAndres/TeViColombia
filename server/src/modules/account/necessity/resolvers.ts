import { ResolveMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
import { GQL } from "../../../types/schema";
import { Necessity } from "../../../entity/Necessity";
import { User } from "../../../entity/User";

export const resolvers: ResolveMap = {
  Query: {
    necessity: createMiddleware(
      middleware.auth,
      async (_, { userId }: GQL.INecessityOnQueryArguments) => {
        const necessity = await Necessity.find({
          where: {
            user: {
              id: userId
            }
          },
          order: { updatedAt: "DESC" }
        });

        return necessity;
      }
    ),
    countNecessity: createMiddleware(
      middleware.auth,
      async (_, { userId }: GQL.ICountNecessityOnQueryArguments) =>
        Necessity.count({
          where: {
            user: {
              id: userId
            },
            finished: false
          }
        })
    )
  },
  Mutation: {
    necessity: createMiddleware(
      middleware.auth,
      async (
        _,
        { finished, comment }: GQL.INecessityOnMutationArguments,
        { session }
      ) => {
        const user = await User.findOne({ where: { id: session.userId } });
        await Necessity.create({ finished, comment, user }).save();
        return true;
      }
    ),
    updateNecessity: createMiddleware(
      middleware.auth,
      async (
        _,
        { id, finished, comment }: GQL.IUpdateNecessityOnMutationArguments
      ) => {
        await Necessity.update({ id }, { finished, comment });
        return true;
      }
    ),
    deleteNecessity: createMiddleware(
      middleware.auth,
      async (_, { id }: GQL.IDeleteNecessityOnMutationArguments) => {
        await Necessity.delete({ id });
        return true;
      }
    )
  }
};
