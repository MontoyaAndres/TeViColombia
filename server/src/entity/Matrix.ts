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
	typeMatrix: string;

	@Column("json")
	body: object;

	@ManyToMany(() => User)
	@JoinTable({ name: "coworkers" })
	users: User[];
}
