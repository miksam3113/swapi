import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { speciesProps } from '../utils/types';
import { People_SpeciesEntity } from '../typeorm/entities/People_Species';
import { Films_SpeciesEntity } from '../typeorm/entities/Films_Species';
import { SpeciesEntity } from '../typeorm/entities/Species';
import { Planets_SpeciesEntity } from '../typeorm/entities/Planets_Species';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private speciesRepository: Repository<SpeciesEntity>,
    @InjectRepository(People_SpeciesEntity)
    private people_speciesRepository: Repository<People_SpeciesEntity>,
    @InjectRepository(Films_SpeciesEntity)
    private films_speciesRepository: Repository<Films_SpeciesEntity>,
    @InjectRepository(Planets_SpeciesEntity)
    private planets_speciesRepository: Repository<Planets_SpeciesEntity>,
  ) {}

  async getAllSpecies(page: string) {
    const countSpecies = await this.speciesRepository.count();

    if (!countSpecies || countSpecies / 10 + 1 < +page) {
      return new NotFoundException('Species not found').getResponse();
    }

    const nextPage =
      page === `${Math.round(countSpecies / 10)}`
        ? `https://swapi.dev/api/species/?page=${+page + 1}`
        : null;
    const previousPage =
      page !== '1' ? `https://swapi.dev/api/species/?page=${+page - 1}` : null;

    const allSpecies = [];

    for (let i = +page * 10 - 9; i <= +page * 10; i++) {
      if (i <= countSpecies) {
        allSpecies.push(await this.getSpecie(i));
      }
    }

    return {
      count: countSpecies,
      next: nextPage,
      previous: previousPage,
      results: allSpecies,
    };
  }

  async getSpecie(id: number) {
    const specie = await this.speciesRepository.findOneById(id);

    if (!specie) {
      return new NotFoundException('Specie not found').getResponse();
    }

    const planet = await this.planets_speciesRepository.findOneBy({
      id_species: id,
    });

    const people = await this.people_speciesRepository.findBy({
      id_species: id,
    });

    const films = await this.films_speciesRepository.findBy({
      id_species: id,
    });

    return {
      name: specie.name,
      classification: specie.classification,
      designation: specie.designation,
      average_height: specie.average_height,
      skin_colors: specie.skin_colors,
      hair_colors: specie.hair_colors,
      eye_colors: specie.eye_colors,
      average_lifespan: specie.average_lifespan,
      homeworld: `https://swapi.dev/api/people/${planet.id_planets}/`,
      language: specie.language,
      people:
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
      created: specie.created,
      edited: specie.edited,
      url: specie.url,
    };
  }

  async createSpecie(specieDetails: speciesProps) {
    const newId = (await this.speciesRepository.count()) + 1;
    // people_species

    if (specieDetails.people.length !== 0) {
      for (const peopleOne of specieDetails.people) {
        const parts = peopleOne.split('/');

        const peopleOneId = parts[parts.length - 2];
        const people_species = await this.people_speciesRepository.findOneBy({
          id_people: +peopleOneId,
          id_species: +newId,
        });

        if (!people_species) {
          const newPeople_Species = this.people_speciesRepository.create({
            id_people: +peopleOneId,
            id_species: +newId,
          });

          if (!newPeople_Species) {
            return new NotImplementedException(
              'People_Species create error',
            ).getResponse();
          }

          await this.people_speciesRepository.save(newPeople_Species);
        }
      }
    }

    // films_species

    if (specieDetails.films.length !== 0) {
      for (const film of specieDetails.films) {
        const parts = film.split('/');

        const filmId = parts[parts.length - 2];
        const films_species = await this.films_speciesRepository.findOneBy({
          id_species: +newId,
          id_films: +filmId,
        });

        if (!films_species) {
          const newFilms_Species = this.films_speciesRepository.create({
            id_species: +newId,
            id_films: +filmId,
          });

          if (!newFilms_Species) {
            return new NotImplementedException(
              'Films_Species create error',
            ).getResponse();
          }

          await this.films_speciesRepository.save(newFilms_Species);
        }
      }
    }

    // planets_species

    const parts = specieDetails.homeworld.split('/');

    const planetId = parts[parts.length - 2];

    const newPlanets_Species = this.planets_speciesRepository.create({
      id_species: newId,
      id_planets: +planetId,
    });

    if (!newPlanets_Species) {
      return new NotImplementedException(
        'Planets_Species create error',
      ).getResponse();
    }

    await this.planets_speciesRepository.save(newPlanets_Species);

    const newSpecie = this.speciesRepository.create({
      name: specieDetails.name,
      classification: specieDetails.classification,
      designation: specieDetails.designation,
      average_height: specieDetails.average_height,
      skin_colors: specieDetails.skin_colors,
      hair_colors: specieDetails.hair_colors,
      eye_colors: specieDetails.eye_colors,
      average_lifespan: specieDetails.average_lifespan,
      language: specieDetails.language,
      created: new Date().toISOString(),
      edited: new Date().toISOString(),
      url: specieDetails.url,
    });

    if (!newSpecie) {
      return new NotImplementedException('Specie create error').getResponse();
    }

    await this.speciesRepository.save(newSpecie);

    return `{"created": "ok", "id": "${newId}"}`;
  }

  async updateSpecie(id: number, specieDetails: speciesProps) {
    // planets_species

    const parts = specieDetails.homeworld.split('/');

    const planetId = +parts[parts.length - 2];

    const planets_species = await this.planets_speciesRepository.findOneBy({
      id_species: id,
    });
    if (!planets_species) {
      const newPlanets_Species = this.planets_speciesRepository.create({
        id_species: id,
        id_planets: planetId,
      });

      if (!newPlanets_Species) {
        return new NotImplementedException(
          'Planets_Species update error',
        ).getResponse();
      }

      await this.planets_speciesRepository.save(newPlanets_Species);
    } else if (planets_species['id_planets'] !== +planetId) {
      await this.planets_speciesRepository.delete(planets_species.id);

      const newPlanets_Species = this.planets_speciesRepository.create({
        id_species: id,
        id_planets: planetId,
      });

      if (!newPlanets_Species) {
        return new NotImplementedException(
          'Planets_Species update error',
        ).getResponse();
      }

      await this.planets_speciesRepository.save(newPlanets_Species);
    }

    // people_species

    if (specieDetails.people.length !== 0) {
      const old_people_species = await this.people_speciesRepository.findBy({
        id_species: id,
      });

      const missing_species = old_people_species.filter(
        (item) =>
          !specieDetails.people
            .map((peopleOne) => {
              const parts = peopleOne.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_people),
      );

      if (missing_species.length === 0) {
        for (const peopleOne of specieDetails.people) {
          const parts = peopleOne.split('/');

          const peopleOneId = parts[parts.length - 2];

          const people_species = await this.people_speciesRepository.findBy({
            id_species: id,
            id_people: +peopleOneId,
          });

          if (!people_species) {
            const newPeople_Species = this.people_speciesRepository.create({
              id_species: id,
              id_people: +peopleOneId,
            });

            if (!newPeople_Species) {
              return new NotImplementedException(
                'People_Species create error',
              ).getResponse();
            }

            await this.people_speciesRepository.save(newPeople_Species);
          }
        }
      } else {
        for (const missing_specie of missing_species) {
          await this.people_speciesRepository.delete(missing_specie.id);
        }
      }
    }

    // films_species

    if (specieDetails.films.length !== 0) {
      const old_films_species = await this.films_speciesRepository.findBy({
        id_species: id,
      });

      const missing_species = old_films_species.filter(
        (item) =>
          !specieDetails.films
            .map((film) => {
              const parts = film.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_films),
      );

      if (missing_species.length === 0) {
        for (const film of specieDetails.films) {
          const parts = film.split('/');

          const filmId = parts[parts.length - 2];

          const films_species = await this.films_speciesRepository.findBy({
            id_species: id,
            id_films: +filmId,
          });

          if (!films_species) {
            const newFilms_Species = this.films_speciesRepository.create({
              id_species: id,
              id_films: +filmId,
            });

            if (!newFilms_Species) {
              return new NotImplementedException(
                'Films_Species create error',
              ).getResponse();
            }

            await this.films_speciesRepository.save(newFilms_Species);
          }
        }
      } else {
        for (const missing_specie of missing_species) {
          await this.films_speciesRepository.delete(missing_specie.id);
        }
      }
    }

    const updatedSpecie = await this.speciesRepository.update(
      { id },
      {
        name: specieDetails.name,
        classification: specieDetails.classification,
        designation: specieDetails.designation,
        average_height: specieDetails.average_height,
        skin_colors: specieDetails.skin_colors,
        hair_colors: specieDetails.hair_colors,
        eye_colors: specieDetails.eye_colors,
        average_lifespan: specieDetails.average_lifespan,
        language: specieDetails.language,
        created: specieDetails.created,
        edited: new Date().toISOString(),
        url: specieDetails.url,
      },
    );

    if (!updatedSpecie) {
      return new NotImplementedException('Specie update error').getResponse();
    }

    return '{"updated": "ok"}';
  }

  async deleteSpecie(id: number) {
    const deletedSpecie = await this.speciesRepository.delete(id);

    // planets_species

    const planets_species = await this.planets_speciesRepository.findOneBy({
      id_species: id,
    });

    if (planets_species) {
      await this.planets_speciesRepository.delete(planets_species.id);
    }

    // people_species

    const people_species = await this.people_speciesRepository.findBy({
      id_species: id,
    });

    if (people_species) {
      for (const people_specie of people_species) {
        await this.people_speciesRepository.delete(people_specie.id);
      }
    }

    // films_species

    const films_species = await this.films_speciesRepository.findBy({
      id_species: id,
    });

    if (films_species) {
      for (const films_specie of films_species) {
        await this.films_speciesRepository.delete(films_specie.id);
      }
    }

    if (!deletedSpecie) {
      return new NotImplementedException('Specie delete error').getResponse();
    }

    return `{"deleted": "ok"}`;
  }
}
