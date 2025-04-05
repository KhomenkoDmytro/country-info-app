import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) { }
  @Get()
  getAvailableCountries() {
    return this.countriesService.getAvailableCountries();
  }

  @Get(':countryCode')
  getCountryInfo(@Param('countryCode') code: string) {
    return this.countriesService.getCountryInfo(code);
  }
}
