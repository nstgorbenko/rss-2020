import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { Parameter, Screen } from '@/constants/constants';
import { ActionCreator } from '@/store/app/app';
import { getActiveScreen, getCountry, getParameter } from '@/store/app/selector';
import {
  getGlobalHistoricalData,
  getCountryHistoricalData,
  getCountriesData,
  getGlobalData,
} from '@/store/data/selector';
import {
  StateInterface,
  HistoricalDataInterface,
  CountryDataInterface,
  GlobalDataInterface,
} from '@/types/entities';
import getShownChartData from '@/utils/chart-data';
import { getScreenComponentClass } from '@/utils/common';

import ChartLine from '../ChartLine';

import styles from './Chart.scss';

interface ChartProps {
  fullScreen: Screen;
  country: string;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  globalData: GlobalDataInterface;
  globalHistoricalData: HistoricalDataInterface;
  countryHistoricalData: HistoricalDataInterface;
  changeActiveScreen(screen: Screen): void;
}

const Chart: React.FC<ChartProps> = (props: ChartProps) => {
  const {
    fullScreen,
    country,
    parameter,
    countriesData,
    globalData,
    globalHistoricalData,
    countryHistoricalData,
  } = props;

  const { population } = !country
    ? globalData
    : (countriesData.find(
        (countryData) => countryData.country === country
      ) as CountryDataInterface);
  const historicalData = !country ? globalHistoricalData : countryHistoricalData;
  const shownData = getShownChartData(historicalData, population, parameter);

  const screenName = Screen.CHART;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const changeScreenView = () => {
    if (isFullScreen) {
      props.changeActiveScreen(Screen.ALL);
    } else {
      props.changeActiveScreen(screenName);
    }
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div className={getScreenComponentClass(screenName, isFullScreen, fullScreen, styles)}>
      <Resize isFullScreen={isFullScreen} onClick={changeScreenView} />
      <Title screen={screenName} />
      <ChartLine values={shownData} />
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  fullScreen: getActiveScreen(state),
  country: getCountry(state),
  parameter: getParameter(state),
  countriesData: getCountriesData(state),
  globalData: getGlobalData(state),
  globalHistoricalData: getGlobalHistoricalData(state),
  countryHistoricalData: getCountryHistoricalData(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeActiveScreen(screen: Screen) {
    dispatch(ActionCreator.changeActiveScreen(screen));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
