import { MigrationInterface, QueryRunner } from 'typeorm';

export class StarshipsMigration1708735917551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
    CREATE TABLE Starships (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        manufacturer VARCHAR(255) NOT NULL,
        cost_in_credits VARCHAR(255) NOT NULL,
        length VARCHAR(255) NOT NULL,
        crew VARCHAR(255) NOT NULL,
        passengers VARCHAR(255) NOT NULL,
        max_atmosphering_speed VARCHAR(255) NOT NULL,
        hyperdrive_rating VARCHAR(255) NOT NULL,
        MGLT VARCHAR(255) NOT NULL,
        starship_class VARCHAR(255) NOT NULL,
        cargo_capacity VARCHAR(255) NOT NULL,
        consumables VARCHAR(255) NOT NULL,
        created VARCHAR(255) NOT NULL,
        edited VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL
    );`;
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DROP TABLE Starships;`;
    await queryRunner.query(query);
  }
}
