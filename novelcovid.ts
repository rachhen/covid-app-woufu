import {CountryCovid} from 'models/country-covid.model';
import {TotalCovid} from 'models/total-covid.model';

export interface ICountryParam {
  [key: string]: string;
}

declare module 'novelcovid' {
  export const getAll: () => TotalCovid;
  export const getCountry: () => CountryCovid[];
  export const getState: () => void;
}
