import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

import { ENUMCurrency } from "../utils/entityGlobalEnum";

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

  @Column("enum", { enum: ENUMCurrency })
  currency: string;

  @Column("simple-array", {
    transformer: {
      // Bogotá, D.C. is saved as ["Bogotá", " D.C."] passing it to ["Bogotá, D.C."].
      to: (value: string[]) =>
        value.map(val => (val === "Bogotá, D.C." ? "Bogotá D.C." : val)),
      from: (value: string[]) =>
        value.map(val => (val === "Bogotá D.C." ? "Bogotá, D.C." : val))
    }
  })
  departament: string[];

  @Column({ default: false })
  travel: boolean;

  @Column({ default: false })
  residence: boolean;
}
