import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
