import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { StarshipsEntity } from '../typeorm/entities/Starships';
import { People_StarshipsEntity } from '../typeorm/entities/People_Starships';
import { Films_StarshipsEntity } from '../typeorm/entities/Films_Starships';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StarshipsEntity,
      People_StarshipsEntity,
      Films_StarshipsEntity,
    ]),
  ],
  providers: [StarshipsService],
  controllers: [StarshipsController],
})
export class StarshipsModule {}
