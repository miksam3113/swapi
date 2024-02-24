import { MigrationInterface, QueryRunner } from 'typeorm';

export class FilmsPlanetsMigration1708735614046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE Films_Planets (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_films INT NOT NULL,
            id_planets INT NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE Films_Planets;`;

    await queryRunner.query(query);
  }
}
