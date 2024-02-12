import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsEntity } from '../typeorm/entities/Films';

@Module({
  imports: [TypeOrmModule.forFeature([FilmsEntity])],
  providers: [FilmsService],
  controllers: [FilmsController],
})
export class FilmsModule {}
