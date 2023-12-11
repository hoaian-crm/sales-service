import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesModule } from './module/sales/sales.module';
import { StatisticModule } from './module/statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: +process.env.PG_PORT,
      autoLoadEntities: true,
      logging: process.env.NODE_ENV === 'development',
    }),
    SalesModule,
    StatisticModule,
  ],
})
export class AppModule {}
