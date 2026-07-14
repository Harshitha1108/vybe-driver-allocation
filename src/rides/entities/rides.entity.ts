import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  riderName!: string;

  @Column({
    default: 'REQUESTED',
  })
  status!: string;

  @Column({
    nullable: true,
  })
  driverId!: number | null;
}