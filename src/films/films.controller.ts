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
import { FilmsService } from './films.service';
import entities from '../config/entities';
import { filmsProps } from '../utils/types';
import {
  CreateInterceptor,
  DeleteInterceptor,
  GetInterceptor,
  UpdateInterceptor,
} from '../utils/data.interceptor';

@Controller(
  entities.find(
    (entity: { title: string; url: string }) => entity.title === 'films',
  ).title,
)
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get('/')
  @UseInterceptors(GetInterceptor)
  getAllFilms(@Query() params: any) {
    return this.filmsService.getAllFilms(params.page ? params.page : '1');
  }

  @Get(':id')
  @UseInterceptors(GetInterceptor)
  getFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.getFilm(id);
  }

  @Post()
  @UseInterceptors(CreateInterceptor)
  createFilm(@Body() createFilmDto: filmsProps) {
    return this.filmsService.createFilm(createFilmDto);
  }

  @Put(':id')
  @UseInterceptors(UpdateInterceptor)
  updateFilm(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFilmDto: filmsProps,
  ) {
    return this.filmsService.updateFilm(id, updateFilmDto);
  }

  @Delete(':id')
  @UseInterceptors(DeleteInterceptor)
  deleteFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.deleteFilm(id);
  }
}
