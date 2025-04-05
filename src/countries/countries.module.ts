import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
