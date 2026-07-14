import { IsNumber } from 'class-validator';

export class UpdateLocationDto {
  @IsNumber()
  driverId!: number;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}