import { DataCount, DataValue, Parameter } from '@/constants/constants';
import { CountryDataInterface, ShownCountryInterface } from '@/types/entities';

const getData = (
  countriesData: Array<CountryDataInterface>,
  value: DataValue,
  count: DataCount = DataCount.TOTAL
): Array<ShownCountryInterface> => {
  const getCount = (countryData: CountryDataInterface, option: DataValue) => {
    if (count === DataCount.PER_100) {
      return ((countryData[option] / countryData.population) * 100000).toFixed(2);
    }
    return countryData[option];
  };

  return [...countriesData]
    .map((countryData) => ({
      country: countryData.country,
      countryInfo: countryData.countryInfo,
      count: +getCount(countryData, value),
    }))
    .sort((a, b) => b.count - a.count);
};

const getShownCountriesData = (
  countriesData: Array<CountryDataInterface>,
  value: Parameter
): Array<ShownCountryInterface> => {
  switch (value) {
    case Parameter.CONFIRMED:
      return getData(countriesData, DataValue.CASES);
    case Parameter.DEATHS:
      return getData(countriesData, DataValue.DEATHS);
    case Parameter.RECOVERED:
      return getData(countriesData, DataValue.RECOVERED);
    case Parameter.DAY_CONFIRMED:
      return getData(countriesData, DataValue.TODAY_CASES);
    case Parameter.DAY_DEATHS:
      return getData(countriesData, DataValue.TODAY_DEATHS);
    case Parameter.DAY_RECOVERED:
      return getData(countriesData, DataValue.TODAY_RECOVERED);
    case Parameter.CONFIRMED_PER_100:
      return getData(countriesData, DataValue.CASES, DataCount.PER_100);
    case Parameter.DEATHS_PER_100:
      return getData(countriesData, DataValue.DEATHS, DataCount.PER_100);
    case Parameter.RECOVERED_PER_100:
      return getData(countriesData, DataValue.RECOVERED, DataCount.PER_100);
    case Parameter.DAY_CONFIRMED_PER_100:
      return getData(countriesData, DataValue.TODAY_CASES, DataCount.PER_100);
    case Parameter.DAY_DEATHS_PER_100:
      return getData(countriesData, DataValue.TODAY_DEATHS, DataCount.PER_100);
    case Parameter.DAY_RECOVERED_PER_100:
      return getData(countriesData, DataValue.TODAY_RECOVERED, DataCount.PER_100);
    default:
      throw new Error(`Unknown parameter: ${value as string}`);
  }
};

export default getShownCountriesData;
