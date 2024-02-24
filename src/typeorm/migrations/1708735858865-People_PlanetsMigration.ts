import { MigrationInterface, QueryRunner } from 'typeorm';

export class PeoplePlanetsMigration1708735858865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE People_Planets (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_people INT NOT NULL,
            id_planets INT NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE People_Planets;`;

    await queryRunner.query(query);
  }
}
