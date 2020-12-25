import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  Parameter,
  parameterToTitle,
  parameterToTableTitle,
  PARAMETERS_LIST,
  Screen,
} from '@/constants/constants';
import { ActionCreator } from '@/store/app/app';
import { getParameter } from '@/store/app/selector';
import { StateInterface } from '@/types/entities';
import {
  getNextArrayItem,
  getPreviousArrayItem,
  getNextThirdItem,
  getPreviousThirdItem,
} from '@/utils/common';

import styles from './Title.scss';

interface TitleProps {
  screen: Screen;
  parameter: Parameter;
  changeParameter(parameter: Parameter): void;
}

const Title: React.FC<TitleProps> = (props: TitleProps) => {
  const { parameter, screen } = props;
  const isTableScreen = screen === Screen.TABLE;
  const title = !isTableScreen ? parameterToTitle[parameter] : parameterToTableTitle[parameter];

  const showPreviousTitle = () => {
    if (isTableScreen) {
      props.changeParameter(getPreviousThirdItem(PARAMETERS_LIST, parameter) as Parameter);
    } else {
      props.changeParameter(getPreviousArrayItem(PARAMETERS_LIST, parameter) as Parameter);
    }
  };

  const showNextTitle = () => {
    if (isTableScreen) {
      props.changeParameter(getNextThirdItem(PARAMETERS_LIST, parameter) as Parameter);
    } else {
      props.changeParameter(getNextArrayItem(PARAMETERS_LIST, parameter) as Parameter);
    }
  };

  return (
    <div className={styles['title']}>
      <button
        type="button"
        aria-label="Previous value"
        className={classNames(styles['title__arrow'], styles['title__arrow--left'])}
        onClick={showPreviousTitle}
      />
      <p className={styles['title__text']}>{title}</p>
      <button
        type="button"
        aria-label="Next value"
        className={classNames(styles['title__arrow'], styles['title__arrow--right'])}
        onClick={showNextTitle}
      />
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  parameter: getParameter(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeParameter(parameter: Parameter) {
    dispatch(ActionCreator.changeParameter(parameter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Title);
