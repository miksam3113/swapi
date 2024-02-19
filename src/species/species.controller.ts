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
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import entities from '../config/entities';
import { speciesProps } from '../utils/types';

@Controller(
  entities.find(
    (entity: { title: string; url: string }) => entity.title === 'species',
  ).title,
)
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Get('/')
  getAllSpecies(@Query() params: any) {
    return this.speciesService.getAllSpecies(params.page ? params.page : '1');
  }

  @Get(':id')
  getSpecie(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.getSpecie(id);
  }

  @Post()
  createSpecie(@Body() createSpecieDto: speciesProps) {
    return this.speciesService.createSpecie(createSpecieDto);
  }

  @Put(':id')
  updateSpecie(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecieDto: speciesProps,
  ) {
    return this.speciesService.updateSpecie(id, updateSpecieDto);
  }

  @Delete(':id')
  deleteSpecie(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.deleteSpecie(id);
  }
}
