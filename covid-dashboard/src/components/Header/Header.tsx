import React from 'react';

import Search from '@/components/Search';

import styles from './Header.scss';

const Header: React.FC = () => (
  <header className={styles['header']}>
    <div className={styles['header__wrapper']}>
      <div className={styles['header__title']}>
        COVID-19
        <span className={styles['header__title--more']}> Dashboard</span>
      </div>
      <Search />
    </div>
  </header>
);

export default Header;
