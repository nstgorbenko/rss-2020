import classNames from 'classnames';
import React from 'react';

import { ShownCountryInterface } from '@/types/entities';

import styles from './ListItem.scss';

interface ListItemProps {
  countryData: ShownCountryInterface;
  activeCountry: string;
  onCountryClick(country: string): void;
}

const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const {
    countryData: { country, countryInfo, count },
    activeCountry,
  } = props;
  const { flag } = countryInfo;

  const isActiveCountry = country === activeCountry;

  return (
    <li
      className={
        isActiveCountry
          ? classNames(styles['list__item'], styles['list__item--active'])
          : styles['list__item']
      }
    >
      <button
        className={styles['list__item-info']}
        type="button"
        aria-label="Resize screen"
        onClick={() => props.onCountryClick(country)}
      >
        <span className={styles['list__item-count']}>{count.toLocaleString()}</span>
        <span className={styles['list__item-country']}>
          <img className={styles['list__item-flag']} src={flag} alt={`${country} flag`} />
          <span className="list__item-name">{country}</span>
        </span>
      </button>
    </li>
  );
};

export default ListItem;
