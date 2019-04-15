import { getRepository, Brackets } from "typeorm";

import { GQL } from "../../types/schema";
import { User } from "../../entity/User";

export default function fetchUserData(
  value: string,
  user: GQL.IParamsUserInput,
  limit: number
): Promise<User[]> {
  let result = null;

  return new Promise(resolve => {
    result = getRepository(User)
      .createQueryBuilder("user")
      .select()
      .leftJoin("user.necessity", "necessity")
      .where(
        new Brackets(qb => {
          qb.where("user.nationality = :nationality", {
            nationality: user.nationality
          }).andWhere("user.departament = :departament", {
            departament: user.departament
          });
        })
      );

    // If the user is not foreigner.
    if (user.town) {
      result.andWhere("user.town = :town", { town: user.town });
    }

    // If the customer is not looking for necessities.
    if (!user.necessity) {
      result.andWhere(
        new Brackets(qb => {
          qb.where(`MATCH(user.name) AGAINST (:value IN BOOLEAN MODE)`, {
            value
          })
            .orWhere(`MATCH(user.lastname) AGAINST (:value IN BOOLEAN MODE)`, {
              value
            })
            .orWhere(
              `MATCH(user.description) AGAINST (:value IN BOOLEAN MODE)`,
              {
                value
              }
            )
            .orWhere(`MATCH(user.skills) AGAINST (:value IN BOOLEAN MODE)`, {
              value
            });
        })
      );
    }

    // If the customer is looking for necessities.
    if (user.necessity) {
      result.addSelect("necessity").andWhere(
        new Brackets(qb => {
          qb.where(
            `MATCH(necessity.comment) AGAINST (:value IN BOOLEAN MODE)`,
            {
              value
            }
          ).andWhere("necessity.finished = :finished", {
            finished: !user.necessity // Necessities not already finished
          });
        })
      );
    }

    resolve(
      result
        .skip(limit)
        .take(10)
        .getMany()
    );
  });
}
