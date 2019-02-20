import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

import { User } from "./User";
import { ENUMStudyLevel } from "../utils/entityGlobalEnum";

@Entity()
export class Study extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  place: string;

  @Column("enum", { enum: ENUMStudyLevel })
  level: string;

  // This is only for university careers
  @Column("varchar", { nullable: true })
  area: string;

  @Column("date")
  startedOn: Date;

  @Column("date", { nullable: true })
  finishIn: Date;

  @ManyToOne(_ => User, user => user.study)
  user: User;
}
