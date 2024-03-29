import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'People_Films' })
export class People_FilmsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_people: number;

  @Column()
  id_films: number;
}
