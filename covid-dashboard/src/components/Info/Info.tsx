import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

import { getGlobalData } from '@/store/data/selector';
import { StateInterface, GlobalDataInterface } from '@/types/entities';
import { formatDate } from '@/utils/common';

import styles from './Info.scss';

interface InfoProps {
  globalData: GlobalDataInterface;
}

const Info: React.FC<InfoProps> = (props: InfoProps) => {
  const {
    globalData: { updated },
  } = props;

  return (
    <div className={classNames(styles['info'], styles['grid__element'])}>
      <p className={styles['info__text']}>Last updated at</p>
      <p className={styles['info__date']}>{formatDate(updated)}</p>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  globalData: getGlobalData(state),
});

export default connect(mapStateToProps)(Info);
