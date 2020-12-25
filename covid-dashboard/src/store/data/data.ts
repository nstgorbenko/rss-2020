import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';

import {
  GlobalDataInterface,
  HistoricalDataInterface,
  CountryDataInterface,
  DataStateInterface,
  StateInterface,
} from '@/types/entities';
import { adaptGlobalData, adaptCountriesData, adaptCountryHistoricalData } from '@/utils/adapter';

interface ActionInterface {
  type: string;
  payload:
    | GlobalDataInterface
    | Array<CountryDataInterface>
    | HistoricalDataInterface
    | Record<string, never>;
}

const initialState: DataStateInterface = {
  globalData: {},
  countriesData: [],
  globalHistoricalData: {},
  countryHistoricalData: {},
};

const ActionType = {
  LOAD_GLOBAL_DATA: 'LOAD_GLOBAL_DATA',
  LOAD_COUNTRIES_DATA: 'LOAD_COUNTRIES_DATA',
  LOAD_GLOBAL_HISTORICAL_DATA: 'LOAD_GLOBAL_HISTORICAL_DATA',
  LOAD_COUNTRY_HISTORICAL_DATA: 'LOAD_COUNTRY_HISTORICAL_DATA',
};

const ActionCreator = {
  loadGlobalData: (globalData: GlobalDataInterface): ActionInterface => ({
    type: ActionType.LOAD_GLOBAL_DATA,
    payload: globalData,
  }),
  loadCountriesData: (countriesData: Array<CountryDataInterface>): ActionInterface => ({
    type: ActionType.LOAD_COUNTRIES_DATA,
    payload: countriesData,
  }),
  loadGlobalHistoricalData: (globalHistoricalData: HistoricalDataInterface): ActionInterface => ({
    type: ActionType.LOAD_GLOBAL_HISTORICAL_DATA,
    payload: globalHistoricalData,
  }),
  loadCountryHistoricalData: (
    countryHistoricalData: HistoricalDataInterface | Record<string, never>
  ): ActionInterface => ({
    type: ActionType.LOAD_COUNTRY_HISTORICAL_DATA,
    payload: countryHistoricalData,
  }),
};

const Operation = {
  loadGlobalData: (): ThunkAction<
    Promise<void>,
    StateInterface,
    AxiosInstance,
    ActionInterface
  > => (dispatch, getState, api) =>
    api.get('/all').then(({ data }) => {
      const adaptedGlobalData = adaptGlobalData(data);
      dispatch(ActionCreator.loadGlobalData(adaptedGlobalData));
    }),
  loadCountriesData: (): ThunkAction<
    Promise<void>,
    StateInterface,
    AxiosInstance,
    ActionInterface
  > => (dispatch, getState, api) =>
    api.get('/countries').then(({ data }) => {
      const adaptedCountriesData = adaptCountriesData(data);
      dispatch(ActionCreator.loadCountriesData(adaptedCountriesData));
    }),
  loadGlobalHistoricalData: (): ThunkAction<
    Promise<void>,
    StateInterface,
    AxiosInstance,
    ActionInterface
  > => (dispatch, getState, api) =>
    api.get('/historical/all?lastdays=all').then(({ data }) => {
      dispatch(ActionCreator.loadGlobalHistoricalData(data));
    }),
  loadCountryHistoricalData: (
    country: string
  ): ThunkAction<
    Promise<void | (() => ActionInterface)>,
    StateInterface,
    AxiosInstance,
    ActionInterface
  > => (dispatch, getState, api) => {
    if (country) {
      return api.get(`/historical/${country}?lastdays=all`).then(({ data }) => {
        const adaptedCountryHistoricalData = adaptCountryHistoricalData(data);
        dispatch(ActionCreator.loadCountryHistoricalData(adaptedCountryHistoricalData));
      });
    }
    return Promise.resolve(() => dispatch(ActionCreator.loadCountryHistoricalData({})));
  },
};

const reducer = (state = initialState, action: ActionInterface): DataStateInterface => {
  switch (action.type) {
    case ActionType.LOAD_GLOBAL_DATA:
      return { ...state, globalData: action.payload as GlobalDataInterface };
    case ActionType.LOAD_COUNTRIES_DATA:
      return { ...state, countriesData: action.payload as Array<CountryDataInterface> };
    case ActionType.LOAD_GLOBAL_HISTORICAL_DATA:
      return { ...state, globalHistoricalData: action.payload as HistoricalDataInterface };
    case ActionType.LOAD_COUNTRY_HISTORICAL_DATA:
      return { ...state, countryHistoricalData: action.payload as HistoricalDataInterface };
    default:
      return state;
  }
};

export { ActionCreator, ActionType, Operation, reducer };
