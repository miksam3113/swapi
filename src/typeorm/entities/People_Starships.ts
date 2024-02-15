import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'People_Starships' })
export class People_StarshipsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_people: number;

  @Column()
  id_starships: number;
}
