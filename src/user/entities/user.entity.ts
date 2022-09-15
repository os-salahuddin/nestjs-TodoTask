import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    username: string;

    @Column({select:true})
    status: number;

    @Column()
    password: string;

    @CreateDateColumn({type: 'timestamp', select: false})
    createdAt: Date | string;

    @CreateDateColumn({type: 'timestamp', select: true})
    updatedAt: Date | string;
}

