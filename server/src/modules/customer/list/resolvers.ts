import { getConnection } from "typeorm";

import { ResolveMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Business } from "../../../entity/Business";
import mapOrder from "../../../utils/mapOrder";

interface Stars {
  id: string;
  stars: string;
}

export const resolvers: ResolveMap = {
  Query: {
    list: async () => {
      // Getting the count of stars from 10 users.
      const userStars: Stars[] = await getConnection().query(
        "SELECT DISTINCT(toId) AS id, SUM(stars) AS stars FROM feed_back WHERE feedbackType = 'User' GROUP BY toId ORDER BY stars DESC LIMIT 10"
      );

      // Getting the count of stars from 10 businesses.
      const businessStars: Stars[] = await getConnection().query(
        "SELECT DISTINCT(toId) AS id, SUM(stars) AS stars FROM feed_back WHERE feedbackType = 'Business' GROUP BY toId ORDER BY stars DESC LIMIT 10"
      );

      // Getting ids
      const userIds = userStars.map(item => item.id);
      const businessIds = businessStars.map(item => item.id);

      // From the id, getting the rest of information from every user.
      const user = await User.findByIds(userIds);

      // From the id, getting the rest of information from every business.
      const business = await Business.findByIds(businessIds);

      // Merging stars with user information
      const userResponse = user.map(value1 => ({
        ...value1,
        ...userStars.find(value2 => value1.id === value2.id)
      })) as any;

      // Merging stars with business information
      const businessResponse = business.map(value1 => ({
        ...value1,
        ...businessStars.find(value2 => value1.id === value2.id)
      })) as any;

      return {
        user: mapOrder(userResponse, userIds, "id"),
        business: mapOrder(businessResponse, businessIds, "id")
      };
    }
  }
};
