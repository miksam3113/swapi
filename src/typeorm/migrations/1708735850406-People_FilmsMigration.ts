import { MigrationInterface, QueryRunner } from 'typeorm';

export class PeopleFilmsMigration1708735850406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE People_Films (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_people INT NOT NULL,
            id_films INT NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE People_Films;`;

    await queryRunner.query(query);
  }
}
