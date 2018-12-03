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
export class CommercialFeedBack extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer")
  stars: string;

  @Column("text", { nullable: true })
  comment: string;

  @ManyToOne(
    _ => CommercialEstablishment,
    commercialestablishment => commercialestablishment.feedback
  )
  commercialestablishment: CommercialEstablishment;
}
