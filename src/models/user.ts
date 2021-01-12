import {Entity, CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('appointments')
class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}

export default User;