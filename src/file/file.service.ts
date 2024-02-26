import { Injectable, StreamableFile } from '@nestjs/common';
import { FilesResponse } from './file.interface';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const data = dotenv.parse(fs.readFileSync(`.env`));

@Injectable()
export class FilesService {
  private readonly s3 = new S3Client({
    region: data.AWS_S3_REGION,
    credentials: {
      accessKeyId: data.AWS_S3_ACCESS_KEY,
      secretAccessKey: data.AWS_S3_SECRET_ACCESS_KEY,
    },
  });

  async saveFiles(
    file: Express.Multer.File,
    folder: string = 'default',
  ): Promise<FilesResponse> {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: data.AWS_S3_BUCKET_NAME,
        Key: `${folder}/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );

    return {
      url: `https://${data.AWS_S3_BUCKET_NAME}.s3.${data.AWS_S3_REGION}.amazonaws.com/${folder}/${file.originalname}`,
      folder: folder,
      name: file.originalname,
    };
  }

  async deleteFile(folder: string, name: string) {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: data.AWS_S3_BUCKET_NAME,
        Key: `${folder}/${name}`,
      }),
    );

    return '{"deleted": "ok"}';
  }
}
