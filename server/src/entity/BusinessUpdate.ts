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
export class BusinessUpdate extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("simple-array")
  routeImages: string[];

  @Column("simple-array")
  routeVideos: string[];

  @Column("text")
  description: string;

  @ManyToOne(_ => Business, business => business.businessUpdate)
  business: Business;
}
