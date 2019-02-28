// This is a polymorphic relation, because in portfolioType will save the database type

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";
import EmptyStringToNull from "../utils/emptyStringToNull";

@Entity()
export class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("simple-array", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  multimedia: string[];

  @Column("varchar", { length: 200 })
  description: string;

  @Column("uuid")
  portfolioId: string;

  @Column("varchar", { length: 8 })
  portfolioType: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
