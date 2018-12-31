import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

// Models
import { User } from "./User";

@Entity()
export class PersonalFeedBack extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer")
  stars: number;

  @Column("text", { nullable: true })
  comment: string;

  @Column("uuid")
  receiver: string;

  @ManyToOne(_ => User, user => user.feedback)
  user: User;
}
