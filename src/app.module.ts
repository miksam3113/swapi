import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { PeopleEntity } from './typeorm/entities/People';
import { FilmsEntity } from './typeorm/entities/Films';
import { People_FilmsEntity } from './typeorm/entities/People_Films';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'swapi',
      entities: [PeopleEntity, FilmsEntity, People_FilmsEntity],
      synchronize: true,
    }),
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
