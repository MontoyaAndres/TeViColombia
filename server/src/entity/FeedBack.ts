import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from "typeorm";

// Models
import { User } from "./User";

@Entity()
export class FeedBack extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Cannot be more than 5
  @Column("integer")
  stars: number;

  @Column("text", { nullable: true })
  comment: string;

  @Column("uuid")
  receiver: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(_ => User, user => user.feedback)
  user: User;
}
