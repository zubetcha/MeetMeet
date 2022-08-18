import { Children, cloneElement, isValidElement, ReactNode } from "react";
import classes from "./Modal.module.scss";
import classNames from "classnames";
import {useKeyEscClose} from "../../../hooks/useKeyEscClose";
import { Button } from "../Buttons/Button";

export const ModalMain = ({ children, type = "medium", setIsOpen }: Props) => {

  useKeyEscClose(setIsOpen);

  const getModalChildren = (children: ReactNode, type: any) => {
    const childrenArray = Children.toArray(children);
    const modalChildren = childrenArray.filter((child) => isValidElement(child) && child.type === type).slice(0, 2);

    return modalChildren;
  };

  const ModalContentType = "";
  const ModalButtonType = (<Button />).type;

  const modalContents = getModalChildren(children, ModalContentType);
  const modalButtons = getModalChildren(children, ModalButtonType);

  return (
    <>
    <div className={classes["modal-overlay"]} onClick={()=>setIsOpen && setIsOpen(false)}>
      <div className={classNames(classes["modal-container"], classes[type])}>
        {modalContents &&
          <div className={classes["modal-contents"]}>{modalContents}</div>
        }
        {modalButtons &&
          <div className={classes["modal-buttons"]}>{modalButtons}</div>
        }
      </div>
    </div>
    </>
  );
}

interface Props {
  children:JSX.Element[] |any;
  type?: string;
  isOpen?:boolean;
  setIsOpen?:(e:any)=>void;
}

