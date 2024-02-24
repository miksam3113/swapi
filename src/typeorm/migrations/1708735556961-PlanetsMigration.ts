import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlanetsMigration1708735556961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE Planets (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            rotation_period VARCHAR(255) NOT NULL,
            orbital_period VARCHAR(255) NOT NULL,
            diameter VARCHAR(255) NOT NULL,
            climate VARCHAR(255) NOT NULL,
            gravity VARCHAR(255) NOT NULL,
            terrain VARCHAR(255) NOT NULL,
            surface_water VARCHAR(255) NOT NULL,
            population VARCHAR(255) NOT NULL,
            created VARCHAR(255) NOT NULL,
            edited VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE Planets;`;

    await queryRunner.query(query);
  }
}
