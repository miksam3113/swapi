import { Injectable } from '@nestjs/common';
import { FilesResponse } from './file.interface';
import { path } from 'app-root-path';
import { ensureDir, remove, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async saveFiles(
    file: Express.Multer.File,
    folder: string = 'default',
  ): Promise<FilesResponse> {
    const uploadFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

    return {
      url: `/uploads/${folder}/${file.originalname}`,
      name: file.originalname,
    };
  }

  async deleteFile(folder: string, name: string) {
    await remove(`${path}/uploads/${folder}/${name}`);

    return '{"deleted": "ok"}';
  }
}
