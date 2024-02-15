import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { dbConfig } from './config/db.config';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    PeopleModule,
    FileModule,
    // PlanetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
