import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { dbConfig } from './config/db.config';
import { FileModule } from './file/file.module';
import { FilmsModule } from './films/films.module';
import { PlanetsModule } from './planets/planets.module';
import { SpeciesModule } from './species/species.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    PeopleModule,
    FileModule,
    FilmsModule,
    PlanetsModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
