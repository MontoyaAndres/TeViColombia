import * as bcrypt from "bcryptjs";
import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	BeforeInsert,
} from "typeorm";


@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar", { length: 255 })
	name: string;

	@Column("varchar", { length: 255 })
	lastname: string;

	@Column("varchar", { length: 255, unique: true })
	email: string;

	@Column("text")
	password: string;

	@Column({ default: false })
	confirmed: boolean;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
