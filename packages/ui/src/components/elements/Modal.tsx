import React, {useRef, useState, useEffect} from "react";
import classes from "./elements.module.scss";
import classNames from "classnames";
import {useKeyEscClose} from "../../hooks/useKeyEscClose";
interface ModalPropsType {
  children:JSX.Element[] |any;
  type?: string;
  isOpen?:boolean;
  setIsOpen?:(e:any)=>void;
}

export function Modal({ children, type = "medium", setIsOpen }: ModalPropsType) {

  useKeyEscClose(setIsOpen);

  return (
    <>
    <div className={classes.modalOverlay}>
      <div className={classes.modalBackground} onClick={()=>setIsOpen && setIsOpen(false)} ></div>
      <div className={classNames(classes.modalContainer, classes[type])}>
        {children}
      </div>
    </div>
    </>
  );
}
