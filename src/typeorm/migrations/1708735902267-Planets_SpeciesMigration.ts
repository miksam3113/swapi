import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlanetsSpeciesMigration1708735902267
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE Planets_Species (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_planets INT NOT NULL,
            id_species INT NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE Planets_Species;`;

    await queryRunner.query(query);
  }
}
