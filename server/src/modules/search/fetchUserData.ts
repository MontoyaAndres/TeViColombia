import { getRepository } from "typeorm";

import { GQL } from "../../types/schema";
import { User } from "../../entity/User";

export default function fetchUserData(
  value: string,
  user: GQL.IParamsUserInput
): Promise<User[]> {
  let result = null;

  return new Promise(resolve => {
    result = getRepository(User)
      .createQueryBuilder("user")
      .select()
      .where(`MATCH(user.name) AGAINST (:value IN BOOLEAN MODE)`, {
        value
      })
      .orWhere(`MATCH(user.lastname) AGAINST (:value IN BOOLEAN MODE)`, {
        value
      })
      .orWhere(`MATCH(user.description) AGAINST (:value IN BOOLEAN MODE)`, {
        value
      })
      .orWhere(`MATCH(user.skills) AGAINST (:value IN BOOLEAN MODE)`, {
        value
      });

    // If the customer is looking for necessities.
    if (user.necessity) {
      result
        .leftJoinAndSelect("user.necessity", "necessity")
        .where(`MATCH(necessity.comment) AGAINST (:value IN BOOLEAN MODE)`, {
          value
        })
        .andWhere("necessity.finished = :finished", {
          finished: user.necessity
        });
    }

    if (user.nationality) {
      result.andWhere("user.nationality = :nationality", {
        nationality: user.nationality
      });
    }

    if (user.departament) {
      result.andWhere("user.departament = :departament", {
        departament: user.departament
      });
    }

    // If the user is not foreigner.
    if (user.town) {
      result.andWhere("user.town = :town", { town: user.town });
    }

    resolve(result.getMany());
  });
}
