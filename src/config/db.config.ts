import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { FilmsEntity } from '../typeorm/entities/Films';
import { Films_PlanetsEntity } from '../typeorm/entities/Films_Planets';
import { Films_SpeciesEntity } from '../typeorm/entities/Films_Species';
import { Films_StarshipsEntity } from '../typeorm/entities/Films_Starships';
import { Films_VehiclesEntity } from '../typeorm/entities/Films_Vehicles';
import { PeopleEntity } from '../typeorm/entities/People';
import { People_FilmsEntity } from '../typeorm/entities/People_Films';
import { People_PlanetsEntity } from '../typeorm/entities/People_Planets';
import { People_VehiclesEntity } from '../typeorm/entities/People_Vehicles';
import { People_StarshipsEntity } from '../typeorm/entities/People_Starships';
import { People_SpeciesEntity } from '../typeorm/entities/People_Species';
import { PlanetsEntity } from '../typeorm/entities/Planets';
import { Planets_SpeciesEntity } from '../typeorm/entities/Planets_Species';
import { SpeciesEntity } from '../typeorm/entities/Species';
import { StarshipsEntity } from '../typeorm/entities/Starships';
import { VehiclesEntity } from '../typeorm/entities/Vehicles';
import { PeopleMigration1708735528905 } from '../typeorm/migrations/1708735528905-PeopleMigration';
import { FilmsMigration1708735546177 } from '../typeorm/migrations/1708735546177-FilmsMigration';
import { PlanetsMigration1708735556961 } from '../typeorm/migrations/1708735556961-PlanetsMigration';
import { SpeciesMigration1708735564443 } from '../typeorm/migrations/1708735564443-SpeciesMigration';
import { FilmsPlanetsMigration1708735614046 } from '../typeorm/migrations/1708735614046-Films_PlanetsMigration';
import { FilmsSpeciesMigration1708735623528 } from '../typeorm/migrations/1708735623528-Films_SpeciesMigration';
import { FilmsStarshipsMigration1708735632014 } from '../typeorm/migrations/1708735632014-Films_StarshipsMigration';
import { FilmsVehiclesMigration1708735642713 } from '../typeorm/migrations/1708735642713-Films_VehiclesMigration';
import { PeopleFilmsMigration1708735850406 } from '../typeorm/migrations/1708735850406-People_FilmsMigration';
import { PeoplePlanetsMigration1708735858865 } from '../typeorm/migrations/1708735858865-People_PlanetsMigration';
import { PeopleSpeciesMigration1708735866587 } from '../typeorm/migrations/1708735866587-People_SpeciesMigration';
import { PeopleStarshipsMigration1708735874012 } from '../typeorm/migrations/1708735874012-People_StarshipsMigration';
import { PeopleVehiclesMigration1708735882180 } from '../typeorm/migrations/1708735882180-People_VehiclesMigration';
import { PlanetsSpeciesMigration1708735902267 } from '../typeorm/migrations/1708735902267-Planets_SpeciesMigration';
import { StarshipsMigration1708735917551 } from '../typeorm/migrations/1708735917551-StarshipsMigration';
import { VehiclesMigration1708735926564 } from '../typeorm/migrations/1708735926564-VehiclesMigration';

const data = dotenv.parse(fs.readFileSync(`.env`));
export const dbConfig: DataSourceOptions = {
  type: 'mysql',
  host: data.DATABSE_HOST,
  port: +data.DATABSE_PORT,
  username: data.DATABSE_USERNAME,
  password: data.DATABSE_PASSWORD,
  database: data.DATABSE_NAME,
  entities: [
    FilmsEntity,
    Films_PlanetsEntity,
    Films_SpeciesEntity,
    Films_StarshipsEntity,
    Films_VehiclesEntity,
    PeopleEntity,
    People_FilmsEntity,
    People_PlanetsEntity,
    People_VehiclesEntity,
    People_StarshipsEntity,
    People_SpeciesEntity,
    PlanetsEntity,
    Planets_SpeciesEntity,
    SpeciesEntity,
    StarshipsEntity,
    VehiclesEntity,
  ],
  migrations: [
    FilmsMigration1708735546177,
    FilmsPlanetsMigration1708735614046,
    FilmsSpeciesMigration1708735623528,
    FilmsStarshipsMigration1708735632014,
    FilmsVehiclesMigration1708735642713,
    PeopleMigration1708735528905,
    PeopleFilmsMigration1708735850406,
    PeoplePlanetsMigration1708735858865,
    PeopleSpeciesMigration1708735866587,
    PeopleStarshipsMigration1708735874012,
    PeopleVehiclesMigration1708735882180,
    PlanetsMigration1708735556961,
    PlanetsSpeciesMigration1708735902267,
    SpeciesMigration1708735564443,
    StarshipsMigration1708735917551,
    VehiclesMigration1708735926564,
  ],
  synchronize: false,
};

const dataSource = new DataSource(dbConfig);

dataSource.initialize();

export default dataSource;
