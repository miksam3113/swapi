import { Module } from '@nestjs/common';
import { FilesService } from './file.service';
import { FilesController } from './file.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FileModule {}
