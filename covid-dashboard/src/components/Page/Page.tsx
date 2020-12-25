import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Main from '@/components/Main';

import styles from './Page.scss';

const Page: React.FC = () => (
  <div className={styles['page']}>
    <Header />
    <Main />
    <Footer />
  </div>
);

export default Page;
