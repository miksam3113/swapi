import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { PeopleEntity } from '../typeorm/entities/People';
import { People_FilmsEntity } from '../typeorm/entities/People_Films';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity, People_FilmsEntity])],
  providers: [PeopleService],
  controllers: [PeopleController],
})
export class PeopleModule {}
