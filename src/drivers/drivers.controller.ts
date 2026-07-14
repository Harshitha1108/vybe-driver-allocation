import { Body, Controller, Get, Post ,Query} from '@nestjs/common';

import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Post('location')
updateLocation(@Body() dto: UpdateLocationDto) {
  return this.driversService.updateLocation(dto);
}
  @Get('nearby')
findNearbyDrivers(
  @Query('latitude') latitude: number,
  @Query('longitude') longitude: number,
) {
  return this.driversService.findNearbyDrivers(
    Number(latitude),
    Number(longitude),
  );
}
}