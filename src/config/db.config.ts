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

const data: any = dotenv.parse(fs.readFileSync(`.env`));
export const dbConfig: DataSourceOptions = {
  type: 'mysql',
  host: data.DATABSE_HOST,
  port: data.DATABSE_PORT,
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
  migrations: ['src/typeorm/migrations/*{.ts,.js}'],
  synchronize: false,
};

const dataSource = new DataSource(dbConfig);

dataSource.initialize();

export default dataSource;
