import { MigrationInterface, QueryRunner } from 'typeorm';

export class PeopleMigration1708735528905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
    CREATE TABLE People (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        height VARCHAR(255) NOT NULL,
        mass VARCHAR(255) NOT NULL,
        hair_color VARCHAR(255) NOT NULL,
        skin_color VARCHAR(255) NOT NULL,
        eye_color VARCHAR(255) NOT NULL,
        birth_year VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        created VARCHAR(255) NOT NULL,
        edited VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL
    );`;
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE People;`;
    await queryRunner.query(query);
  }
}
