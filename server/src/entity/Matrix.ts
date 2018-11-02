import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable
} from "typeorm";

import { User } from "./User";

@Entity()
export class Matrix extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar", { length: 100 })
	title: string;

	@Column("varchar", { length: 255 })
	name: string;

	@Column("json", { nullable: true })
	body: object;

	@ManyToMany(() => User)
	@JoinTable({ name: "coworkers" })
	coworkers: User[];
}
