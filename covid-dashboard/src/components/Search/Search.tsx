import { AxiosInstance } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ActionCreator } from '@/store/app/app';
import { getCountry } from '@/store/app/selector';
import { Operation } from '@/store/data/data';
import { getCountriesData } from '@/store/data/selector';
import { CountryDataInterface, StateInterface } from '@/types/entities';

import styles from './Search.scss';

interface SearchProps {
  country: string;
  countriesData: Array<CountryDataInterface>;
  changeCountry(country: string): void;
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { country, countriesData } = props;
  const countries = countriesData.map((countryData) => countryData.country);

  const [currentCountry, setCurrentCountry] = useState('');
  const [isSelectVisible, setSelectVisibility] = useState(false);
  const inputElement = useRef(null);

  const onCountryChoice = (newCountry: string) => {
    ((inputElement.current as unknown) as HTMLInputElement).value = newCountry;
  };

  useEffect(() => {
    onCountryChoice(country);
  }, [country]);

  const searchClass = isSelectVisible ? styles['search__select'] : styles['search__select--hide'];

  return (
    <div className={styles['search']}>
      <div className={styles['search__input-container']}>
        <input
          ref={inputElement}
          className={styles['search__bar']}
          type="text"
          placeholder="Search"
          defaultValue={country}
          onChange={(e) => {
            setCurrentCountry(e.target.value);
          }}
          onFocus={() => setSelectVisibility(true)}
          onBlur={() => setSelectVisibility(false)}
        />
        <select size={3} className={searchClass}>
          {countries
            .filter(
              (countryName) =>
                countryName.toLowerCase().indexOf(currentCountry.toLowerCase()) !== -1
            )
            .map((countryName) => (
              <option
                key={countryName}
                className={styles['select__options']}
                onMouseDown={() => {
                  props.changeCountry(countryName);
                  onCountryChoice(countryName);
                }}
              >
                {countryName}
              </option>
            ))}
        </select>
      </div>
      <button
        type="button"
        aria-label="Reset country"
        className={styles['search__reset']}
        onClick={() => {
          props.changeCountry('');
          onCountryChoice('');
        }}
      >
        <svg className={styles['search__reset-icon']} width="36" height="36">
          <use xlinkHref="#icon-search-reset" />
        </svg>
      </button>
      <span className={styles['search__keyboard']}>
        <svg className={styles['search__keyboard-icon']}>
          <use xlinkHref="#icon-keyboard" />
        </svg>
      </span>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  country: getCountry(state),
  countriesData: getCountriesData(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<StateInterface, AxiosInstance, Action>) => ({
  changeCountry(country: string) {
    dispatch(Operation.loadCountryHistoricalData(country))
      .then(() => dispatch(ActionCreator.changeCountry(country)))
      .catch((error) => {
        throw error;
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
