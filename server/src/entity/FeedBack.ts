// This is a polymorphic relation, because in feedbackType will save the database type

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

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
  fromId: string;

  @Column("uuid")
  toId: string;

  @Column("varchar", { length: 8 })
  feedbackType: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
