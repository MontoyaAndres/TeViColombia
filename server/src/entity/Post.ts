import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";

import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar", { length: 255 })
	title: string;

	@Column("text")
	body: string;

	@Column("varchar", { length: 255 })
	image: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@ManyToOne(_ => User, user => user.posts)
	author: User;
}
