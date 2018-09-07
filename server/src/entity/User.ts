import * as bcrypt from "bcryptjs";
import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	BeforeInsert,
	OneToMany
} from "typeorm";

import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar", { length: 255 })
	name: string;

	@Column("varchar", { length: 255 })
	lastname: string;

	@Column("varchar", { length: 15, unique: true })
	phone: string;

	@Column("varchar", { length: 255, unique: true })
	email: string;

	@Column("text")
	password: string;

	@Column({ default: false })
	isAdmin: boolean;

	@Column({ default: false })
	confirmed: boolean;

	@OneToMany(_ => Post, post => post.author)
	posts: Post[];

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
