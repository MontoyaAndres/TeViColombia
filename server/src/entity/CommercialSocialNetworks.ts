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
export class CommercialSocialNetworks extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255 })
  url: string;

  @ManyToOne(
    _ => CommercialEstablishment,
    commercialestablishment => commercialestablishment.socialnetwork
  )
  commercialestablishment: CommercialEstablishment;
}
