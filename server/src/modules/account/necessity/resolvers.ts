import { ResolveMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import { middleware } from "../../shared/authMiddleware";
import { GQL } from "../../../types/schema";
import { Necessity } from "../../../entity/Necessity";
import { User } from "../../../entity/User";

export const resolvers: ResolveMap = {
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
    editNecessity: createMiddleware(
      middleware.auth,
      async (
        _,
        {
          idNecessity,
          finished,
          comment
        }: GQL.IEditNecessityOnMutationArguments
      ) => {
        await Necessity.update({ id: idNecessity }, { finished, comment });
        return true;
      }
    ),
    deleteNecessity: createMiddleware(
      middleware.auth,
      async (_, { idNecessity }: GQL.IDeleteNecessityOnMutationArguments) => {
        await Necessity.delete({ id: idNecessity });
        return true;
      }
    )
  }
};
