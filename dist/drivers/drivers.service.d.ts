import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { RedisService } from '../redis/redis.service';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class DriversService {
    private readonly driverRepository;
    private readonly redisService;
    constructor(driverRepository: Repository<Driver>, redisService: RedisService);
    create(createDriverDto: CreateDriverDto): Promise<Driver>;
    findAll(): Promise<Driver[]>;
    updateLocation(dto: UpdateLocationDto): Promise<{
        message: string;
    }>;
    findNearbyDrivers(latitude: number, longitude: number): Promise<any[]>;
}
