import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

import { User } from "./User";
import {
  ENUMDepartament,
  ENUMSector,
  ENUMArea
} from "../utils/entityGlobalEnum";
import EmptyStringToNull from "../utils/emptyStringToNull";

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  company: string;

  @Column("varchar")
  job: string;

  @Column("enum", { enum: ENUMDepartament })
  departament: string;

  @Column("enum", { enum: ENUMSector })
  sector: string;

  @Column("enum", { enum: ENUMArea })
  area: string;

  @Column("text", { nullable: true, transformer: new EmptyStringToNull() })
  goals: string;

  @Column("date")
  startedOn: Date;

  @Column("date", { nullable: true, transformer: new EmptyStringToNull() })
  finishIn: Date;

  @ManyToOne(_ => User, user => user.work)
  user: User;
}
