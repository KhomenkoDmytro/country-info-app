
export interface PopulationCount {
    year: number;
    value: number;
  }
export class CountryInfoDto {
    borders: string[];
    population: PopulationCount[];
    flag: string | null;
  }