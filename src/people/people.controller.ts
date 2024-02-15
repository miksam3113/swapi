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
import { PeopleService } from './people.service';
import entities from '../config/entities';
import { peopleProps } from '../utils/types';

@Controller(
  entities.find(
    (entity: { title: string; url: string }) => entity.title === 'people',
  ).title,
)
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get('/')
  getAllPeoples(@Query() params: any) {
    return this.peopleService.getAllPeoples(params.page ? params.page : '1');
  }

  @Get(':id')
  getPeople(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.getPeople(id);
  }

  @Post()
  createPeople(@Body() createPeopleDto: peopleProps) {
    return this.peopleService.createPeople(createPeopleDto);
  }

  @Put(':id')
  updatePeople(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePeopleDto: peopleProps,
  ) {
    return this.peopleService.updatePeople(id, updatePeopleDto);
  }

  @Delete(':id')
  deletePeople(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.deletePeople(id);
  }
}
