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
import { Necessity } from "./Necessity";
import { Study } from "./Study";
import { Work } from "./Work";
import { CV } from "./CV";
import { Languages } from "./Languages";
import { Business } from "./Business";
import { FeedBack } from "./FeedBack";
import { Portafolio } from "./Portafolio";
import { ENUMCountry, ENUMDepartament } from "../utils/entityGlobalEnum";

enum ENUMIdentificationDocumentType {
  A1 = "CÉDULA DE CIUDADANÍA",
  A2 = "CÉDULA DE EXTRANJERÍA",
  A3 = "TARJETA DE IDENTIDAD",
  A4 = "PASAPORTE",
  A5 = "NÚMERO DE IDENTIFICACIÓN"
}

enum ENUMCivilStatus {
  A1 = "SOLTERO(A)",
  A2 = "CASADO(A)",
  A3 = "SEPARADO(A)/DIVORCIADO(A)",
  A4 = "VIUDO(A)"
}

enum ENUMGender {
  A1 = "HOMBRE",
  A2 = "MUJER"
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255, default: "default/default-photo.png" })
  routePhoto: string;

  @Column("varchar", { length: 255, nullable: true })
  routeCover: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255 })
  lastname: string;

  @Column("varchar", { length: 100, nullable: true })
  description: string;

  @Column("enum", { enum: ENUMIdentificationDocumentType })
  identificationDocumentType: string;

  @Column("bigint", { unique: true })
  identificationDocument: number;

  @Column("varchar", { length: 255, nullable: true })
  address: string;

  @Column("bigint", { unique: true })
  telephone: number;

  @Column("enum", { enum: ENUMDepartament, nullable: true })
  departament: string;

  @Column("varchar", { length: 255, nullable: true })
  town: string;

  @Column("enum", { enum: ENUMCountry, nullable: true })
  nationality: string;

  @Column("enum", { enum: ENUMCivilStatus, nullable: true })
  civilStatus: string;

  @Column("varchar", { length: 255, nullable: true })
  linkedin: string;

  @Column("varchar", { length: 255, nullable: true })
  skype: string;

  @Column("varchar", { length: 255, nullable: true })
  website: string;

  @Column("enum", { enum: ENUMGender, nullable: true })
  gender: string;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("text")
  password: string;

  @Column("simple-array", { nullable: true })
  skills: string[];

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  forgotPasswordLocked: boolean;

  @OneToMany(_ => Languages, language => language.user)
  language: Languages[];

  @OneToMany(_ => Study, study => study.user)
  study: Study[];

  @OneToMany(_ => Work, work => work.user)
  work: Work[];

  @OneToMany(_ => CV, cv => cv.user)
  cv: CV[];

  @OneToMany(_ => Necessity, necessity => necessity.user)
  necessity: Necessity[];

  @OneToMany(_ => FeedBack, feedback => feedback.user)
  feedback: FeedBack[];

  @OneToMany(_ => Portafolio, portafolio => portafolio.user)
  portafolio: Portafolio[];

  @ManyToMany(_ => Business)
  @JoinTable({ name: "member" })
  member: Business[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
