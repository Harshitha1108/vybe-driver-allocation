"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const driver_entity_1 = require("./entities/driver.entity");
const common_2 = require("@nestjs/common");
const redis_service_1 = require("../redis/redis.service");
let DriversService = class DriversService {
    driverRepository;
    redisService;
    constructor(driverRepository, redisService) {
        this.driverRepository = driverRepository;
        this.redisService = redisService;
    }
    async create(createDriverDto) {
        const driver = this.driverRepository.create(createDriverDto);
        return this.driverRepository.save(driver);
    }
    async findAll() {
        return this.driverRepository.find();
    }
    async updateLocation(dto) {
        const driver = await this.driverRepository.findOne({
            where: { id: dto.driverId },
        });
        if (!driver) {
            throw new common_2.NotFoundException('Driver not found');
        }
        const redis = this.redisService.getClient();
        await redis.geoadd('drivers:locations', dto.longitude, dto.latitude, dto.driverId.toString());
        driver.available = true;
        await this.driverRepository.save(driver);
        return {
            message: 'Driver location updated successfully',
        };
    }
    async findNearbyDrivers(latitude, longitude) {
        const redis = this.redisService.getClient();
        const nearbyDrivers = await redis.geosearch('drivers:locations', 'FROMLONLAT', longitude, latitude, 'BYRADIUS', 3, 'km', 'WITHDIST');
        const result = [];
        for (const item of nearbyDrivers) {
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
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(driver_entity_1.Driver)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        redis_service_1.RedisService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map