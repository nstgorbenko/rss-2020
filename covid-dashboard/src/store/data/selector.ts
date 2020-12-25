import {
  CountryDataInterface,
  GlobalDataInterface,
  HistoricalDataInterface,
  StateInterface,
} from '@/types/entities';

export const getGlobalData = (state: StateInterface): GlobalDataInterface | Record<string, never> =>
  state['DATA'].globalData;
export const getCountriesData = (state: StateInterface): Array<CountryDataInterface> | [] =>
  state['DATA'].countriesData;
export const getGlobalHistoricalData = (
  state: StateInterface
): HistoricalDataInterface | Record<string, never> => state['DATA'].globalHistoricalData;
export const getCountryHistoricalData = (
  state: StateInterface
): HistoricalDataInterface | Record<string, never> => state['DATA'].countryHistoricalData;
