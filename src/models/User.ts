import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { unique: true }) id: string;

  @Column("varchar", { length: 255 }) firstName: string;

  @Column("varchar", { length: 255 }) lastName: string;

  @Column("varchar", { length: 100 }) age: number;

  @Column("varchar", { length: 255, unique: true }) email: string;

  @Column("varchar", { length: 255 }) password: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
