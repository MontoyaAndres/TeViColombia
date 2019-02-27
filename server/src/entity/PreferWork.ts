import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column("simple-array")
  departament: string[];

  @Column("varchar", { length: 2, default: "No" })
  travel: string;

  @Column("varchar", { length: 2, default: "No" })
  residence: string;
}
