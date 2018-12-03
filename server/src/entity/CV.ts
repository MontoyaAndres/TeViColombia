import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class CV extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  RouteCV: string;

  @ManyToOne(_ => User, user => user.cv)
  user: User;
}
