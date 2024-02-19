import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Species' })
export class SpeciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  skin_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  average_lifespan: string;

  @Column()
  language: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
