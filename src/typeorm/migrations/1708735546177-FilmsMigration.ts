import { MigrationInterface, QueryRunner } from 'typeorm';

export class FilmsMigration1708735546177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE Films (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            episode_id VARCHAR(255) NOT NULL,
            opening_crawl LONGTEXT NOT NULL,
            director VARCHAR(255) NOT NULL,
            producer VARCHAR(255) NOT NULL,
            release_date VARCHAR(255) NOT NULL,
            created VARCHAR(255) NOT NULL,
            edited VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL
        );`;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE Films;`;

    await queryRunner.query(query);
  }
}
