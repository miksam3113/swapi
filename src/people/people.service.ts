import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { PeopleEntity } from '../typeorm/entities/People';
import { peopleProps } from '../utils/types';
import { FilmsEntity } from '../typeorm/entities/Films';
import { People_FilmsEntity } from '../typeorm/entities/People_Films';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
    @InjectRepository(People_FilmsEntity)
    private people_filmsRepository: Repository<People_FilmsEntity>,
  ) {}

  async getAllPeoples(page?: string) {
    const allPeople = await this.peopleRepository.find();

    return {
      count: allPeople.length,
      next: `https://swapi.dev/api/people/?page=${+page + 1}`,
      previous:
        page !== '1' ? `https://swapi.dev/api/people/?page=${+page - 1}` : null,
      results: allPeople,
    };
  }

  getPeople(id: number) {
    return this.peopleRepository.findOneById(id);
  }

  async createPeople(peopleDetails: peopleProps) {
    const newPeople = this.peopleRepository.create({
      ...peopleDetails,
      created: new Date().toISOString(),
      edited: new Date().toISOString(),
    });
    await this.peopleRepository.save(newPeople);

    for (const film of peopleDetails.films) {
      const parts = film.split('/');

      const filmId = parts[parts.length - 2];
      const newPeople_Films = this.people_filmsRepository.create({
        id_people: newPeople.id,
        id_film: +filmId,
      });

      await this.people_filmsRepository.save(newPeople_Films);
    }

    return `{"created": "ok", "id": "${newPeople.id}"}`;
  }

  async updatePeople(id: number, peopleDetails: peopleProps) {
    for (const film of peopleDetails.films) {
      const parts = film.split('/');

      const filmId = parts[parts.length - 2];
      const newPeople_Films = this.people_filmsRepository.create({
        id_people: id,
        id_film: +filmId,
      });

      await this.people_filmsRepository.save(newPeople_Films);
    }

    await this.peopleRepository.update(
      { id },
      {
        name: peopleDetails.name,
        height: peopleDetails.height,
        mass: peopleDetails.mass,
        hair_color: peopleDetails.hair_color,
        skin_color: peopleDetails.skin_color,
        eye_color: peopleDetails.eye_color,
        birth_year: peopleDetails.birth_year,
        gender: peopleDetails.gender,
        homeworld: peopleDetails.homeworld,
        created: peopleDetails.created,
        edited: new Date().toISOString(),
        url: peopleDetails.url,
      },
    );
    return '{"updated": "ok"}';
  }

  async deletePeople(id: number) {
    await this.peopleRepository.delete(id);
    return `{"deleted": "ok"}`;
  }
}
