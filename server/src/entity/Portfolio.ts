// This is a polymorphic relation, because in portfolioType will save the database type

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity()
export class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("simple-array", { nullable: true })
  multimedia: string[];

  @Column("text")
  description: string;

  @Column("uuid")
  portfolioId: string;

  @Column("varchar")
  portfolioType: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
