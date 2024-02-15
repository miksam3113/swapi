import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Films_Starships' })
export class Films_StarshipsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_films: number;

  @Column()
  id_starships: number;
}
