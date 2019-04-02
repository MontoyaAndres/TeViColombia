import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

// Models
import { User } from "./User";

export enum ENUMLanguageLevel {
  A1 = "Muy básico",
  A2 = "Básico",
  A3 = "Intermedio",
  A4 = "Avanzado",
  A5 = "Nativo"
}

@Entity()
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  language: string;

  @Column("enum", { enum: ENUMLanguageLevel })
  level: string;

  @ManyToOne(_ => User, user => user.language)
  user: User;
}
