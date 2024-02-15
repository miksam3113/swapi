import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { PeopleEntity } from '../typeorm/entities/People';
import { People_FilmsEntity } from '../typeorm/entities/People_Films';
import { People_PlanetsEntity } from '../typeorm/entities/People_Planets';
import { People_SpeciesEntity } from '../typeorm/entities/People_Species';
import { People_StarshipsEntity } from '../typeorm/entities/People_Starships';
import { People_VehiclesEntity } from '../typeorm/entities/People_Vehicles';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PeopleEntity,
      People_FilmsEntity,
      People_PlanetsEntity,
      People_SpeciesEntity,
      People_StarshipsEntity,
      People_VehiclesEntity,
    ]),
  ],
  providers: [PeopleService],
  controllers: [PeopleController],
})
export class PeopleModule {}
