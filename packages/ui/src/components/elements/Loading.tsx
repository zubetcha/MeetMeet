import React from 'react'
import Image from 'next/image';
import LoadingImg from '../../assets/img/main-loading.png';
import classes from './elements.module.scss';


export const Loading = () => {
  return (
    <div className={classes.loading_wrapper}>
        <Image src={LoadingImg} priority className={classes.rotateIcon}></Image>
    </div>
  )
}
