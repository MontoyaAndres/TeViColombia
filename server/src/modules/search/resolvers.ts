import { getConnection } from "typeorm";

import { ResolveMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";
import FetchUserData from "./fetchUserData";
import FetchBusinessData from "./fetchBusinessData";
import { FeedBack } from "../../entity/FeedBack";
import { Business } from "../../entity/Business";
import { User } from "../../entity/User";
import mapOrder from "../../utils/mapOrder";

export const resolvers: ResolveMap = {
  Response: {
    __resolveType: obj => {
      // Only Users have the value `lastname`.
      if (obj.lastname) {
        return "UserSearchResponse";
      }

      // Only Businesses does not have the value `lastname`.
      if (!obj.lastname) {
        return "BusinessSearchResponse";
      }

      return null;
    }
  },
  Query: {
    search: async (
      _,
      {
        value,
        type,
        params: { user, business },
        limit
      }: GQL.ISearchOnQueryArguments
    ) => {
      let response: Array<User | Business> = [];

      if (type === "User") {
        response = await FetchUserData(value, user, limit);
      }

      if (type === "Business") {
        response = await FetchBusinessData(value, business, limit);
      }

      // Getting ids from `User` or `Business`.
      const ids = await response.map(res => res.id);

      if (ids.length > 0) {
        // From `ids`, getting the stars.
        const feedbackStars = await getConnection()
          .getRepository(FeedBack)
          .createQueryBuilder("feedback")
          .select("DISTINCT(feedback.toId)", "id")
          .addSelect("SUM(feedback.stars)", "stars")
          .where("feedback.toId IN (:...ids)", { ids })
          .andWhere("feedback.feedbackType = :type", { type })
          .groupBy("feedback.toId")
          .orderBy("stars", "DESC")
          .getRawMany();

        const idsFeedbackStars = feedbackStars.map(item => item.id);

        // When any user or business has 0 feedback, it means that is unnecessary to show its information.
        // To check this, this code only find if the ids from `idsFeedbackStars` and `response` exist.
        const result = response.filter(({ id }) =>
          idsFeedbackStars.includes(id)
        );

        return mapOrder(result, idsFeedbackStars, "id");
      }

      return null;
    }
  }
};
