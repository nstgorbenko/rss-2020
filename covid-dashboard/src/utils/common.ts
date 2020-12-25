import classNames from 'classnames';
import { CSSProperties } from 'react';

import { Screen } from '@/constants/constants';

export const getNextArrayItem = <T>(array: Array<T>, currentItem: T): T => {
  const currentItemIndex = array.indexOf(currentItem);
  if (currentItemIndex === array.length - 1) {
    return array[0];
  }
  return array[currentItemIndex + 1];
};

export const getPreviousArrayItem = <T>(array: Array<T>, currentItem: T): T => {
  const currentItemIndex = array.indexOf(currentItem);
  if (currentItemIndex === 0) {
    return array[array.length - 1];
  }
  return array[currentItemIndex - 1];
};

export const getPreviousThirdItem = <T>(array: Array<T>, currentItem: T): T => {
  const DIVISOR = 3;
  const currentItemIndex = array.indexOf(currentItem);
  const nextIndex = Math.trunc(currentItemIndex / DIVISOR) * DIVISOR - DIVISOR;
  if (nextIndex < 0) {
    return array[array.length - DIVISOR];
  }
  return array[nextIndex];
};

export const getNextThirdItem = <T>(array: Array<T>, currentItem: T): T => {
  const DIVISOR = 3;
  const currentItemIndex = array.indexOf(currentItem);
  const nextIndex = Math.trunc(currentItemIndex / DIVISOR) * DIVISOR + DIVISOR;
  if (nextIndex >= array.length - 1) {
    return array[0];
  }
  return array[nextIndex];
};

export const getScreenComponentClass = (
  screenComponentName: Screen,
  isFullScreenComponent: boolean,
  fullScreenName: Screen,
  styles: CSSProperties
): string => {
  if (isFullScreenComponent) {
    return classNames(
      styles[screenComponentName],
      styles['grid__element'],
      styles['grid__element--show']
    );
  }
  if (!isFullScreenComponent && fullScreenName !== Screen.ALL) {
    return classNames(
      styles[screenComponentName],
      styles['grid__element'],
      styles['grid__element--hide']
    );
  }
  return classNames(styles[screenComponentName], styles['grid__element']);
};

export const formatDate = (date: number): string => {
  const ISODate = new Date(date).toISOString();

  const day = ISODate.slice(8, 10);
  const month = ISODate.slice(5, 7);
  const year = ISODate.slice(0, 4);
  const hours = ISODate.slice(11, 13);
  const minutes = ISODate.slice(14, 16);

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};
