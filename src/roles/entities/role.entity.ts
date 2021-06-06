import { Users } from './../../users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    company: string;

    @Column()
    position: string;

    // @ManyToMany(() => Users)
    // @JoinTable()
    // Users: Users[];

}
