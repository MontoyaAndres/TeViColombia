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
export class Portafolio extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("simple-array", { nullable: true })
  multimedia: string[];

  @Column("text")
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(_ => User, user => user.portafolio)
  user: User;
}
