import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'People_Species' })
export class People_SpeciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_people: number;

  @Column()
  id_species: number;
}
