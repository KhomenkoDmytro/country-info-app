import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CountryInfoDto } from './dto/country-info.dto';


@Injectable()
export class CountriesService {
  constructor(
    private config: ConfigService,
    private http: HttpService,
  ) { }
  
  async getAvailableCountries() {
    const url = `${this.config.get('NAGER_API')}/AvailableCountries`;
    const res = await lastValueFrom(this.http.get(url));
    return res.data;
  }

  async getCountryInfo(code: string): Promise<CountryInfoDto> {
    const iso2 = code.toUpperCase();

    try {
      const [countryInfo, populationList, flagList] = await Promise.all([
        this.fetchCountryInfo(iso2),
        this.fetchPopulationList(),
        this.fetchFlagList(),
      ]);

      const officialName = countryInfo.officialName?.toLowerCase();
      const commonName = countryInfo.commonName?.toLowerCase();

      const population = populationList.find((item) => {
        const name = item.country.toLowerCase();
        return name === officialName || name === commonName;
      });

      const flag = flagList.find(
        (item) => item.iso2.toUpperCase() === iso2
      );

      return {
        borders: countryInfo.borders || [],
        population: population?.populationCounts || [],
        flag: flag?.flag || null,
      };
    } catch (error) {
      console.error(`[CountryService] getCountryInfo error:`, error?.message || error);
      throw new HttpException(
        'Failed to fetch country information',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async fetchCountryInfo(code: string): Promise<any> {
    const url = `${this.config.get('NAGER_API')}/CountryInfo/${code}`;
    try {
      const res = await lastValueFrom(this.http.get(url));
      if (!res.data) throw new Error('Empty country info');
      return res.data;
    } catch (err) {
      throw new HttpException(`Country not found for code ${code}`, HttpStatus.NOT_FOUND);
    }
  }

  private async fetchPopulationList(): Promise<any[]> {
    const url = `${this.config.get('COUNTRIESNOW_API')}/countries/population`;
    try {
      const res = await lastValueFrom(this.http.get(url));
      return res.data?.data || [];
    } catch (err) {
      throw new HttpException('Failed to fetch population data', HttpStatus.BAD_GATEWAY);
    }
  }

  private async fetchFlagList(): Promise<any[]> {
    const url = `${this.config.get('COUNTRIESNOW_API')}/countries/flag/images`;
    try {
      const res = await lastValueFrom(this.http.get(url));
      return res.data?.data || [];
    } catch (err) {
      throw new HttpException('Failed to fetch flag data', HttpStatus.BAD_GATEWAY);
    }
  }
  
}
