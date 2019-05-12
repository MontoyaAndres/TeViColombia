import * as bcrypt from "bcryptjs";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  Index
} from "typeorm";

import { Employ } from "./Employ";
import EmptyStringToNull from "../utils/emptyStringToNull";
import { User } from "./User";

@Entity()
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    default:
      "https://res.cloudinary.com/te-vi-colombia/image/upload/v1557617373/default/default-home_nngl6z.png" // default image from cloudinary
  })
  routePhoto: string;

  @Column("varchar", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  cloudinaryPublicIdRoutePhoto: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  routeCover: string;

  @Column("varchar", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  cloudinaryPublicIdRouteCover: string;

  @Index({ fulltext: true })
  @Column("varchar")
  name: string;

  @Index({ fulltext: true })
  @Column("text", { nullable: true, transformer: new EmptyStringToNull() })
  description: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  address: string;

  @Column("integer")
  telephoneCountry: number;

  @Column("bigint", { unique: true })
  telephone: number;

  @Column("integer", { nullable: true, transformer: new EmptyStringToNull() })
  telephone2Country: number;

  @Column("bigint", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  telephone2: number;

  @Column("varchar", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  departament: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  town: string;

  @Column("varchar", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  nationality: string;

  @Column("varchar")
  sector: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  website: string;

  @Column("text", { nullable: true, transformer: new EmptyStringToNull() })
  googleMapsLocalization: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  optionalEmail: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column("text")
  password: string;

  @Index({ fulltext: true })
  @Column("simple-array", {
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  skills: string[];

  @Column("json", { nullable: true, transformer: new EmptyStringToNull() })
  socialnetwork: Array<{ name: string; url: string }>;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  forgotPasswordLocked: boolean;

  @OneToMany(_ => Employ, employ => employ.business)
  employ: Employ[];

  @ManyToMany(_ => User, user => user.member, { cascade: ["update"] })
  @JoinTable({ name: "member" })
  member: User[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
