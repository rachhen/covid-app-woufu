import {CountryInfo} from './country-info.model';

export class CountryCovid {
  constructor(
    public country: string,
    public countryInfo: CountryInfo,
    public cases: number,
    public todayCases: number,
    public deaths: number,
    public todayDeaths: number,
    public recovered: number,
    public active: number,
    public critical: number,
    public casesPerOneMillion: number,
    public deathsPerOneMillion: number,
  ) {}
}
