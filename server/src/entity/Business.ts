import * as bcrypt from "bcryptjs";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  JoinTable
} from "typeorm";

// Models
import {
  ENUMCountry,
  ENUMDepartament,
  ENUMSector
} from "../utils/entityGlobalEnum";
import { Employ } from "./Employ";
import EmptyStringToNull from "../utils/emptyStringToNull";
import { User } from "./User";

@Entity()
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { default: "default/default-home.png" })
  routePhoto: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  routeCover: string;

  @Column("varchar", { unique: true })
  name: string;

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

  @Column("enum", {
    nullable: true,
    enum: ENUMDepartament,
    transformer: new EmptyStringToNull()
  })
  departament: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  town: string;

  @Column("enum", {
    enum: ENUMCountry,
    nullable: true,
    transformer: new EmptyStringToNull()
  })
  nationality: string;

  @Column("enum", { enum: ENUMSector })
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
