import classNames from 'classnames';
import React from 'react';

import styles from './Resize.scss';

interface ResizeProps {
  isFullScreen: boolean;
  onClick(): void;
}

const Resize: React.FC<ResizeProps> = (props: ResizeProps) => {
  const { isFullScreen } = props;

  const resizeClass = isFullScreen
    ? classNames(styles['resize'], styles['resize--collapse'])
    : classNames(styles['resize'], styles['resize--expand']);
  const onButtonClick = () => props.onClick();

  return (
    <button
      type="button"
      aria-label="Resize screen"
      className={resizeClass}
      onClick={onButtonClick}
    >
      <svg className={styles['resize__icon']}>
        <use className={styles['resize__icon--expand']} xlinkHref="#icon-expand" />
        <use className={styles['resize__icon--collapse']} xlinkHref="#icon-collapse" />
      </svg>
    </button>
  );
};

export default Resize;
