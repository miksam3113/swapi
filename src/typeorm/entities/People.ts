import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilmsEntity } from './Films';
import { PeopleDto } from '../../people/people.dto';

@Entity({ name: 'People' })
export class PeopleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: string;

  @Column()
  gender: string;

  @Column()
  homeworld: string;

  // @ManyToMany(() => PeopleDto, (people) => people.films, {
  //   eager: false,
  //   onDelete: 'CASCADE',
  // })
  // films: string[];

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
