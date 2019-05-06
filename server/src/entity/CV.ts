import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class CV extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  routeCV: string;

  @Column("varchar")
  cloudinaryPublicIdRouteCV: string;

  @Column("varchar")
  resourceType: string;

  @Column("text")
  filename: string;

  @ManyToOne(_ => User, user => user.cv)
  user: User;
}
