import {Entity, CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('appointments')
class Appointment{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    provider: string;
    @Column('timestamp with time zone')
    date: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;