import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class ProfessionalAptitudes extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("simple-array")
  professionalAptitudes: string[];

  @ManyToOne(_ => User, user => user.professionalAptitude)
  user: User;
}
