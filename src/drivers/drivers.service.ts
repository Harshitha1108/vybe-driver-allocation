import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { NotFoundException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class DriversService {
  constructor(
  @InjectRepository(Driver)
  private readonly driverRepository: Repository<Driver>,
  private readonly redisService: RedisService,
) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = this.driverRepository.create(createDriverDto);
    return this.driverRepository.save(driver);
  }

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }


async updateLocation(dto: UpdateLocationDto) {
  const driver = await this.driverRepository.findOne({
    where: { id: dto.driverId },
  });

  if (!driver) {
    throw new NotFoundException('Driver not found');
  }

  const redis = this.redisService.getClient();

  await redis.geoadd(
    'drivers:locations',
    dto.longitude,
    dto.latitude,
    dto.driverId.toString(),
  );

  driver.available = true;
  await this.driverRepository.save(driver);

  return {
    message: 'Driver location updated successfully',
  };
}
async findNearbyDrivers(latitude: number, longitude: number) {
  const redis = this.redisService.getClient();

  const nearbyDrivers = await redis.geosearch(
    'drivers:locations',
    'FROMLONLAT',
    longitude,
    latitude,
    'BYRADIUS',
    3,
    'km',
    'WITHDIST',
  );

  const result: any[] = [];

  for (const item of nearbyDrivers as any[]) {
    const driverId = Number(item[0]);
    const distance = Number(item[1]);

    const driver = await this.driverRepository.findOne({
      where: {
        id: driverId,
        available: true,
      },
    });

    if (driver) {
        result.push({
            id: driver.id,
            name: driver.name,
            distance,
        });
}
  }

  return result;
}
}