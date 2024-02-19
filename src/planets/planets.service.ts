import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository, Timestamp } from 'typeorm';
import { PeopleEntity } from '../typeorm/entities/People';
import { filmsProps, peopleProps, planetsProps } from '../utils/types';
import { FilmsEntity } from '../typeorm/entities/Films';
import { People_FilmsEntity } from '../typeorm/entities/People_Films';
import { People_PlanetsEntity } from '../typeorm/entities/People_Planets';
import { People_SpeciesEntity } from '../typeorm/entities/People_Species';
import { People_StarshipsEntity } from '../typeorm/entities/People_Starships';
import { People_VehiclesEntity } from '../typeorm/entities/People_Vehicles';
import { Films_PlanetsEntity } from '../typeorm/entities/Films_Planets';
import { Films_SpeciesEntity } from '../typeorm/entities/Films_Species';
import { Films_StarshipsEntity } from '../typeorm/entities/Films_Starships';
import { Films_VehiclesEntity } from '../typeorm/entities/Films_Vehicles';
import { PlanetsEntity } from '../typeorm/entities/Planets';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(PlanetsEntity)
    private planetsRepository: Repository<PlanetsEntity>,
    @InjectRepository(People_PlanetsEntity)
    private people_planetsRepository: Repository<People_PlanetsEntity>,
    @InjectRepository(Films_PlanetsEntity)
    private films_planetsRepository: Repository<Films_PlanetsEntity>,
  ) {}

  async getAllPlanets(page: string) {
    const countPlanets = await this.planetsRepository.count();

    if (!countPlanets || countPlanets / 10 + 1 < +page) {
      return new NotFoundException('Planets not found').getResponse();
    }

    const nextPage =
      page === `${Math.round(countPlanets / 10)}`
        ? `https://swapi.dev/api/planets/?page=${+page + 1}`
        : null;
    const previousPage =
      page !== '1' ? `https://swapi.dev/api/planets/?page=${+page - 1}` : null;

    const allPlanets = [];

    for (let i = +page * 10 - 9; i <= +page * 10; i++) {
      if (i <= countPlanets) {
        allPlanets.push(await this.getPlanet(i));
      }
    }

    return {
      count: countPlanets,
      next: nextPage,
      previous: previousPage,
      results: allPlanets,
    };
  }

  async getPlanet(id: number) {
    const planet = await this.planetsRepository.findOneById(id);

    if (!planet) {
      return new NotFoundException('Planet not found').getResponse();
    }

    const residents = await this.people_planetsRepository.findBy({
      id_planets: id,
    });

    const films = await this.films_planetsRepository.findBy({
      id_planets: id,
    });

    return {
      name: planet.name,
      rotation_period: planet.rotation_period,
      orbital_period: planet.orbital_period,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surface_water: planet.surface_water,
      population: planet.population,
      residents:
        residents.length !== 0
          ? residents.map((resident) => {
              return `https://swapi.dev/api/people/${resident.id_people}/`;
            })
          : [],
      films:
        films.length !== 0
          ? films.map((film) => {
              return `https://swapi.dev/api/films/${film.id_films}/`;
            })
          : [],
      created: planet.created,
      edited: planet.edited,
      url: planet.url,
    };
  }

  async createPlanet(planetDetails: planetsProps) {
    const newId = (await this.planetsRepository.count()) + 1;

    // people_planets

    if (planetDetails.residents.length !== 0) {
      for (const resident of planetDetails.residents) {
        const parts = resident.split('/');

        const residentId = parts[parts.length - 2];
        const people_Planets = await this.people_planetsRepository.findOneBy({
          id_people: +residentId,
          id_planets: +newId,
        });

        if (!people_Planets) {
          const newPeople_Planets = this.people_planetsRepository.create({
            id_people: +residentId,
            id_planets: +newId,
          });

          if (!newPeople_Planets) {
            return new NotImplementedException(
              'People_Planets create error',
            ).getResponse();
          }

          await this.people_planetsRepository.save(newPeople_Planets);
        }
      }
    }

    // films_planets

    if (planetDetails.films.length !== 0) {
      for (const film of planetDetails.films) {
        const parts = film.split('/');

        const filmId = parts[parts.length - 2];
        const films_Planets = await this.films_planetsRepository.findOneBy({
          id_planets: +newId,
          id_films: +filmId,
        });

        if (!films_Planets) {
          const newFilms_Planets = this.films_planetsRepository.create({
            id_planets: +newId,
            id_films: +filmId,
          });

          if (!newFilms_Planets) {
            return new NotImplementedException(
              'Films_Planets create error',
            ).getResponse();
          }

          await this.films_planetsRepository.save(newFilms_Planets);
        }
      }
    }

    const newPlanet = this.planetsRepository.create({
      name: planetDetails.name,
      rotation_period: planetDetails.rotation_period,
      orbital_period: planetDetails.orbital_period,
      diameter: planetDetails.diameter,
      climate: planetDetails.climate,
      gravity: planetDetails.gravity,
      terrain: planetDetails.terrain,
      surface_water: planetDetails.surface_water,
      population: planetDetails.population,
      created: new Date().toISOString(),
      edited: new Date().toISOString(),
      url: planetDetails.url,
    });

    if (!newPlanet) {
      return new NotImplementedException('Planet create error').getResponse();
    }

    await this.planetsRepository.save(newPlanet);

    return `{"created": "ok", "id": "${newId}"}`;
  }

  async updatePlanet(id: number, planetDetails: planetsProps) {
    // people_planets

    if (planetDetails.residents.length !== 0) {
      const old_people_planets = await this.people_planetsRepository.findBy({
        id_planets: id,
      });

      const missing_planets = old_people_planets.filter(
        (item) =>
          !planetDetails.residents
            .map((resident) => {
              const parts = resident.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_people),
      );

      if (missing_planets.length === 0) {
        for (const resident of planetDetails.residents) {
          const parts = resident.split('/');

          const residentId = parts[parts.length - 2];
          const people_planets = await this.people_planetsRepository.findOneBy({
            id_planets: id,
            id_people: +residentId,
          });

          if (!people_planets) {
            const newPeople_Planets = this.people_planetsRepository.create({
              id_planets: id,
              id_people: +residentId,
            });

            if (!newPeople_Planets) {
              return new NotImplementedException(
                'People_Planets create error',
              ).getResponse();
            }

            await this.people_planetsRepository.save(newPeople_Planets);
          }
        }
      } else {
        for (const missing_planet of missing_planets) {
          await this.people_planetsRepository.delete(missing_planet.id);
        }
      }
    }

    // films_planets

    if (planetDetails.films.length !== 0) {
      const old_films_planets = await this.films_planetsRepository.findBy({
        id_planets: id,
      });

      const missing_planets = old_films_planets.filter(
        (item) =>
          !planetDetails.films
            .map((film) => {
              const parts = film.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_films),
      );

      if (missing_planets.length === 0) {
        for (const film of planetDetails.films) {
          const parts = film.split('/');

          const filmId = parts[parts.length - 2];

          const films_planets = await this.films_planetsRepository.findBy({
            id_planets: id,
            id_films: +filmId,
          });

          if (!films_planets) {
            const newFilms_Planets = this.films_planetsRepository.create({
              id_planets: id,
              id_films: +filmId,
            });

            if (!newFilms_Planets) {
              return new NotImplementedException(
                'Films_Planets create error',
              ).getResponse();
            }

            await this.films_planetsRepository.save(newFilms_Planets);
          }
        }
      } else {
        for (const missing_planet of missing_planets) {
          await this.films_planetsRepository.delete(missing_planet.id);
        }
      }
    }

    const updatedPlanet = await this.planetsRepository.update(
      { id },
      {
        name: planetDetails.name,
        rotation_period: planetDetails.rotation_period,
        orbital_period: planetDetails.orbital_period,
        diameter: planetDetails.diameter,
        climate: planetDetails.climate,
        gravity: planetDetails.gravity,
        terrain: planetDetails.terrain,
        surface_water: planetDetails.surface_water,
        population: planetDetails.population,
        created: planetDetails.created,
        edited: new Date().toISOString(),
        url: planetDetails.url,
      },
    );

    if (!updatedPlanet) {
      return new NotImplementedException('Planet update error').getResponse();
    }

    return '{"updated": "ok"}';
  }

  async deletePlanet(id: number) {
    const deletedPlanet = await this.planetsRepository.delete(id);

    // people_films

    const people_planets = await this.people_planetsRepository.findBy({
      id_planets: id,
    });

    if (people_planets) {
      for (const people_planet of people_planets) {
        await this.people_planetsRepository.delete(people_planet.id);
      }
    }

    // films_planets

    const films_planets = await this.films_planetsRepository.findBy({
      id_planets: id,
    });

    if (films_planets) {
      for (const films_planet of films_planets) {
        await this.films_planetsRepository.delete(films_planet.id);
      }
    }

    if (!deletedPlanet) {
      return new NotImplementedException('Planet delete error').getResponse();
    }

    return `{"deleted": "ok"}`;
  }
}
