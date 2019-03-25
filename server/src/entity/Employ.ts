import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index
} from "typeorm";

// Models
import { Business } from "./Business";
import {
  ENUMStudyLevel,
  ENUMCurrency,
  ENUMDepartament,
  ENUMCountry,
  ENUMArea
} from "../utils/entityGlobalEnum";
import EmptyStringToNull from "../utils/emptyStringToNull";

enum ENUMTime {
  A1 = "Jornada completa",
  A2 = "Desde casa",
  A3 = "Jornada reducida",
  A4 = "Trabajo a turnos",
  A5 = "Jornada partida",
  A6 = "Trabajo nocturno",
  A7 = "Trabajo en festivos",
  A8 = "Tiempo completo"
}

@Entity()
export class Employ extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ fulltext: true })
  @Column("varchar")
  position: string;

  @Column("text")
  description: string;

  @Column("enum", { enum: ENUMArea })
  area: string;

  @Index({ fulltext: true })
  @Column("simple-array", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  skills: string[];

  @Column("enum", { enum: ENUMStudyLevel })
  minStudy: string;

  @Column("integer")
  minExperience: number;

  @Column("simple-array", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  language: string[];

  @Column("varchar", { length: 2, default: "No" })
  travel: string;

  @Column("varchar", { length: 2, default: "No" })
  residence: string;

  @Column("enum", { enum: ENUMCountry })
  country: string;

  @Column("enum", { enum: ENUMDepartament })
  departament: string;

  @Column("varchar")
  town: string;

  @Column("enum", { enum: ENUMTime })
  time: string;

  @Column("text")
  contract: string;

  @Column("bigint", { nullable: true, transformer: new EmptyStringToNull() })
  minSalary: number;

  @Column("bigint", { nullable: true, transformer: new EmptyStringToNull() })
  maxSalary: number;

  @Column("enum", { enum: ENUMCurrency })
  currency: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(_ => Business, business => business.employ)
  business: Business;
}
