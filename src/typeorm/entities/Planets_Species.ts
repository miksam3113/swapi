import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Planets_Species' })
export class Planets_SpeciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_planets: number;

  @Column()
  id_species: number;
}
