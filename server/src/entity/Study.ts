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
export class Study extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  place: string;

  @Column("varchar")
  level: string;

  // This is only for university careers
  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  area: string;

  @Column("date")
  startedOn: Date;

  @Column("date", { nullable: true, transformer: new EmptyStringToNull() })
  finishIn: Date;

  @ManyToOne(_ => User, user => user.study)
  user: User;
}
