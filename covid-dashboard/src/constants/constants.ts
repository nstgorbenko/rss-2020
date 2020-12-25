export enum DataCount {
  TOTAL = 'total',
  PER_100 = 'per-100',
}

export enum Parameter {
  CONFIRMED = 'confirmed',
  DEATHS = 'deaths',
  RECOVERED = 'recovered',
  CONFIRMED_PER_100 = 'confirmed-per-100',
  DEATHS_PER_100 = 'deaths-per-100',
  RECOVERED_PER_100 = 'recovered-per-100',
  DAY_CONFIRMED = 'day-confirmed',
  DAY_DEATHS = 'day-deaths',
  DAY_RECOVERED = 'day-recovered',
  DAY_CONFIRMED_PER_100 = 'day-confirmed-per-100',
  DAY_DEATHS_PER_100 = 'day-deaths-per-100',
  DAY_RECOVERED_PER_100 = 'day-recovered-per-100',
}

export enum DataValue {
  CASES = 'cases',
  DEATHS = 'deaths',
  RECOVERED = 'recovered',
  TODAY_CASES = 'todayCases',
  TODAY_DEATHS = 'todayDeaths',
  TODAY_RECOVERED = 'todayRecovered',
}

export enum Screen {
  ALL = 'all',
  CHART = 'chart',
  LIST = 'list',
  MAP = 'map',
  TABLE = 'table',
}

export enum Cases {
  NEW = 'new',
  CUMULATIVE = 'cumulative',
}

export enum MapColor {
  DARKEST = '#1b421f',
  MUCH_DARKER = '#1f5827',
  DARKER = '#226f2e',
  DARK = '#238636',
  MAIN = '#509a56',
  LIGHT = '#75ae76',
  LIGHTER = '#97c297',
  MUCH_LIGHTER = '#bad6b9',
  LIGHTEST = '#dcebdb',
}

export const parameterToTitle = {
  confirmed: 'Total confirmed',
  deaths: 'Total deaths',
  recovered: 'Total recovered',
  'confirmed-per-100': 'Confirmed per 100,000 population',
  'deaths-per-100': 'Deaths per 100,000 population',
  'recovered-per-100': 'Recovered per 100,000 population',
  'day-confirmed': 'Last day confirmed',
  'day-deaths': 'Last day deaths',
  'day-recovered': 'Last day recovered',
  'day-confirmed-per-100': 'Last day confirmed per 100,000 population',
  'day-deaths-per-100': 'Last day deaths per 100,000 population',
  'day-recovered-per-100': 'Last day recovered per 100,000 population',
};

export const parameterToTableTitle = {
  confirmed: 'Total cases',
  deaths: 'Total cases',
  recovered: 'Total cases',
  'confirmed-per-100': 'Total cases per 100,000 population',
  'deaths-per-100': 'Total cases per 100,000 population',
  'recovered-per-100': 'Total cases per 100,000 population',
  'day-confirmed': 'Last day cases',
  'day-deaths': 'Last day cases',
  'day-recovered': 'Last day cases',
  'day-confirmed-per-100': 'Last day cases per 100,000 population',
  'day-deaths-per-100': 'Last day cases per 100,000 population',
  'day-recovered-per-100': 'Last day cases per 100,000 population',
};

export const PARAMETERS_LIST = [
  'confirmed',
  'deaths',
  'recovered',
  'confirmed-per-100',
  'deaths-per-100',
  'recovered-per-100',
  'day-confirmed',
  'day-deaths',
  'day-recovered',
  'day-confirmed-per-100',
  'day-deaths-per-100',
  'day-recovered-per-100',
];
