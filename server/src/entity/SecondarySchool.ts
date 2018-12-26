import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class SecondarySchool extends BaseEntity {
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

  @Column("text")
  description: string;

  @ManyToOne(_ => User, user => user.secondaryschool)
  user: User;
}
