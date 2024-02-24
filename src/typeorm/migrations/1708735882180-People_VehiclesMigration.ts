import { MigrationInterface, QueryRunner } from 'typeorm';

export class PeopleVehiclesMigration1708735882180
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE People_Vehicles (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_people INT NOT NULL,
            id_vehicles INT NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE People_Vehicles;`;

    await queryRunner.query(query);
  }
}
