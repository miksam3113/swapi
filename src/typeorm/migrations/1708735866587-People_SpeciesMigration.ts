import { MigrationInterface, QueryRunner } from 'typeorm';

export class PeopleSpeciesMigration1708735866587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
        CREATE TABLE People_Species (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_people INT NOT NULL,
            id_species INT NOT NULL
        );
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE People_Species;`;

    await queryRunner.query(query);
  }
}
