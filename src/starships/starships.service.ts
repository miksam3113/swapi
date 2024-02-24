import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { speciesProps, starshipsProps } from '../utils/types';
import { People_SpeciesEntity } from '../typeorm/entities/People_Species';
import { Films_SpeciesEntity } from '../typeorm/entities/Films_Species';
import { SpeciesEntity } from '../typeorm/entities/Species';
import { Planets_SpeciesEntity } from '../typeorm/entities/Planets_Species';
import { StarshipsEntity } from '../typeorm/entities/Starships';
import { People_StarshipsEntity } from '../typeorm/entities/People_Starships';
import { Films_StarshipsEntity } from '../typeorm/entities/Films_Starships';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(StarshipsEntity)
    private starshipsRepository: Repository<StarshipsEntity>,
    @InjectRepository(People_StarshipsEntity)
    private people_starshipsRepository: Repository<People_StarshipsEntity>,
    @InjectRepository(Films_StarshipsEntity)
    private films_starshipsRepository: Repository<Films_StarshipsEntity>,
  ) {}

  async getAllStarships(page: string) {
    const countStarships = await this.starshipsRepository.count();

    if (!countStarships || countStarships / 10 + 1 < +page) {
      return new NotFoundException('Starships not found').getResponse();
    }

    const nextPage =
      page === `${Math.round(countStarships / 10)}`
        ? `https://swapi.dev/api/starships/?page=${+page + 1}`
        : null;
    const previousPage =
      page !== '1'
        ? `https://swapi.dev/api/starships/?page=${+page - 1}`
        : null;

    const allStarships = [];

    for (let i = +page * 10 - 9; i <= +page * 10; i++) {
      if (i <= countStarships) {
        allStarships.push(await this.getStarship(i));
      }
    }

    return {
      count: countStarships,
      next: nextPage,
      previous: previousPage,
      results: allStarships,
    };
  }

  async getStarship(id: number) {
    const starship = await this.starshipsRepository.findOneById(id);

    if (!starship) {
      return new NotFoundException('Starships not found').getResponse();
    }

    const people = await this.people_starshipsRepository.findBy({
      id_starships: id,
    });

    const films = await this.films_starshipsRepository.findBy({
      id_starships: id,
    });

    return {
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      cost_in_credits: starship.cost_in_credits,
      length: starship.length,
      max_atmosphering_speed: starship.max_atmosphering_speed,
      crew: starship.crew,
      passengers: starship.passengers,
      cargo_capacity: starship.cargo_capacity,
      consumables: starship.consumables,
      hyperdrive_rating: starship.hyperdrive_rating,
      MGLT: starship.MGLT,
      starship_class: starship.starship_class,
      pilots:
        people.length !== 0
          ? people.map((peopleOne) => {
              return `https://swapi.dev/api/people/${peopleOne.id_people}/`;
            })
          : [],
      films:
        films.length !== 0
          ? films.map((film) => {
              return `https://swapi.dev/api/films/${film.id_films}/`;
            })
          : [],
      created: starship.created,
      edited: starship.edited,
      url: starship.url,
    };
  }

  async createStarship(starshipDetails: starshipsProps) {
    const newId = (await this.starshipsRepository.count()) + 1;
    // people_starships

    if (starshipDetails.pilots.length !== 0) {
      for (const peopleOne of starshipDetails.pilots) {
        const parts = peopleOne.split('/');

        const peopleOneId = parts[parts.length - 2];
        const people_starships =
          await this.people_starshipsRepository.findOneBy({
            id_people: +peopleOneId,
            id_starships: +newId,
          });

        if (!people_starships) {
          const newPeople_Starships = this.people_starshipsRepository.create({
            id_people: +peopleOneId,
            id_starships: +newId,
          });

          if (!newPeople_Starships) {
            return new NotImplementedException(
              'People_Starships create error',
            ).getResponse();
          }

          await this.people_starshipsRepository.save(newPeople_Starships);
        }
      }
    }

    // films_starships

    if (starshipDetails.films.length !== 0) {
      for (const film of starshipDetails.films) {
        const parts = film.split('/');

        const filmId = parts[parts.length - 2];
        const films_starships = await this.films_starshipsRepository.findOneBy({
          id_starships: +newId,
          id_films: +filmId,
        });

        if (!films_starships) {
          const newFilms_Starships = this.films_starshipsRepository.create({
            id_starships: +newId,
            id_films: +filmId,
          });

          if (!newFilms_Starships) {
            return new NotImplementedException(
              'Films_Starships create error',
            ).getResponse();
          }

          await this.films_starshipsRepository.save(newFilms_Starships);
        }
      }
    }

    const newStarship = this.starshipsRepository.create({
      name: starshipDetails.name,
      model: starshipDetails.model,
      manufacturer: starshipDetails.manufacturer,
      cost_in_credits: starshipDetails.cost_in_credits,
      length: starshipDetails.length,
      max_atmosphering_speed: starshipDetails.max_atmosphering_speed,
      crew: starshipDetails.crew,
      passengers: starshipDetails.passengers,
      cargo_capacity: starshipDetails.cargo_capacity,
      consumables: starshipDetails.consumables,
      hyperdrive_rating: starshipDetails.hyperdrive_rating,
      MGLT: starshipDetails.MGLT,
      starship_class: starshipDetails.starship_class,
      created: new Date().toISOString(),
      edited: new Date().toISOString(),
      url: starshipDetails.url,
    });

    if (!newStarship) {
      return new NotImplementedException('Starship create error').getResponse();
    }

    await this.starshipsRepository.save(newStarship);

    return `${newId}`;
  }

  async updateStarship(id: number, starshipDetails: starshipsProps) {
    // people_starships

    if (starshipDetails.pilots.length !== 0) {
      const old_people_starships = await this.people_starshipsRepository.findBy(
        {
          id_starships: id,
        },
      );

      const missing_starships = old_people_starships.filter(
        (item) =>
          !starshipDetails.pilots
            .map((peopleOne) => {
              const parts = peopleOne.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_people),
      );

      if (missing_starships.length === 0) {
        for (const peopleOne of starshipDetails.pilots) {
          const parts = peopleOne.split('/');

          const peopleOneId = parts[parts.length - 2];

          const people_species = await this.people_starshipsRepository.findBy({
            id_starships: id,
            id_people: +peopleOneId,
          });

          if (!people_species) {
            const newPeople_Starships = this.people_starshipsRepository.create({
              id_starships: id,
              id_people: +peopleOneId,
            });

            if (!newPeople_Starships) {
              return new NotImplementedException(
                'People_Starships create error',
              ).getResponse();
            }

            await this.people_starshipsRepository.save(newPeople_Starships);
          }
        }
      } else {
        for (const missing_starship of missing_starships) {
          await this.people_starshipsRepository.delete(missing_starship.id);
        }
      }
    }

    // films_starships

    if (starshipDetails.films.length !== 0) {
      const old_films_starships = await this.films_starshipsRepository.findBy({
        id_starships: id,
      });

      const missing_starships = old_films_starships.filter(
        (item) =>
          !starshipDetails.films
            .map((film) => {
              const parts = film.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_films),
      );

      if (missing_starships.length === 0) {
        for (const film of starshipDetails.films) {
          const parts = film.split('/');

          const filmId = parts[parts.length - 2];

          const films_starships = await this.films_starshipsRepository.findBy({
            id_starships: id,
            id_films: +filmId,
          });

          if (!films_starships) {
            const newFilms_Starships = this.films_starshipsRepository.create({
              id_starships: id,
              id_films: +filmId,
            });

            if (!newFilms_Starships) {
              return new NotImplementedException(
                'Films_Starships create error',
              ).getResponse();
            }

            await this.films_starshipsRepository.save(newFilms_Starships);
          }
        }
      } else {
        for (const missing_starship of missing_starships) {
          await this.films_starshipsRepository.delete(missing_starship.id);
        }
      }
    }

    const updatedStarship = await this.starshipsRepository.update(
      { id },
      {
        name: starshipDetails.name,
        model: starshipDetails.model,
        manufacturer: starshipDetails.manufacturer,
        cost_in_credits: starshipDetails.cost_in_credits,
        length: starshipDetails.length,
        max_atmosphering_speed: starshipDetails.max_atmosphering_speed,
        crew: starshipDetails.crew,
        passengers: starshipDetails.passengers,
        cargo_capacity: starshipDetails.cargo_capacity,
        consumables: starshipDetails.consumables,
        hyperdrive_rating: starshipDetails.hyperdrive_rating,
        MGLT: starshipDetails.MGLT,
        starship_class: starshipDetails.starship_class,
        created: starshipDetails.created,
        edited: new Date().toISOString(),
        url: starshipDetails.url,
      },
    );

    if (!updatedStarship) {
      return new NotImplementedException('Starship update error').getResponse();
    }

    return { entity: 'starships', id: id };
  }

  async deleteStarship(id: number) {
    const deletedStarship = await this.starshipsRepository.delete(id);

    // people_starships

    const people_starships = await this.people_starshipsRepository.findBy({
      id_starships: id,
    });

    if (people_starships) {
      for (const people_starship of people_starships) {
        await this.people_starshipsRepository.delete(people_starship.id);
      }
    }

    // films_starships

    const films_starships = await this.films_starshipsRepository.findBy({
      id_starships: id,
    });

    if (films_starships) {
      for (const films_starship of films_starships) {
        await this.films_starshipsRepository.delete(films_starship.id);
      }
    }

    if (!deletedStarship) {
      return new NotImplementedException('Starship delete error').getResponse();
    }

    return { entity: 'starships', id: id };
  }
}
