import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Films_Vehicles' })
export class Films_VehiclesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_films: number;

  @Column()
  id_vehicles: number;
}
