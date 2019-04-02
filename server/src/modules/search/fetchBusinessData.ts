import { getRepository, Brackets } from "typeorm";

import { GQL } from "../../types/schema";
import { Business } from "../../entity/Business";

export default function fetchBusinessData(
  value: string,
  business: GQL.IParamsBusinessInput,
  limit: number
): Promise<Business[]> {
  let result = null;

  return new Promise(resolve => {
    result = getRepository(Business)
      .createQueryBuilder("business")
      .select()
      .leftJoin("business.employ", "employ")
      .orWhere(
        new Brackets(qb => {
          qb.where(`MATCH(business.name) AGAINST (:value IN BOOLEAN MODE)`, {
            value
          })
            .orWhere(
              `MATCH(business.description) AGAINST (:value IN BOOLEAN MODE)`,
              {
                value
              }
            )
            .orWhere(
              `MATCH(business.skills) AGAINST (:value IN BOOLEAN MODE)`,
              {
                value
              }
            );
        })
      )
      .andWhere(
        new Brackets(qb => {
          qb.where("business.nationality = :nationality", {
            nationality: business.nationality
          }).andWhere("business.departament = :departament", {
            departament: business.departament
          });
        })
      )
      .andWhere(
        new Brackets(qb => {
          qb.where("business.sector = :sector", {
            sector: business.sector
          });
        })
      );

    // If the customer is looking for employ.
    if (business.employ) {
      result
        .addSelect("employ")
        .where("employ.area = :area", { area: business.area })
        .andWhere(
          new Brackets(qb => {
            qb.where(
              `MATCH(employ.position) AGAINST (:value IN BOOLEAN MODE)`,
              {
                value
              }
            ).orWhere(`MATCH(employ.skills) AGAINST (:value IN BOOLEAN MODE)`, {
              value
            });
          })
        );
    }

    // If the business is not foreigner.
    if (business.town) {
      result.andWhere("business.town = :town", { town: business.town });
    }

    resolve(
      result
        .skip(limit)
        .take(10)
        .getMany()
    );
  });
}
