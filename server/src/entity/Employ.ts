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

  @Column("varchar", { length: 255 })
  position: string;

  @Column("text")
  description: string;

  @ManyToOne(_ => Business, business => business.businessUpdate)
  business: Business;
}
