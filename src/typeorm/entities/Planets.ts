import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Planets' })
export class PlanetsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rotation_period: string;

  @Column()
  orbital_period: string;

  @Column()
  diameter: string;

  @Column()
  climate: string;

  @Column()
  gravity: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: string;

  @Column()
  population: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
