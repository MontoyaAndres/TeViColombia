import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";

// Models
import {
  ENUMCountry,
  ENUMDepartament,
  ENUMSector
} from "../utils/entityGlobalEnum";
import { Employ } from "./Employ";
import EmptyStringToNull from "../utils/emptyStringToNull";

@Entity()
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { default: "default/default-home.png" })
  routePhoto: string;

  @Column("varchar")
  routeCover: string;

  @Column("varchar", { unique: true })
  name: string;

  @Column("text", { nullable: true, transformer: new EmptyStringToNull() })
  description: string;

  @Column("integer")
  telephone: number;

  @Column("varchar", { unique: true })
  email: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  address: string;

  @Column("enum", { enum: ENUMCountry, default: "Colombia" })
  nationality: string;

  @Column("enum", { enum: ENUMDepartament, default: "Bogotá, D.C." })
  departament: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  city: string;

  @Column("enum", { enum: ENUMSector })
  sector: string;

  @Column("varchar", { nullable: true, transformer: new EmptyStringToNull() })
  website: string;

  @Column("text", { nullable: true, transformer: new EmptyStringToNull() })
  googleMapsLocalization: string;

  @OneToMany(_ => Employ, employ => employ.business)
  employ: Employ[];
}
