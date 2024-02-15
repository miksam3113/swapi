import { Injectable } from '@nestjs/common';
import entities from './config/entities';

@Injectable()
export class AppService {
  getEntities(): {} {
    const result = {};

    for (const [index, value] of entities.entries()) {
      result[value.title] = value.url;
    }

    return result;
  }
}
