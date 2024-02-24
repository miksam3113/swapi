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
import { VehiclesService } from './vehicles.service';
import entities from '../config/entities';
import { vehiclesProps } from '../utils/types';
import {
  CreateInterceptor,
  DeleteInterceptor,
  GetInterceptor,
  UpdateInterceptor,
} from '../utils/data.interceptor';

@Controller(
  entities.find(
    (entity: { title: string; url: string }) => entity.title === 'vehicles',
  ).title,
)
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get('/')
  @UseInterceptors(GetInterceptor)
  getAllVehicles(@Query() params: any) {
    return this.vehiclesService.getAllVehicles(params.page ? params.page : '1');
  }

  @Get(':id')
  @UseInterceptors(GetInterceptor)
  getVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.getVehicle(id);
  }

  @Post()
  @UseInterceptors(CreateInterceptor)
  createVehicle(@Body() createVehicleDto: vehiclesProps) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Put(':id')
  @UseInterceptors(UpdateInterceptor)
  updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: vehiclesProps,
  ) {
    return this.vehiclesService.updateVehicle(id, updateVehicleDto);
  }

  @Delete(':id')
  @UseInterceptors(DeleteInterceptor)
  deleteVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.deleteVehicle(id);
  }
}
