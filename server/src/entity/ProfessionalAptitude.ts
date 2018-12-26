import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class ProfessionalAptitude extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("simple-array")
  list: string[];

  @OneToOne(_ => User, user => user.professionalAptitude)
  @JoinColumn()
  user: User;
}
