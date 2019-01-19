import { ResolveMap } from "../../../types/graphql-utils";

export const resolvers: ResolveMap = {
  Mutation: {
    logout: async (_, __, { session }) => {
      const { userId } = session;
      if (userId) {
        session.destroy(err => {
          if (err) {
            console.log(err);
          }
        });
        return true;
      }

      return false;
    }
  }
};
