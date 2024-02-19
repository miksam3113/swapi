import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository, Timestamp } from 'typeorm';
import { PeopleEntity } from '../typeorm/entities/People';
import { filmsProps, peopleProps } from '../utils/types';
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

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmsEntity)
    private filmsRepository: Repository<FilmsEntity>,
    @InjectRepository(People_FilmsEntity)
    private people_filmsRepository: Repository<People_FilmsEntity>,
    @InjectRepository(Films_PlanetsEntity)
    private films_planetsRepository: Repository<Films_PlanetsEntity>,
    @InjectRepository(Films_SpeciesEntity)
    private films_speciesRepository: Repository<Films_SpeciesEntity>,
    @InjectRepository(Films_StarshipsEntity)
    private films_starshipsRepository: Repository<Films_StarshipsEntity>,
    @InjectRepository(Films_VehiclesEntity)
    private films_vehiclesRepository: Repository<Films_VehiclesEntity>,
  ) {}

  async getAllFilms(page: string) {
    const countFilms = await this.filmsRepository.count();

    if (!countFilms || countFilms / 10 + 1 < +page) {
      return new NotFoundException('Films not found').getResponse();
    }

    const nextPage =
      page === `${Math.round(countFilms / 10)}`
        ? `https://swapi.dev/api/films/?page=${+page + 1}`
        : null;
    const previousPage =
      page !== '1' ? `https://swapi.dev/api/films/?page=${+page - 1}` : null;

    const allFilms = [];

    for (let i = +page * 10 - 9; i <= +page * 10; i++) {
      if (i <= countFilms) {
        allFilms.push(await this.getFilm(i));
      }
    }

    return {
      count: countFilms,
      next: nextPage,
      previous: previousPage,
      results: allFilms,
    };
  }

  async getFilm(id: number) {
    const film = await this.filmsRepository.findOneById(id);

    if (!film) {
      return new NotFoundException('Film not found').getResponse();
    }

    const characters = await this.people_filmsRepository.findBy({
      id_films: id,
    });

    const planets = await this.films_planetsRepository.findBy({
      id_films: id,
    });

    const starships = await this.films_starshipsRepository.findBy({
      id_films: id,
    });

    const vehicles = await this.films_vehiclesRepository.findBy({
      id_films: id,
    });

    const species = await this.films_speciesRepository.findBy({
      id_films: id,
    });

    return {
      title: film.title,
      episode_id: film.episode_id,
      opening_crawl: film.opening_crawl,
      director: film.director,
      producer: film.producer,
      release_date: film.release_date,
      characters:
        characters.length !== 0
          ? characters.map((character) => {
              return `https://swapi.dev/api/people/${character.id_people}/`;
            })
          : [],
      planets:
        planets.length !== 0
          ? planets.map((planet) => {
              return `https://swapi.dev/api/planets/${planet.id_planets}/`;
            })
          : [],
      starships:
        starships.length !== 0
          ? starships.map((starship) => {
              return `https://swapi.dev/api/starships/${starship.id_starships}/`;
            })
          : [],
      vehicles:
        vehicles.length !== 0
          ? vehicles.map((vehicle) => {
              return `https://swapi.dev/api/vehicles/${vehicle.id_vehicles}/`;
            })
          : [],
      species:
        species.length !== 0
          ? species.map((specie) => {
              return `https://swapi.dev/api/species/${specie.id_species}/`;
            })
          : null,
      created: film.created,
      edited: film.edited,
      url: film.url,
    };
  }

  async createFilm(filmDetails: filmsProps) {
    const newId = (await this.filmsRepository.count()) + 1;

    const newFilm = this.filmsRepository.create({
      title: filmDetails.title,
      episode_id: filmDetails.episode_id,
      opening_crawl: filmDetails.opening_crawl,
      director: filmDetails.director,
      producer: filmDetails.producer,
      release_date: filmDetails.release_date,
      created: new Date().toISOString(),
      edited: new Date().toISOString(),
      url: filmDetails.url,
    });

    if (!newFilm) {
      return new NotImplementedException('Film create error').getResponse();
    }

    await this.filmsRepository.save(newFilm);

    // people_films

    if (filmDetails.characters.length !== 0) {
      for (const character of filmDetails.characters) {
        const parts = character.split('/');

        const peopleId = parts[parts.length - 2];
        const newPeople_Films = this.people_filmsRepository.create({
          id_people: +peopleId,
          id_films: +newId,
        });

        if (!newPeople_Films) {
          return new NotImplementedException(
            'People_Films create error',
          ).getResponse();
        }

        await this.people_filmsRepository.save(newPeople_Films);
      }
    }

    // films_planets

    if (filmDetails.planets.length !== 0) {
      for (const planet of filmDetails.planets) {
        const parts = planet.split('/');

        const planetId = parts[parts.length - 2];
        const newFilms_Planets = this.films_planetsRepository.create({
          id_films: +newId,
          id_planets: +planetId,
        });

        if (!newFilms_Planets) {
          return new NotImplementedException(
            'Films_Planets create error',
          ).getResponse();
        }

        await this.films_planetsRepository.save(newFilms_Planets);
      }
    }

    // films_starships

    if (filmDetails.starships.length !== 0) {
      for (const starship of filmDetails.starships) {
        const parts = starship.split('/');

        const starshipId = parts[parts.length - 2];
        const newFilms_Starships = this.films_starshipsRepository.create({
          id_films: newId,
          id_starships: +starshipId,
        });

        if (!newFilms_Starships) {
          return new NotImplementedException(
            'Films_Starships create error',
          ).getResponse();
        }

        await this.films_starshipsRepository.save(newFilms_Starships);
      }
    }

    // films_vehicles

    if (filmDetails.vehicles.length !== 0) {
      for (const vehicle of filmDetails.vehicles) {
        const parts = vehicle.split('/');

        const vehicleId = parts[parts.length - 2];
        const newFilms_Vehicles = this.films_vehiclesRepository.create({
          id_films: newId,
          id_vehicles: +vehicleId,
        });

        if (!newFilms_Vehicles) {
          return new NotImplementedException(
            'Films_Vehicles create error',
          ).getResponse();
        }

        await this.films_vehiclesRepository.save(newFilms_Vehicles);
      }
    }

    // films_species

    if (filmDetails.species.length !== 0) {
      for (const specie of filmDetails.species) {
        const parts = specie.split('/');

        const specieId = parts[parts.length - 2];
        const newFilms_Species = this.films_speciesRepository.create({
          id_films: newId,
          id_species: +specieId,
        });

        if (!newFilms_Species) {
          return new NotImplementedException(
            'Films_Species create error',
          ).getResponse();
        }

        await this.films_speciesRepository.save(newFilms_Species);
      }
    }

    return `{"created": "ok", "id": "${newId}"}`;
  }

  async updateFilm(id: number, filmDetails: filmsProps) {
    // films_characters

    if (filmDetails.characters.length !== 0) {
      const old_films_characters = await this.people_filmsRepository.findBy({
        id_films: id,
      });

      const missing_films = old_films_characters.filter(
        (item) =>
          !filmDetails.characters
            .map((character) => {
              const parts = character.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_people),
      );

      if (missing_films.length === 0) {
        for (const character of filmDetails.characters) {
          const parts = character.split('/');

          const characterId = parts[parts.length - 2];
          const films_characters = await this.people_filmsRepository.findOneBy({
            id_films: id,
            id_people: +characterId,
          });

          if (!films_characters) {
            const newPeople_Films = this.people_filmsRepository.create({
              id_films: id,
              id_people: +characterId,
            });

            if (!newPeople_Films) {
              return new NotImplementedException(
                'People_Films create error',
              ).getResponse();
            }

            await this.people_filmsRepository.save(newPeople_Films);
          }
        }
      } else {
        for (const missing_film of missing_films) {
          await this.people_filmsRepository.delete(missing_film.id);
        }
      }
    }

    // films_planets

    if (filmDetails.planets.length !== 0) {
      const old_films_planets = await this.films_planetsRepository.findBy({
        id_films: id,
      });

      const missing_films = old_films_planets.filter(
        (item) =>
          !filmDetails.planets
            .map((planet) => {
              const parts = planet.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_planets),
      );

      if (missing_films.length === 0) {
        for (const planet of filmDetails.planets) {
          const parts = planet.split('/');

          const planetId = parts[parts.length - 2];

          const films_planets = await this.films_planetsRepository.findBy({
            id_films: id,
            id_planets: +planetId,
          });

          if (!films_planets) {
            const newFilms_Planets = this.films_planetsRepository.create({
              id_films: id,
              id_planets: +planetId,
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
        for (const missing_film of missing_films) {
          await this.films_planetsRepository.delete(missing_film.id);
        }
      }
    }

    // films_starships

    if (filmDetails.starships.length !== 0) {
      const old_films_starships = await this.films_starshipsRepository.findBy({
        id_films: id,
      });

      const missing_films = old_films_starships.filter(
        (item) =>
          !filmDetails.starships
            .map((planet) => {
              const parts = planet.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_starships),
      );

      if (missing_films.length === 0) {
        for (const starship of filmDetails.starships) {
          const parts = starship.split('/');

          const starshipId = parts[parts.length - 2];

          const films_starships = await this.films_starshipsRepository.findBy({
            id_films: id,
            id_starships: +starshipId,
          });

          if (!films_starships) {
            const newFilms_Starships = this.films_starshipsRepository.create({
              id_films: id,
              id_starships: +starshipId,
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
        for (const missing_film of missing_films) {
          await this.films_starshipsRepository.delete(missing_film.id);
        }
      }
    }

    // films_vehicles

    if (filmDetails.vehicles.length !== 0) {
      const old_films_starships = await this.films_vehiclesRepository.findBy({
        id_films: id,
      });

      const missing_films = old_films_starships.filter(
        (item) =>
          !filmDetails.vehicles
            .map((vehicle) => {
              const parts = vehicle.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_vehicles),
      );

      if (missing_films.length === 0) {
        for (const vehicle of filmDetails.vehicles) {
          const parts = vehicle.split('/');

          const vehicleId = parts[parts.length - 2];

          const films_vehicles = await this.films_vehiclesRepository.findBy({
            id_films: id,
            id_vehicles: +vehicleId,
          });

          if (!films_vehicles) {
            const newFilms_Vehicles = this.films_vehiclesRepository.create({
              id_films: id,
              id_vehicles: +vehicleId,
            });

            if (!newFilms_Vehicles) {
              return new NotImplementedException(
                'Films_Vehicles create error',
              ).getResponse();
            }

            await this.films_vehiclesRepository.save(newFilms_Vehicles);
          }
        }
      } else {
        for (const missing_film of missing_films) {
          await this.films_vehiclesRepository.delete(missing_film.id);
        }
      }
    }

    // films_species

    if (filmDetails.species.length !== 0) {
      const old_films_species = await this.films_speciesRepository.findBy({
        id_films: id,
      });

      const missing_films = old_films_species.filter(
        (item) =>
          !filmDetails.species
            .map((specie) => {
              const parts = specie.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_species),
      );

      if (missing_films.length === 0) {
        for (const specie of filmDetails.species) {
          const parts = specie.split('/');

          const specieId = parts[parts.length - 2];

          const films_species = await this.films_speciesRepository.findBy({
            id_films: id,
            id_species: +specieId,
          });

          if (!films_species) {
            const newFilms_Species = this.films_speciesRepository.create({
              id_films: id,
              id_species: +specieId,
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
        for (const missing_film of missing_films) {
          await this.films_speciesRepository.delete(missing_film.id);
        }
      }
    }

    const updatedFilm = await this.filmsRepository.update(
      { id },
      {
        title: filmDetails.title,
        episode_id: filmDetails.episode_id,
        opening_crawl: filmDetails.opening_crawl,
        director: filmDetails.director,
        producer: filmDetails.producer,
        release_date: filmDetails.release_date,
        created: filmDetails.created,
        edited: new Date().toISOString(),
        url: filmDetails.url,
      },
    );

    if (!updatedFilm) {
      return new NotImplementedException('Film update error').getResponse();
    }

    return '{"updated": "ok"}';
  }

  async deleteFilm(id: number) {
    const deletedFilm = await this.filmsRepository.delete(id);

    // people_films

    const people_films = await this.people_filmsRepository.findBy({
      id_people: id,
    });

    if (people_films) {
      for (const people_film of people_films) {
        await this.people_filmsRepository.delete(people_film.id);
      }
    }

    // films_planets

    const films_planets = await this.films_planetsRepository.findBy({
      id_films: id,
    });

    if (films_planets) {
      for (const films_planet of films_planets) {
        await this.films_planetsRepository.delete(films_planet.id);
      }
    }

    // films_starships

    const films_starships = await this.films_starshipsRepository.findBy({
      id_films: id,
    });

    if (films_starships) {
      for (const films_starship of films_starships) {
        await this.films_starshipsRepository.delete(films_starship.id);
      }
    }

    // films_vehicles

    const films_vehicles = await this.films_vehiclesRepository.findBy({
      id_films: id,
    });

    if (films_vehicles) {
      for (const films_vehicle of films_vehicles) {
        await this.films_vehiclesRepository.delete(films_vehicle.id);
      }
    }

    // films_species

    const films_species = await this.films_speciesRepository.findBy({
      id_films: id,
    });

    if (films_species) {
      for (const films_specie of films_species) {
        await this.films_speciesRepository.delete(films_specie.id);
      }
    }

    if (!deletedFilm) {
      return new NotImplementedException('Film delete error').getResponse();
    }

    return `{"deleted": "ok"}`;
  }
}
