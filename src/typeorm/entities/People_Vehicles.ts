import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'People_Vehicles' })
export class People_VehiclesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_people: number;

  @Column()
  id_vehicles: number;
}
