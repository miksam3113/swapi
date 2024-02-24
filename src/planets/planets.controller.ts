import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import entities from '../config/entities';
import { planetsProps } from '../utils/types';
import {
  CreateInterceptor,
  DeleteInterceptor,
  GetInterceptor,
  UpdateInterceptor,
} from '../utils/data.interceptor';

@Controller(
  entities.find(
    (entity: { title: string; url: string }) => entity.title === 'planets',
  ).title,
)
export class PlanetsController {
  constructor(private planetsService: PlanetsService) {}

  @Get('/')
  @UseInterceptors(GetInterceptor)
  getAllPlanets(@Query() params: any) {
    return this.planetsService.getAllPlanets(params.page ? params.page : '1');
  }

  @Get(':id')
  @UseInterceptors(GetInterceptor)
  getPlanet(@Param('id', ParseIntPipe) id: number) {
    return this.planetsService.getPlanet(id);
  }

  @Post()
  @UseInterceptors(CreateInterceptor)
  createPlanet(@Body() createPlanetDto: planetsProps) {
    return this.planetsService.createPlanet(createPlanetDto);
  }

  @Put(':id')
  @UseInterceptors(UpdateInterceptor)
  updatePlanet(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlanetDto: planetsProps,
  ) {
    return this.planetsService.updatePlanet(id, updatePlanetDto);
  }

  @Delete(':id')
  @UseInterceptors(DeleteInterceptor)
  deletePlanet(@Param('id', ParseIntPipe) id: number) {
    return this.planetsService.deletePlanet(id);
  }
}
