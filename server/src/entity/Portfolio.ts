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

  @Column("simple-json")
  multimedia: Array<{ public_id: string; secure_url: string }>;

  @Column("varchar", { length: 200 })
  description: string;

  @Column("uuid")
  portfolioId: string;

  @Column("varchar", { length: 8 })
  portfolioType: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
