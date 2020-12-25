import React from 'react';

import styles from './Footer.scss';

const Footer: React.FC = () => (
  <footer className={styles['footer']}>
    <div className={styles['footer__wrapper']}>
      <a className={styles['footer__school']} href="https://rs.school/js/">
        <svg className={styles['footer__school-icon']}>
          <use xlinkHref="#icon-rsschool" />
        </svg>
        <span>2020</span>
      </a>
      <div className="footer__dev">
        <a className={styles['footer__link']} href="https://github.com/KingstonTwelve">
          KingstonTwelve
        </a>
        <a className={styles['footer__link']} href="https://github.com/nstgorbenko">
          nstgorbenko
        </a>
        <a className={styles['footer__link']} href="https://github.com/Torondil">
          Torondil
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
