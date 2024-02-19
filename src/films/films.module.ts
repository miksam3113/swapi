import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { People_FilmsEntity } from '../typeorm/entities/People_Films';
import { FilmsEntity } from '../typeorm/entities/Films';
import { Films_PlanetsEntity } from '../typeorm/entities/Films_Planets';
import { Films_SpeciesEntity } from '../typeorm/entities/Films_Species';
import { Films_StarshipsEntity } from '../typeorm/entities/Films_Starships';
import { Films_VehiclesEntity } from '../typeorm/entities/Films_Vehicles';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FilmsEntity,
      People_FilmsEntity,
      Films_PlanetsEntity,
      Films_SpeciesEntity,
      Films_StarshipsEntity,
      Films_VehiclesEntity,
    ]),
  ],
  providers: [FilmsService],
  controllers: [FilmsController],
})
export class FilmsModule {}
