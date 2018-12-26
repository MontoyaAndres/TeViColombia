import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class University extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  place: string;

  @Column("date")
  startedOn: Date;

  @Column("date", { nullable: true })
  finishIn: Date;

  @Column()
  finished: boolean;

  @Column("simple-array", { nullable: true })
  especializations: string[];

  @Column("varchar", { length: 255 })
  attended: string;

  @Column("text")
  description: string;

  @ManyToOne(_ => User, user => user.university)
  user: User;
}
