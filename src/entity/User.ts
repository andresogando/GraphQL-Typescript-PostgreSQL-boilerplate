import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) firstName: string;

  @Column("varchar", { length: 255 }) lastName: string;

  @Column("varchar", { length: 100 }) age: number;

  @Column("varchar", { length: 255, unique: true }) email: string;

  @Column("varchar", { length: 255 }) password: string;
}
