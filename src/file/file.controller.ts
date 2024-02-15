import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { type: string },
  ) {
    return this.filesService.saveFiles(file, body.type);
  }

  @Delete('/:folder/:name')
  @UseInterceptors(FileInterceptor('file'))
  async deleteFile(
    @Param('folder') folder: string,
    @Param('name') name: string,
  ) {
    return this.filesService.deleteFile(folder, name);
  }
}
