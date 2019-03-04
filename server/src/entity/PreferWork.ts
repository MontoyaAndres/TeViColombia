import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

import { ENUMCurrency } from "../utils/entityGlobalEnum";
import EmptyStringToNull from "../utils/emptyStringToNull";

enum ENUMCurrentSituation {
  A1 = "No tengo empleo",
  A2 = "Estoy buscando trabajo activamente",
  A3 = "Estoy trabajando actualmente",
  A4 = "No busco trabajo pero estoy dispuesto a escuchar ofertas",
  A5 = "No tengo ningún interés en un nuevo empleo"
}

@Entity()
export class PreferWork extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: ENUMCurrentSituation })
  currentSituation: string;

  @Column("varchar")
  job: string;

  @Column("simple-array")
  area: string[];

  @Column("bigint")
  salary: number;

  @Column("enum", {
    enum: ENUMCurrency,
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  currency: string;

  @Column("simple-array", {
    transformer: {
      to: (value: string[]) => value,
      from: (value: string[]) => {
        // Bogotá, D.C. is saved as ["Bogotá", " D.C."] passing it to ["Bogotá, D.C."]
        const valuesSeparated = value
          .filter(val => !val.includes("Bogotá") && !val.includes(" D.C."))
          .concat("Bogotá, D.C.");

        return valuesSeparated;
      }
    }
  })
  departament: string[];

  @Column("varchar", { length: 2, default: "No" })
  travel: string;

  @Column("varchar", { length: 2, default: "No" })
  residence: string;
}