import { useRef, useState } from "react"

import classNames from "classnames"
import classes from './ScrollDrag.module.scss'
import React from "react"

interface Props {
  children: JSX.Element[];
}

type stateType = {
  isScrolling: boolean,
  clientX: number,
  scrollX: number,
}

export const ScrollDrag = ({
  children
}:Props) => {

  const [state, setState] = useState<stateType>({
    isScrolling: false,
    clientX: 0,
    scrollX: 0
  })

  const ref = useRef<any>();

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('마우스다운~!!')
    setState({...state, isScrolling: true, clientX: e.clientX});
  }

  const onMouseUp = () => {
    console.log('마우스 업!!')
    setState({...state, isScrolling: false });
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('마우스 무브~!!!')
    const { clientX, scrollX } = state;
    if (state.isScrolling) {
      console.log('이즈 스크롤링 트루')
      ref.current.scrollLeft = scrollX - e.clientX + clientX;
      state.scrollX = scrollX + e.clientX - clientX;
      state.clientX = e.clientX;
    }
  }

  return (
    <div 
      className={classes.scrollDrag}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove} 
    >
      {children}
    </div>
  )
}