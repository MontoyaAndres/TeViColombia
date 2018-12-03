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
export class Multimedia extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  routeImages: string;

  @Column("text")
  routeVideos: string;

  @ManyToOne(
    _ => CommercialEstablishment,
    commercialestablishment => commercialestablishment.multimedia
  )
  commercialestablishment: CommercialEstablishment;
}
