import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { speciesProps, starshipsProps, vehiclesProps } from '../utils/types';
import { People_SpeciesEntity } from '../typeorm/entities/People_Species';
import { Films_SpeciesEntity } from '../typeorm/entities/Films_Species';
import { SpeciesEntity } from '../typeorm/entities/Species';
import { Planets_SpeciesEntity } from '../typeorm/entities/Planets_Species';
import { StarshipsEntity } from '../typeorm/entities/Starships';
import { People_StarshipsEntity } from '../typeorm/entities/People_Starships';
import { Films_StarshipsEntity } from '../typeorm/entities/Films_Starships';
import { VehiclesEntity } from '../typeorm/entities/Vehicles';
import { People_VehiclesEntity } from '../typeorm/entities/People_Vehicles';
import { Films_VehiclesEntity } from '../typeorm/entities/Films_Vehicles';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehiclesEntity)
    private vehiclesRepository: Repository<VehiclesEntity>,
    @InjectRepository(People_VehiclesEntity)
    private people_vehiclesRepository: Repository<People_VehiclesEntity>,
    @InjectRepository(Films_VehiclesEntity)
    private films_vehiclesRepository: Repository<Films_VehiclesEntity>,
  ) {}

  async getAllVehicles(page: string) {
    const countVehicles = await this.vehiclesRepository.count();

    if (!countVehicles || countVehicles / 10 + 1 < +page) {
      return new NotFoundException('Vehicles not found').getResponse();
    }

    const nextPage =
      page === `${Math.round(countVehicles / 10)}`
        ? `https://swapi.dev/api/vehicles/?page=${+page + 1}`
        : null;
    const previousPage =
      page !== '1' ? `https://swapi.dev/api/vehicles/?page=${+page - 1}` : null;

    const allVehicles = [];

    for (let i = +page * 10 - 9; i <= +page * 10; i++) {
      if (i <= countVehicles) {
        allVehicles.push(await this.getVehicle(i));
      }
    }

    return {
      count: countVehicles,
      next: nextPage,
      previous: previousPage,
      results: allVehicles,
    };
  }

  async getVehicle(id: number) {
    const vehicle = await this.vehiclesRepository.findOneById(id);

    if (!vehicle) {
      return new NotFoundException('Vehicle not found').getResponse();
    }

    const people = await this.people_vehiclesRepository.findBy({
      id_vehicles: id,
    });

    const films = await this.films_vehiclesRepository.findBy({
      id_vehicles: id,
    });

    return {
      name: vehicle.name,
      model: vehicle.model,
      manufacturer: vehicle.manufacturer,
      cost_in_credits: vehicle.cost_in_credits,
      length: vehicle.length,
      max_atmosphering_speed: vehicle.max_atmosphering_speed,
      crew: vehicle.crew,
      passengers: vehicle.passengers,
      cargo_capacity: vehicle.cargo_capacity,
      consumables: vehicle.consumables,
      vehicle_class: vehicle.vehicle_class,
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
      created: vehicle.created,
      edited: vehicle.edited,
      url: vehicle.url,
    };
  }

  async createVehicle(vehicleDetails: vehiclesProps) {
    const newId = (await this.vehiclesRepository.count()) + 1;
    // people_vehicles

    if (vehicleDetails.pilots.length !== 0) {
      for (const peopleOne of vehicleDetails.pilots) {
        const parts = peopleOne.split('/');

        const peopleOneId = parts[parts.length - 2];
        const people_vehicles = await this.people_vehiclesRepository.findOneBy({
          id_people: +peopleOneId,
          id_vehicles: +newId,
        });

        if (!people_vehicles) {
          const newPeople_Vehicles = this.people_vehiclesRepository.create({
            id_people: +peopleOneId,
            id_vehicles: +newId,
          });

          if (!newPeople_Vehicles) {
            return new NotImplementedException(
              'People_Vehicles create error',
            ).getResponse();
          }

          await this.people_vehiclesRepository.save(newPeople_Vehicles);
        }
      }
    }

    // films_vehicles

    if (vehicleDetails.films.length !== 0) {
      for (const film of vehicleDetails.films) {
        const parts = film.split('/');

        const filmId = parts[parts.length - 2];
        const films_vehicles = await this.films_vehiclesRepository.findOneBy({
          id_vehicles: +newId,
          id_films: +filmId,
        });

        if (!films_vehicles) {
          const newFilms_Vehicles = this.films_vehiclesRepository.create({
            id_vehicles: +newId,
            id_films: +filmId,
          });

          if (!newFilms_Vehicles) {
            return new NotImplementedException(
              'Films_Vehicles create error',
            ).getResponse();
          }

          await this.films_vehiclesRepository.save(newFilms_Vehicles);
        }
      }
    }

    const newVehicle = this.vehiclesRepository.create({
      name: vehicleDetails.name,
      model: vehicleDetails.model,
      manufacturer: vehicleDetails.manufacturer,
      cost_in_credits: vehicleDetails.cost_in_credits,
      length: vehicleDetails.length,
      max_atmosphering_speed: vehicleDetails.max_atmosphering_speed,
      crew: vehicleDetails.crew,
      passengers: vehicleDetails.passengers,
      cargo_capacity: vehicleDetails.cargo_capacity,
      consumables: vehicleDetails.consumables,
      vehicle_class: vehicleDetails.vehicle_class,
      created: new Date().toISOString(),
      edited: new Date().toISOString(),
      url: vehicleDetails.url,
    });

    if (!newVehicle) {
      return new NotImplementedException('Vehicle create error').getResponse();
    }

    await this.vehiclesRepository.save(newVehicle);

    return `${newId}`;
  }

  async updateVehicle(id: number, vehicleDetails: vehiclesProps) {
    // people_vehicles

    if (vehicleDetails.pilots.length !== 0) {
      const old_people_vehicles = await this.people_vehiclesRepository.findBy({
        id_vehicles: id,
      });

      const missing_vehicles = old_people_vehicles.filter(
        (item) =>
          !vehicleDetails.pilots
            .map((peopleOne) => {
              const parts = peopleOne.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_people),
      );

      if (missing_vehicles.length === 0) {
        for (const peopleOne of vehicleDetails.pilots) {
          const parts = peopleOne.split('/');

          const peopleOneId = parts[parts.length - 2];

          const people_vehicles = await this.people_vehiclesRepository.findBy({
            id_vehicles: id,
            id_people: +peopleOneId,
          });

          if (!people_vehicles) {
            const newPeople_Vehicles = this.people_vehiclesRepository.create({
              id_vehicles: id,
              id_people: +peopleOneId,
            });

            if (!newPeople_Vehicles) {
              return new NotImplementedException(
                'People_Vehicles create error',
              ).getResponse();
            }

            await this.people_vehiclesRepository.save(newPeople_Vehicles);
          }
        }
      } else {
        for (const missing_vehicle of missing_vehicles) {
          await this.people_vehiclesRepository.delete(missing_vehicle.id);
        }
      }
    }

    // films_vehicles

    if (vehicleDetails.films.length !== 0) {
      const old_films_vehicles = await this.films_vehiclesRepository.findBy({
        id_vehicles: id,
      });

      const missing_vehicles = old_films_vehicles.filter(
        (item) =>
          !vehicleDetails.films
            .map((film) => {
              const parts = film.split('/');
              return +parts[parts.length - 2];
            })
            .includes(item.id_films),
      );

      if (missing_vehicles.length === 0) {
        for (const film of vehicleDetails.films) {
          const parts = film.split('/');

          const filmId = parts[parts.length - 2];

          const films_vehicles = await this.films_vehiclesRepository.findBy({
            id_vehicles: id,
            id_films: +filmId,
          });

          if (!films_vehicles) {
            const newFilms_Vehicles = this.films_vehiclesRepository.create({
              id_vehicles: id,
              id_films: +filmId,
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
        for (const missing_vehicle of missing_vehicles) {
          await this.films_vehiclesRepository.delete(missing_vehicle.id);
        }
      }
    }

    const updatedVehicle = await this.vehiclesRepository.update(
      { id },
      {
        name: vehicleDetails.name,
        model: vehicleDetails.model,
        manufacturer: vehicleDetails.manufacturer,
        cost_in_credits: vehicleDetails.cost_in_credits,
        length: vehicleDetails.length,
        max_atmosphering_speed: vehicleDetails.max_atmosphering_speed,
        crew: vehicleDetails.crew,
        passengers: vehicleDetails.passengers,
        cargo_capacity: vehicleDetails.cargo_capacity,
        consumables: vehicleDetails.consumables,
        vehicle_class: vehicleDetails.vehicle_class,
        created: vehicleDetails.created,
        edited: new Date().toISOString(),
        url: vehicleDetails.url,
      },
    );

    if (!updatedVehicle) {
      return new NotImplementedException('Vehicle update error').getResponse();
    }

    return { entity: 'vehicles', id: id };
  }

  async deleteVehicle(id: number) {
    const deletedVehicle = await this.vehiclesRepository.delete(id);

    // people_starships

    const people_vehicles = await this.people_vehiclesRepository.findBy({
      id_vehicles: id,
    });

    if (people_vehicles) {
      for (const people_vehicle of people_vehicles) {
        await this.people_vehiclesRepository.delete(people_vehicle.id);
      }
    }

    // films_starships

    const films_vehicles = await this.films_vehiclesRepository.findBy({
      id_vehicles: id,
    });

    if (films_vehicles) {
      for (const films_vehicle of films_vehicles) {
        await this.films_vehiclesRepository.delete(films_vehicle.id);
      }
    }

    if (!deletedVehicle) {
      return new NotImplementedException('Vehicle delete error').getResponse();
    }

    return { entity: 'vehicles', id: id };
  }
}
