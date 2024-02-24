import { MigrationInterface, QueryRunner } from 'typeorm';

export class PeopleStarshipsMigration1708735874012
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE People_Starships (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_people INT NOT NULL,
            id_starships INT NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE People_Starships;`;

    await queryRunner.query(query);
  }
}
