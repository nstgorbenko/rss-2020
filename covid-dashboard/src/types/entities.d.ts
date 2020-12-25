import { Parameter, Screen } from '@/constants/constants';

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
    flag: string;
    iso3: string;
  };
}

interface ServerCountryData {
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
}

interface ServerGlobalExtraData {
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
}

export interface HistoricalDataInterface {
  cases: {
    [key: string]: number;
  };
  deaths: {
    [key: string]: number;
  };
  recovered: {
    [key: string]: number;
  };
}

export interface GlobalDataInterface {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  population: number;
}

export interface CountryDataInterface extends GlobalDataInterface, CountryData {}

export interface ServerGlobalInterface extends GlobalDataInterface, ServerGlobalExtraData {}

export interface ServerCountryInterface extends ServerGlobalInterface, ServerCountryData {}

export interface AppStateInterface {
  country: string;
  parameter: Parameter;
  activeScreen: Screen;
}

export interface DataStateInterface {
  globalData: GlobalDataInterface | Record<string, never>;
  countriesData: Array<CountryDataInterface> | [];
  globalHistoricalData: HistoricalDataInterface | Record<string, never>;
  countryHistoricalData: HistoricalDataInterface | Record<string, never>;
}

export interface StateInterface {
  APP: AppStateInterface;
  DATA: DataStateInterface;
}

export interface ShownCountryInterface extends CountryData {
  count: number;
}

export interface ShownTableInterface {
  name: string;
  count: number;
  isActive: boolean;
}

export interface ServerCountryHistoricalInterface {
  country: string;
  province: Array<string>;
  timeline: HistoricalDataInterface;
}

export interface ChartData {
  dates: Array<string>;
  counts: Array<number>;
}
