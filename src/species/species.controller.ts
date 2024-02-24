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
import { SpeciesService } from './species.service';
import entities from '../config/entities';
import { speciesProps } from '../utils/types';
import {
  CreateInterceptor,
  DeleteInterceptor,
  GetInterceptor,
  UpdateInterceptor,
} from '../utils/data.interceptor';

@Controller(
  entities.find(
    (entity: { title: string; url: string }) => entity.title === 'species',
  ).title,
)
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Get('/')
  @UseInterceptors(GetInterceptor)
  getAllSpecies(@Query() params: any) {
    return this.speciesService.getAllSpecies(params.page ? params.page : '1');
  }

  @Get(':id')
  @UseInterceptors(GetInterceptor)
  getSpecie(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.getSpecie(id);
  }

  @Post()
  @UseInterceptors(CreateInterceptor)
  createSpecie(@Body() createSpecieDto: speciesProps) {
    return this.speciesService.createSpecie(createSpecieDto);
  }

  @Put(':id')
  @UseInterceptors(UpdateInterceptor)
  updateSpecie(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecieDto: speciesProps,
  ) {
    return this.speciesService.updateSpecie(id, updateSpecieDto);
  }

  @Delete(':id')
  @UseInterceptors(DeleteInterceptor)
  deleteSpecie(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.deleteSpecie(id);
  }
}
