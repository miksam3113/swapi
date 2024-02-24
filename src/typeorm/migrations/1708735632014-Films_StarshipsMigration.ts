import { MigrationInterface, QueryRunner } from 'typeorm';

export class FilmsStarshipsMigration1708735632014
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE Films_Starships (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_films INT NOT NULL,
            id_starships INT NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE Films_Starships;`;

    await queryRunner.query(query);
  }
}
