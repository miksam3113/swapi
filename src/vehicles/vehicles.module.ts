import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesEntity } from '../typeorm/entities/Vehicles';
import { People_VehiclesEntity } from '../typeorm/entities/People_Vehicles';
import { Films_VehiclesEntity } from '../typeorm/entities/Films_Vehicles';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehiclesEntity,
      People_VehiclesEntity,
      Films_VehiclesEntity,
    ]),
  ],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
