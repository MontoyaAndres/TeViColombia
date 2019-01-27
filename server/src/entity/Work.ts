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

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  company: string;

  @Column("varchar", { length: 255 })
  job: string;

  @Column("enum", { enum: ENUMDepartament })
  departament: string;

  @Column("enum", { enum: ENUMSector })
  sector: string;

  @Column("enum", { enum: ENUMArea })
  area: string;

  @Column("text")
  goals: string;

  @Column("date")
  startedOn: Date;

  @Column("date", { nullable: true })
  finishIn: Date;

  @ManyToOne(_ => User, user => user.work)
  user: User;
}
