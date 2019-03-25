import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm";

// Models
import { User } from "./User";

@Entity()
export class Necessity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  finished: boolean;

  @Index({ fulltext: true })
  @Column("text")
  comment: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(_ => User, user => user.necessity)
  user: User;
}
