import classNames from 'classnames';
import React from 'react';

import Chart from '@/components/Chart';
import Info from '@/components/Info';
import List from '@/components/List';
import Map from '@/components/Map';
import Table from '@/components/Table';

import styles from './Main.scss';

const Main: React.FC = () => (
  <main className={styles['main']}>
    <div className={classNames(styles['main__wrapper'], styles['grid'])}>
      <List />
      <Map />
      <Info />
      <Table />
      <Chart />
    </div>
  </main>
);

export default Main;
