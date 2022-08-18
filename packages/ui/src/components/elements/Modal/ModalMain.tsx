import { Children, cloneElement, isValidElement, ReactNode } from "react";
import classes from "./Modal.module.scss";
import classNames from "classnames";
import {useKeyEscClose} from "../../../hooks/useKeyEscClose";

export const ModalMain = ({ children, setIsOpen, isToast = false }: Props) => {

  useKeyEscClose(setIsOpen);

  return (
    <>
    <div className={classes["modal-overlay"]} onClick={()=>setIsOpen && setIsOpen(false)}>
      <div className={classNames(classes["modal-container"], {[classes["toast"]]: isToast})}>
        {Children.toArray(children).map((child: any) => {
          return (
            <>
              {cloneElement(child)}
            </>
          )
        })}
      </div>
    </div>
    </>
  );
}

interface Props {
  children:JSX.Element[] |any;
  isToast?: boolean;
  isOpen?:boolean;
  setIsOpen?:(e:any)=>void;
}

