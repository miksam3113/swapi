import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Films' })
export class FilmsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  height: string;

  @Column()
  episode_id: number;

  @Column()
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
