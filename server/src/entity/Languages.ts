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
export class Languages extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  language: string;

  @Column("integer")
  level: number;

  @ManyToOne(_ => User, user => user.language)
  user: User;
}
