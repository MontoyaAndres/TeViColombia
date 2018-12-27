import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

// Models
import { User } from "./User";

enum ENUMSocialNetwork {
  TWITTER = "Twitter",
  GITHUB = "Github",
  FACEBOOK = "Facebook",
  LINKEDIN = "Linkedin",
  INSTAGRAM = "Instagram",
  YOUTUBE = "Youtube",
  SPOTIFY = "Spotify",
  WHATSAPP = "Whatsapp"
}

@Entity()
export class PersonalSocialNetworks extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: ENUMSocialNetwork })
  name: string;

  @Column("varchar", { length: 255 })
  url: string;

  @ManyToOne(_ => User, user => user.socialnetwork)
  user: User;
}
