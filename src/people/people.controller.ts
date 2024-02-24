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
import { PeopleService } from './people.service';
import entities from '../config/entities';
import { peopleProps } from '../utils/types';
import {
  CreateInterceptor,
  DeleteInterceptor,
  GetInterceptor,
  UpdateInterceptor,
} from '../utils/data.interceptor';

@Controller(
  entities.find(
    (entity: { title: string; url: string }) => entity.title === 'people',
  ).title,
)
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get('/')
  @UseInterceptors(GetInterceptor)
  getAllPeoples(@Query() params: any) {
    return this.peopleService.getAllPeoples(params.page ? params.page : '1');
  }

  @Get(':id')
  @UseInterceptors(GetInterceptor)
  getPeople(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.getPeople(id);
  }

  @Post('/')
  @UseInterceptors(CreateInterceptor)
  createPeople(@Body() createPeopleDto: peopleProps) {
    return this.peopleService.createPeople(createPeopleDto);
  }

  @Put(':id')
  @UseInterceptors(UpdateInterceptor)
  updatePeople(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePeopleDto: peopleProps,
  ) {
    return this.peopleService.updatePeople(id, updatePeopleDto);
  }

  @Delete(':id')
  @UseInterceptors(DeleteInterceptor)
  deletePeople(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.deletePeople(id);
  }
}
