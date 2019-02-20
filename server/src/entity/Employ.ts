import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

// Models
import { Business } from "./Business";

@Entity()
export class Employ extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  position: string;

  @Column("text")
  description: string;

  @ManyToOne(_ => Business, business => business.employ)
  business: Business;
}
