import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Films_Planets' })
export class Films_PlanetsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_films: number;

  @Column()
  id_planets: number;
}
