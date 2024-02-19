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
import { FilmsService } from './films.service';
import entities from '../config/entities';
import { filmsProps } from '../utils/types';

@Controller(
  entities.find(
    (entity: { title: string; url: string }) => entity.title === 'films',
  ).title,
)
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get('/')
  getAllFilms(@Query() params: any) {
    return this.filmsService.getAllFilms(params.page ? params.page : '1');
  }

  @Get(':id')
  getFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.getFilm(id);
  }

  @Post()
  createFilm(@Body() createFilmDto: filmsProps) {
    return this.filmsService.createFilm(createFilmDto);
  }

  @Put(':id')
  updateFilm(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFilmDto: filmsProps,
  ) {
    return this.filmsService.updateFilm(id, updateFilmDto);
  }

  @Delete(':id')
  deleteFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.deleteFilm(id);
  }
}
