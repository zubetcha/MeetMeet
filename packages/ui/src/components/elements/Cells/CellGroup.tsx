import React, { Children } from 'react';
import classes from './Cell.module.scss';
import { ScrollDrag } from '../ScrollDrag/ScrollDrag';
import classNames from 'classnames';

interface Props {
  children: JSX.Element[];
}

export const CellGroup = ({
  children
}:Props) => {
  return (
    <ScrollDrag>
      {children}
    </ScrollDrag>
  )
}