import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Starships' })
export class StarshipsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: string;

  @Column()
  length: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  hyperdrive_rating: string;

  @Column()
  MGLT: string;

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
