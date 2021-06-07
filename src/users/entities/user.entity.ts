import { Roles } from './../../roles/entities/role.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    mobile: string;

    @Column()
    @Index({unique: true})
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Roles)
    @JoinTable({ name: "users-vs-roles"})
    roles: Roles[];
}
