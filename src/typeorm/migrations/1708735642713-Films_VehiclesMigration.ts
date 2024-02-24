import { MigrationInterface, QueryRunner } from 'typeorm';

export class FilmsVehiclesMigration1708735642713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE Films_Vehicles (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_films INT NOT NULL,
            id_vehicles INT NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE Films_Vehicles;`;

    await queryRunner.query(query);
  }
}
