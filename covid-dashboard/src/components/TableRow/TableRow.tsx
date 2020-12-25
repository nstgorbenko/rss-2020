import classNames from 'classnames';
import React from 'react';

import { ShownTableInterface } from '@/types/entities';

import styles from './TableRow.scss';

interface TableProps {
  data: ShownTableInterface;
}

const TableRow: React.FC<TableProps> = (props: TableProps) => {
  const {
    data: { name, count, isActive },
  } = props;
  const tableRowClass = !isActive
    ? styles['table__row']
    : classNames(styles['table__row'], styles['table__row--active']);

  return (
    <tr className={tableRowClass}>
      <th className={styles['table__title']}>{name}</th>
      <td className={styles['table__info']}>{count.toLocaleString()}</td>
    </tr>
  );
};

export default TableRow;
