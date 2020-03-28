export class CountryInfo {
  constructor(
    public iso2: string,
    public iso3: string,
    public _id: number,
    public lat: number,
    public long: number,
    public flag: string,
  ) {}
}
