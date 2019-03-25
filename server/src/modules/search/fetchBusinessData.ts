import { getRepository, Brackets } from "typeorm";

import { GQL } from "../../types/schema";
import { Business } from "../../entity/Business";

export default function fetchBusinessData(
  value: string,
  business: GQL.IParamsBusinessInput
): Promise<Business[]> {
  let result = null;

  return new Promise(resolve => {
    result = getRepository(Business)
      .createQueryBuilder("business")
      .select()
      .where(`MATCH(business.name) AGAINST (:value IN BOOLEAN MODE)`, {
        value
      })
      .orWhere(`MATCH(business.description) AGAINST (:value IN BOOLEAN MODE)`, {
        value
      })
      .orWhere(`MATCH(business.skills) AGAINST (:value IN BOOLEAN MODE)`, {
        value
      });

    // If the customer is looking for employ.
    if (business.employ) {
      result
        .leftJoinAndSelect("business.employ", "employ")
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

    if (business.nationality) {
      result.andWhere("business.nationality = :nationality", {
        nationality: business.nationality
      });
    }

    if (business.departament) {
      result.andWhere("business.departament = :departament", {
        departament: business.departament
      });
    }

    // If the business is not foreigner.
    if (business.town) {
      result.andWhere("business.town = :town", { town: business.town });
    }

    if (business.sector) {
      result.andWhere("business.sector = :sector", {
        sector: business.sector
      });
    }

    resolve(result.getMany());
  });
}
