import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'People_Planets' })
export class People_PlanetsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_people: number;

  @Column()
  id_planets: number;
}
