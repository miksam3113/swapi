import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { SpeciesEntity } from '../typeorm/entities/Species';
import { People_SpeciesEntity } from '../typeorm/entities/People_Species';
import { Planets_SpeciesEntity } from '../typeorm/entities/Planets_Species';
import { Films_SpeciesEntity } from '../typeorm/entities/Films_Species';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpeciesEntity,
      People_SpeciesEntity,
      Planets_SpeciesEntity,
      Films_SpeciesEntity,
    ]),
  ],
  providers: [SpeciesService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
