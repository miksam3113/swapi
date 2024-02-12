import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FilmsDto } from './films.dto';
import { FilmsService } from './films.service';

@Controller('people')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  // @Get('/')
  // getAllPeoples(@Query() params: any) {
  //   return this.peopleService.getAllPeoples(params.page ? params.page : '1');
  // }
  //
  // @Get(':id')
  // getPeople(@Param('id', ParseIntPipe) id: number) {
  //   return this.peopleService.getPeople(id);
  // }
  //
  // @Post()
  // createPeople(@Body() createPeopleDto: FilmsDto) {
  //   return this.peopleService.createPeople(createPeopleDto);
  // }
  //
  // @Put(':id')
  // updatePeople(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updatePeopleDto: FilmsDto,
  // ) {
  //   return this.peopleService.updatePeople(id, updatePeopleDto);
  // }
}