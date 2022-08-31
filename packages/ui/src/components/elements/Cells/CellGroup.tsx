import React, { Children, useState } from 'react';
import classes from './Cell.module.scss';
import { ScrollDrag } from '../ScrollDrag/ScrollDrag';
import ScrollContainer from 'react-indiana-drag-scroll';
import classNames from 'classnames';
import { useCellGroup } from './hooks';
import { useEffect } from 'react';

export type selectedIndex = {
  start: number | null;
  end: number | null;
};
interface Props {
  children: JSX.Element[];
  defaultIndex: selectedIndex;
  selectedIndex?: selectedIndex;
  disableIndex?: number[];
  onChange?: (e: any) => void;
}

export const CellGroup = ({
  children,
  defaultIndex = {
    start: null,
    end: null,
  },
  onChange = ()=>{},
  disableIndex = [],
}:Props) => {

  const { btnState, onClick, onMouseLeave, onMouseOver, btnHoverState } = useCellGroup({
    defaultIndex: defaultIndex,
    childrenLength: Children.toArray(children).length,
    onChange: onChange,
  });

  return (
    <ScrollContainer>
      <div className={classes.cellGroupBox}>
        {Children.toArray(children).map((child: any, index: number) => {
          return (
            <div key={`cell-child-${index}`}>
              {React.cloneElement(child, {
                onClick: () => disableIndex?.includes(index) || onClick(index),
                onMouseOver: () =>
                  disableIndex?.includes(index) || onMouseOver(index),
                onMouseLeave: () =>
                  disableIndex?.includes(index) || onMouseLeave(),
                state: disableIndex?.includes(index)
                  ? "disable"
                  : btnState[index],
                isHover: disableIndex?.includes(index) || btnHoverState[index],
              })}
            </div>
          );
        })}
      </div>
    </ScrollContainer>
  );
};
