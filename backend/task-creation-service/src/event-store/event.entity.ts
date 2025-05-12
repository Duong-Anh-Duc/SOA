import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aggregateId: number;

  @Column()
  aggregateType: string;

  @Column()
  eventType: string;

  @Column('jsonb')
  payload: any;

  @CreateDateColumn()
  createdAt: Date;
}