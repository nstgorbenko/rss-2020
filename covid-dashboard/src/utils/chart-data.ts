import { DataCount, DataValue, Parameter, Cases } from '@/constants/constants';
import { HistoricalDataInterface, ChartData } from '@/types/entities';

const getIncrementData = (data: Array<number>) =>
  data.map((item, index, array) => item - (array[index - 1] || 0));

const getCounts = (casesData: Array<number>, population: number, count: DataCount) => {
  if (count === DataCount.PER_100) {
    return casesData.map((data) => +((data / population) * 100000).toFixed(2));
  }
  return casesData;
};

const getData = (
  data: HistoricalDataInterface,
  population: number,
  parameter: DataValue,
  cases: Cases = Cases.CUMULATIVE,
  count: DataCount = DataCount.TOTAL
) => {
  const casesData: Array<number> =
    cases === Cases.CUMULATIVE
      ? Object.values(data[parameter])
      : getIncrementData(Object.values(data[parameter]));

  return {
    dates: Object.keys(data[parameter]),
    counts: getCounts(casesData, population, count),
  };
};

const getShownChartData = (
  data: HistoricalDataInterface,
  population: number,
  parameter: Parameter
): ChartData => {
  switch (parameter) {
    case Parameter.CONFIRMED:
      return getData(data, population, DataValue.CASES);
    case Parameter.DEATHS:
      return getData(data, population, DataValue.DEATHS);
    case Parameter.RECOVERED:
      return getData(data, population, DataValue.RECOVERED);
    case Parameter.DAY_CONFIRMED:
      return getData(data, population, DataValue.CASES, Cases.NEW);
    case Parameter.DAY_DEATHS:
      return getData(data, population, DataValue.DEATHS, Cases.NEW);
    case Parameter.DAY_RECOVERED:
      return getData(data, population, DataValue.RECOVERED, Cases.NEW);
    case Parameter.CONFIRMED_PER_100:
      return getData(data, population, DataValue.CASES, Cases.CUMULATIVE, DataCount.PER_100);
    case Parameter.DEATHS_PER_100:
      return getData(data, population, DataValue.DEATHS, Cases.CUMULATIVE, DataCount.PER_100);
    case Parameter.RECOVERED_PER_100:
      return getData(data, population, DataValue.RECOVERED, Cases.CUMULATIVE, DataCount.PER_100);
    case Parameter.DAY_CONFIRMED_PER_100:
      return getData(data, population, DataValue.CASES, Cases.NEW, DataCount.PER_100);
    case Parameter.DAY_DEATHS_PER_100:
      return getData(data, population, DataValue.DEATHS, Cases.NEW, DataCount.PER_100);
    case Parameter.DAY_RECOVERED_PER_100:
      return getData(data, population, DataValue.RECOVERED, Cases.NEW, DataCount.PER_100);
    default:
      throw new Error(`Unknown parameter: ${parameter as string}`);
  }
};

export default getShownChartData;
