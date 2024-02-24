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
import { StarshipsService } from './starships.service';
import entities from '../config/entities';
import { starshipsProps } from '../utils/types';
import {
  CreateInterceptor,
  DeleteInterceptor,
  GetInterceptor,
  UpdateInterceptor,
} from '../utils/data.interceptor';

@Controller(
  entities.find(
    (entity: { title: string; url: string }) => entity.title === 'starships',
  ).title,
)
export class StarshipsController {
  constructor(private starshipsService: StarshipsService) {}

  @Get('/')
  @UseInterceptors(GetInterceptor)
  getAllStarships(@Query() params: any) {
    return this.starshipsService.getAllStarships(
      params.page ? params.page : '1',
    );
  }

  @Get(':id')
  @UseInterceptors(GetInterceptor)
  getStarship(@Param('id', ParseIntPipe) id: number) {
    return this.starshipsService.getStarship(id);
  }

  @Post()
  @UseInterceptors(CreateInterceptor)
  createStarship(@Body() createStarshipDto: starshipsProps) {
    return this.starshipsService.createStarship(createStarshipDto);
  }

  @Put(':id')
  @UseInterceptors(UpdateInterceptor)
  updateStarship(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStarshipDto: starshipsProps,
  ) {
    return this.starshipsService.updateStarship(id, updateStarshipDto);
  }

  @Delete(':id')
  @UseInterceptors(DeleteInterceptor)
  deleteStarship(@Param('id', ParseIntPipe) id: number) {
    return this.starshipsService.deleteStarship(id);
  }
}
