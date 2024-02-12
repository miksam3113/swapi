import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsEntity } from '../typeorm/entities/Films';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,
  ) {}

  // async getAllPeoples(page?: string) {
  //   const allPeople = await this.peopleRepository.find();
  //
  //   return {
  //     count: allPeople.length,
  //     next: `https://swapi.dev/api/people/?page=${+page + 1}`,
  //     previous:
  //       page !== '1' ? `https://swapi.dev/api/people/?page=${+page - 1}` : null,
  //     results: allPeople,
  //   };
  // }
  //
  // getPeople(id: number) {
  //   return this.peopleRepository.findOneById(id);
  // }
  //
  // async createPeople(peopleDetails: peopleProps) {
  //   const newPeople = this.peopleRepository.create({
  //     ...peopleDetails,
  //     created: Date(),
  //     edited: Date(),
  //   });
  //   await this.peopleRepository.save(newPeople);
  //   return '{"created": "ok"}';
  // }
  //
  // async updatePeople(id: number, peopleDetails: peopleProps) {
  //   await this.peopleRepository.update(
  //     { id },
  //     {
  //       ...peopleDetails,
  //       edited: Date(),
  //     },
  //   );
  //   return '{"updated": "ok"}';
  // }
}
