import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Films_PlanetsEntity } from '../typeorm/entities/Films_Planets';
import { PlanetsEntity } from '../typeorm/entities/Planets';
import { People_PlanetsEntity } from '../typeorm/entities/People_Planets';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlanetsEntity,
      People_PlanetsEntity,
      Films_PlanetsEntity,
    ]),
  ],
  providers: [PlanetsService],
  controllers: [PlanetsController],
})
export class PlanetsModule {}
