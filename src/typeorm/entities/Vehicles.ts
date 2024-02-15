import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Vehicles' })
export class VehiclesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  vehicle_class: string;

  @Column()
  manufacturer: string;

  @Column()
  length: string;

  @Column()
  cost_in_credits: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
