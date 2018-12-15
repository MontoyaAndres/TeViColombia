import * as bcrypt from "bcryptjs";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";

// Models
import { PersonalSocialNetworks } from "./PersonalSocialNetworks";
import { Necessity } from "./Necessity";
import { University } from "./University";
import { SecondarySchool } from "./SecondarySchool";
import { Work } from "./Work";
import { CV } from "./CV";
import { ProfessionalAptitudes } from "./ProfessionalAptitudes";
import { Languages } from "./Languages";
import { PersonalFeedBack } from "./PersonalFeedBack";
import { CommercialEstablishment } from "./CommercialEstablishment";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { default: "default/default-photo.png" })
  routePhoto: string;

  @Column("varchar", { nullable: true })
  routeCover: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255 })
  lastname: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("varchar", { length: 255 })
  identificationDocumentType: string;

  @Column("bigint", { unique: true })
  identificationDocument: number;

  @Column("varchar", { length: 255, nullable: true })
  address: string;

  @Column("varchar", { length: 10, unique: true })
  telephone: string;

  @Column("varchar", { length: 255, nullable: true })
  departament: string;

  @Column("varchar", { length: 255, nullable: true })
  city: string;

  @Column("varchar", { length: 255, nullable: true })
  civilStatus: string;

  @Column("varchar", { length: 255, nullable: true })
  website: string;

  @Column("varchar", { length: 255, nullable: true })
  gender: string;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("text")
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  forgotPasswordLocked: boolean;

  @OneToMany(_ => PersonalSocialNetworks, socialnetwork => socialnetwork.user)
  socialnetwork: PersonalSocialNetworks[];

  @OneToMany(_ => Languages, language => language.user)
  language: Languages[];

  @OneToMany(_ => University, univeristy => univeristy.user)
  university: University[];

  @OneToMany(_ => SecondarySchool, secondaryschool => secondaryschool.user)
  secondaryschool: SecondarySchool[];

  @OneToMany(_ => Work, work => work.user)
  work: Work[];

  @OneToMany(_ => CV, cv => cv.user)
  cv: CV[];

  @OneToMany(
    _ => ProfessionalAptitudes,
    professionalaptitude => professionalaptitude.user
  )
  professionalAptitude: ProfessionalAptitudes[];

  @OneToMany(_ => PersonalFeedBack, feedback => feedback.user)
  feedback: PersonalFeedBack[];

  @OneToMany(_ => Necessity, necessity => necessity.user)
  necessity: Necessity[];

  @ManyToMany(_ => CommercialEstablishment)
  @JoinTable({ name: "members" })
  commercialestablishments: CommercialEstablishment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
