import { AxiosInstance } from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import LeafletMap from '@/components/LeafletMap';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { Parameter, Screen } from '@/constants/constants';
import { ActionCreator } from '@/store/app/app';
import { getCountry, getParameter, getActiveScreen } from '@/store/app/selector';
import { Operation } from '@/store/data/data';
import { getCountriesData } from '@/store/data/selector';
import { CountryDataInterface, StateInterface } from '@/types/entities';
import { getScreenComponentClass } from '@/utils/common';

import styles from './Map.scss';

interface MapProps {
  fullScreen: Screen;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  changeCountry(country: string): void;
  changeActiveScreen(screen: Screen): void;
}

const Map: React.FC<MapProps> = (props: MapProps) => {
  const { fullScreen, parameter, countriesData } = props;
  const screenName = Screen.MAP;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const changeScreenView = () => {
    if (isFullScreen) {
      props.changeActiveScreen(Screen.ALL);
    } else {
      props.changeActiveScreen(screenName);
    }
    setIsFullScreen(prev => !prev);
  };
  const onCountryClick = (countryName: string) => props.changeCountry(countryName);

  return (
    <div className={getScreenComponentClass(screenName, isFullScreen, fullScreen, styles)}>
      <Resize isFullScreen={isFullScreen} onClick={changeScreenView} />
      <Title screen={Screen.MAP} />
      <LeafletMap
        screen={fullScreen}
        parameter={parameter}
        countriesData={countriesData}
        onCountryClick={onCountryClick}
      />
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  fullScreen: getActiveScreen(state),
  country: getCountry(state),
  parameter: getParameter(state),
  countriesData: getCountriesData(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<StateInterface, AxiosInstance, Action>) => ({
  changeCountry(country: string) {
    dispatch(Operation.loadCountryHistoricalData(country))
      .then(() => dispatch(ActionCreator.changeCountry(country)))
      .catch(error => {
        throw error;
      });
  },
  changeActiveScreen(screen: Screen) {
    dispatch(ActionCreator.changeActiveScreen(screen));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
