import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

import { User } from "./User";
import EmptyStringToNull from "../utils/emptyStringToNull";

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  company: string;

  @Column("varchar")
  job: string;

  @Column("varchar")
  departament: string;

  @Column("varchar")
  sector: string;

  @Column("varchar")
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
