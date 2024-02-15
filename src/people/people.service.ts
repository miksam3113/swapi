import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { PeopleEntity } from '../typeorm/entities/People';
import { peopleProps } from '../utils/types';
import { FilmsEntity } from '../typeorm/entities/Films';
import { People_FilmsEntity } from '../typeorm/entities/People_Films';
import { People_PlanetsEntity } from '../typeorm/entities/People_Planets';
import { People_SpeciesEntity } from '../typeorm/entities/People_Species';
import { People_StarshipsEntity } from '../typeorm/entities/People_Starships';
import { People_VehiclesEntity } from '../typeorm/entities/People_Vehicles';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
    @InjectRepository(People_FilmsEntity)
    private people_filmsRepository: Repository<People_FilmsEntity>,
    @InjectRepository(People_PlanetsEntity)
    private people_planetsRepository: Repository<People_PlanetsEntity>,
    @InjectRepository(People_SpeciesEntity)
    private people_speciesRepository: Repository<People_SpeciesEntity>,
    @InjectRepository(People_StarshipsEntity)
    private people_starshipsRepository: Repository<People_StarshipsEntity>,
    @InjectRepository(People_VehiclesEntity)
    private people_vehiclesRepository: Repository<People_VehiclesEntity>,
  ) {}

  async getAllPeoples(page: string) {
    const countPeoples = await this.peopleRepository.count();

    if (!countPeoples || countPeoples / 10 + 1 < +page) {
      return new NotFoundException('Peoples not found').getResponse();
    }

    const nextPage =
      page === `${Math.round(countPeoples / 10)}`
        ? `https://swapi.dev/api/people/?page=${+page + 1}`
        : null;
    const previousPage =
      page !== '1' ? `https://swapi.dev/api/people/?page=${+page - 1}` : null;

    const allPeoples = [];

    for (let i = +page * 10 - 9; i <= +page * 10; i++) {
      if (i <= countPeoples) {
        allPeoples.push(await this.getPeople(i));
      }
    }

    return {
      count: countPeoples,
      next: nextPage,
      previous: previousPage,
      results: allPeoples,
    };
  }

  async getPeople(id: number) {
    const people = await this.peopleRepository.findOneById(id);

    if (!people) {
      return new NotFoundException('People not found').getResponse();
    }

    const films = await this.people_filmsRepository.findBy({
      id_people: id,
    });

    const species = await this.people_speciesRepository.findBy({
      id_people: id,
    });

    const vehicles = await this.people_vehiclesRepository.findBy({
      id_people: id,
    });

    const starships = await this.people_starshipsRepository.findBy({
      id_people: id,
    });

    return {
      name: people.name,
      height: people.height,
      mass: people.mass,
      hair_color: people.hair_color,
      skin_color: people.skin_color,
      eye_color: people.eye_color,
      birth_year: people.birth_year,
      gender: people.gender,
      homeworld: people.homeworld,
      films:
        films.length !== 0
          ? films.map((film) => {
              return `https://swapi.dev/api/films/${film.id_films}/`;
            })
          : [],
      species:
        species.length !== 0
          ? species.map((specie) => {
              return `https://swapi.dev/api/species/${specie.id_species}/`;
            })
          : null,
      vehicles:
        vehicles.length !== 0
          ? vehicles.map((vehicle) => {
              return `https://swapi.dev/api/vehicles/${vehicle.id_vehicles}/`;
            })
          : [],
      starships:
        starships.length !== 0
          ? starships.map((starship) => {
              return `https://swapi.dev/api/starships/${starship.id_starships}/`;
            })
          : [],
      created: people.created,
      edited: people.edited,
      url: people.url,
    };
  }

  async createPeople(peopleDetails: peopleProps) {
    const newId = (await this.peopleRepository.count()) + 1;

    const newPeople = this.peopleRepository.create({
      ...peopleDetails,
      created: new Date().toISOString(),
      edited: new Date().toISOString(),
    });

    if (!newPeople) {
      return new NotImplementedException('People create error').getResponse();
    }

    await this.peopleRepository.save(newPeople);

    const parts = peopleDetails.homeworld.split('/');

    const planetId = parts[parts.length - 2];

    const newPeople_Planets = this.people_planetsRepository.create({
      id_people: newId,
      id_planets: +planetId,
    });

    if (!newPeople_Planets) {
      return new NotImplementedException(
        'People_Planets create error',
      ).getResponse();
    }

    await this.people_planetsRepository.save(newPeople_Planets);

    if (peopleDetails.films.length !== 0) {
      for (const film of peopleDetails.films) {
        const parts = film.split('/');

        const filmId = parts[parts.length - 2];
        const newPeople_Films = this.people_filmsRepository.create({
          id_people: newId,
          id_films: +filmId,
        });

        if (!newPeople_Films) {
          return new NotImplementedException(
            'People_Films create error',
          ).getResponse();
        }

        await this.people_filmsRepository.save(newPeople_Films);
      }
    }

    if (peopleDetails.species.length !== 0) {
      for (const specie of peopleDetails.species) {
        const parts = specie.split('/');

        const specieId = parts[parts.length - 2];
        const newPeople_Species = this.people_speciesRepository.create({
          id_people: newId,
          id_species: +specieId,
        });

        if (!newPeople_Species) {
          return new NotImplementedException(
            'People_Species create error',
          ).getResponse();
        }

        await this.people_speciesRepository.save(newPeople_Species);
      }
    }

    if (peopleDetails.vehicles.length !== 0) {
      for (const vehicle of peopleDetails.vehicles) {
        const parts = vehicle.split('/');

        const vehicleId = parts[parts.length - 2];
        const newPeople_Vehicles = this.people_vehiclesRepository.create({
          id_people: newId,
          id_vehicles: +vehicleId,
        });

        if (!newPeople_Vehicles) {
          return new NotImplementedException(
            'People_Vehicles create error',
          ).getResponse();
        }

        await this.people_vehiclesRepository.save(newPeople_Vehicles);
      }
    }

    if (peopleDetails.starships.length !== 0) {
      for (const starship of peopleDetails.starships) {
        const parts = starship.split('/');

        const starshipId = parts[parts.length - 2];
        const newPeople_Starships = this.people_starshipsRepository.create({
          id_people: newId,
          id_starships: +starshipId,
        });

        if (!newPeople_Starships) {
          return new NotImplementedException(
            'People_Starships create error',
          ).getResponse();
        }

        await this.people_starshipsRepository.save(newPeople_Starships);
      }
    }

    return `{"created": "ok", "id": "${newPeople.id}"}`;
  }

  async updatePeople(id: number, peopleDetails: peopleProps) {
    for (const film of peopleDetails.films) {
      const parts = film.split('/');

      const filmId = parts[parts.length - 2];

      const people_films = await this.people_filmsRepository.findBy({
        id_people: id,
        id_films: +filmId,
      });

      if (!people_films) {
        const newPeople_Films = this.people_filmsRepository.create({
          id_people: id,
          id_films: +filmId,
        });

        if (!newPeople_Films) {
          return new NotImplementedException(
            'People_Films update error',
          ).getResponse();
        }

        await this.people_filmsRepository.save(newPeople_Films);
      }
    }

    const updatedPeople = await this.peopleRepository.update(
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

    if (!updatedPeople) {
      return new NotImplementedException('People update error').getResponse();
    }

    return '{"updated": "ok"}';
  }

  async deletePeople(id: number) {
    const deletedPeople = await this.peopleRepository.delete(id);

    if (!deletedPeople) {
      return new NotImplementedException('People delete error').getResponse();
    }

    return `{"deleted": "ok"}`;
  }
}
