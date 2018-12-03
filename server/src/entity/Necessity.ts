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
export class Necessity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  finished: boolean;

  @Column("text")
  comment: string;

  @ManyToOne(_ => User, user => user.necessity)
  user: User;
}
