import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DriversModule } from './drivers/drivers.module';
import { RedisModule } from './redis/redis.module';
import { RidesModule } from './rides/rides.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',

      host: 'localhost',

      port: 5433,

      username: 'postgres',

      password: 'postgres',

      database: 'vybe',

      autoLoadEntities: true,

      synchronize: true,
    }),

    DriversModule,
    RidesModule,
    RedisModule,
  ],
})
export class AppModule {}