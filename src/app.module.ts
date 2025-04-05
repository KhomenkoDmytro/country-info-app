import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CountriesModule } from './countries/countries.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, CountriesModule, UsersModule, ConfigModule.forRoot({ isGlobal: true }), CountriesModule, UsersModule],
})
export class AppModule { }
