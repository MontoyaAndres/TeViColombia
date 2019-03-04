import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

// Models
import { User } from "./User";
import { ENUMLanguage, ENUMLanguageLevel } from "../utils/entityGlobalEnum";

@Entity()
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: ENUMLanguage })
  language: string;

  @Column("enum", { enum: ENUMLanguageLevel })
  level: string;

  @ManyToOne(_ => User, user => user.language)
  user: User;
}
