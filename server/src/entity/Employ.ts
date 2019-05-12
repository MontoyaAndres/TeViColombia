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
import EmptyStringToNull from "../utils/emptyStringToNull";
import { ENUMCurrency } from "../utils/entityGlobalEnum";

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

  @Column("varchar")
  area: string;

  @Index({ fulltext: true })
  @Column("simple-array", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  skills: string[];

  @Column("varchar")
  minStudy: string;

  @Column("integer")
  minExperience: number;

  @Column("simple-array", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  language: string[];

  @Column({ default: false })
  travel: boolean;

  @Column({ default: false })
  residence: boolean;

  @Column("varchar")
  country: string;

  @Column("varchar")
  departament: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
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
