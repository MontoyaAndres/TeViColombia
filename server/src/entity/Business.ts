import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";

// Models
import { ENUMCountry, ENUMDepartament } from "../utils/entityGlobalEnum";
import { BusinessUpdate } from "./BusinessUpdate";

@Entity()
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { default: "default/default-home.png" })
  routePhoto: string;

  @Column("varchar", { length: 255 })
  routeCover: string;

  @Column("varchar", { length: 255, unique: true })
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("integer")
  telephone: number;

  @Column("varchar", { length: 255, nullable: true })
  email: string;

  @Column("enum", { enum: ENUMCountry, default: "Colombia" })
  nationality: string;

  @Column("enum", { enum: ENUMDepartament, default: "Bogotá, D.C." })
  departament: string;

  @Column("varchar", { length: 255, nullable: true })
  city: string;

  @Column("varchar", { length: 255, nullable: true })
  address: string;

  @Column("varchar", { length: 255, nullable: true })
  website: string;

  @Column("text", { nullable: true })
  googleMapsLocalization: string;

  @OneToMany(_ => BusinessUpdate, businessUpdate => businessUpdate.business)
  businessUpdate: BusinessUpdate[];
}
