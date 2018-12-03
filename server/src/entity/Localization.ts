import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

// Models
import { CommercialEstablishment } from "./CommercialEstablishment";

@Entity()
export class Localization extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true })
  localization: string;

  @ManyToOne(
    _ => CommercialEstablishment,
    commercialestablishment => commercialestablishment.localization
  )
  commercialestablishment: CommercialEstablishment;
}
