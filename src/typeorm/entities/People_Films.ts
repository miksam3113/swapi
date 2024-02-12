import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilmsEntity } from './Films';
import { PeopleDto } from '../../people/people.dto';

@Entity({ name: 'People_Films' })
export class People_FilmsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_people: number;

  @Column()
  id_film: number;
}
