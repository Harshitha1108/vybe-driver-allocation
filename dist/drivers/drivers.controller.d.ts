import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class DriversController {
    private readonly driversService;
    constructor(driversService: DriversService);
    create(createDriverDto: CreateDriverDto): Promise<import("./entities/driver.entity").Driver>;
    findAll(): Promise<import("./entities/driver.entity").Driver[]>;
    updateLocation(dto: UpdateLocationDto): Promise<{
        message: string;
    }>;
    findNearbyDrivers(latitude: number, longitude: number): Promise<any[]>;
}
