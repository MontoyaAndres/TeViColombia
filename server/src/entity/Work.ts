import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  place: string;

  @Column("varchar", { length: 255 })
  job: string;

  @Column("text")
  localization: string;

  @Column("text")
  description: string;

  @Column("date")
  startedOn: Date;

  @Column("date")
  finishIn: Date;

  @Column()
  finished: boolean;

  @ManyToOne(_ => User, user => user.work)
  user: User;
}
