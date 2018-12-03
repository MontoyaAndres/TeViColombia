import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";

// Models
import { CommercialSocialNetworks } from "./CommercialSocialNetworks";
import { Multimedia } from "./Multimedia";
import { CommercialFeedBack } from "./CommercialFeedBack";
import { Localization } from "./Localization";

@Entity()
export class CommercialEstablishment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255, unique: true })
  name: string;

  @Column("varchar", { default: "default/default-home.png" })
  routePhoto: string;

  @Column("varchar")
  routeCover: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("varchar", { length: 255 })
  category: string;

  @Column("integer", { nullable: true })
  telephone: number;

  @Column("varchar", { length: 255, nullable: true })
  email: string;

  @Column("varchar", { length: 255, nullable: true })
  departament: string;

  @Column("varchar", { length: 255, nullable: true })
  city: string;

  @Column("varchar", { length: 255, nullable: true })
  address: string;

  @Column("varchar", { length: 255, nullable: true })
  website: string;

  @OneToMany(
    _ => CommercialSocialNetworks,
    socialnetwork => socialnetwork.commercialestablishment
  )
  socialnetwork: CommercialSocialNetworks[];

  @OneToMany(_ => Multimedia, multimedia => multimedia.commercialestablishment)
  multimedia: Multimedia[];

  @OneToMany(
    _ => CommercialFeedBack,
    feedback => feedback.commercialestablishment
  )
  feedback: CommercialFeedBack[];

  @OneToMany(
    _ => Localization,
    localization => localization.commercialestablishment
  )
  localization: Localization[];
}
