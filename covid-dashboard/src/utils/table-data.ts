import { DataCount, DataValue, PARAMETERS_LIST, Parameter } from '@/constants/constants';
import { CountryDataInterface, GlobalDataInterface, ShownTableInterface } from '@/types/entities';

const TABLE_ROWS = ['Confirmed', 'Deaths', 'Recovered'];

const getData = (
  data: GlobalDataInterface | CountryDataInterface,
  parameter: DataValue,
  count: DataCount = DataCount.TOTAL
) => {
  if (count === DataCount.PER_100) {
    return ((data[parameter] / data.population) * 100000).toFixed(2);
  }
  return data[parameter];
};

const getTableCount = (data: GlobalDataInterface | CountryDataInterface, parameter: Parameter) => {
  switch (parameter) {
    case Parameter.CONFIRMED:
      return getData(data, DataValue.CASES);
    case Parameter.DEATHS:
      return getData(data, DataValue.DEATHS);
    case Parameter.RECOVERED:
      return getData(data, DataValue.RECOVERED);
    case Parameter.DAY_CONFIRMED:
      return getData(data, DataValue.TODAY_CASES);
    case Parameter.DAY_DEATHS:
      return getData(data, DataValue.TODAY_DEATHS);
    case Parameter.DAY_RECOVERED:
      return getData(data, DataValue.TODAY_RECOVERED);
    case Parameter.CONFIRMED_PER_100:
      return getData(data, DataValue.CASES, DataCount.PER_100);
    case Parameter.DEATHS_PER_100:
      return getData(data, DataValue.DEATHS, DataCount.PER_100);
    case Parameter.RECOVERED_PER_100:
      return getData(data, DataValue.RECOVERED, DataCount.PER_100);
    case Parameter.DAY_CONFIRMED_PER_100:
      return getData(data, DataValue.TODAY_CASES, DataCount.PER_100);
    case Parameter.DAY_DEATHS_PER_100:
      return getData(data, DataValue.TODAY_DEATHS, DataCount.PER_100);
    case Parameter.DAY_RECOVERED_PER_100:
      return getData(data, DataValue.TODAY_RECOVERED, DataCount.PER_100);
    default:
      throw new Error(`Unknown parameter: ${parameter as string}`);
  }
};

const getShownTableData = (
  globalData: GlobalDataInterface,
  countriesData: Array<CountryDataInterface>,
  country: string,
  parameter: Parameter
): Array<ShownTableInterface> => {
  const rawData = !country
    ? globalData
    : (countriesData.find(
        (countryData) => countryData.country === country
      ) as CountryDataInterface);
  const currentParameterIndex = PARAMETERS_LIST.indexOf(parameter);
  const tableDataStartIndex = Math.trunc(currentParameterIndex / 3) * 3;

  return TABLE_ROWS.map((row, index) => ({
    name: row,
    count: +getTableCount(rawData, PARAMETERS_LIST[tableDataStartIndex + index] as Parameter),
    isActive: parameter === PARAMETERS_LIST[tableDataStartIndex + index],
  }));
};

export default getShownTableData;
