import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Films_Species' })
export class Films_SpeciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_films: number;

  @Column()
  id_species: number;
}
