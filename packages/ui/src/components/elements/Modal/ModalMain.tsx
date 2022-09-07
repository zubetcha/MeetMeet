import { Children, cloneElement, isValidElement, ReactNode } from "react";
import classes from "./Modal.module.scss";
import classNames from "classnames";
import { useKeyEscClose } from "../../../hooks/useKeyEscClose";

export const ModalMain = ({ children, setIsOpen, isToast = false }: Props) => {
  useKeyEscClose(setIsOpen);

  return (
    <>
      <div
        className={classes["modal-overlay"]}
        onClick={(e) => setIsOpen && setIsOpen(false)}
      ></div>
      <div
        className={classNames(classes["modal-container"], {
          [classes["toast"]]: isToast,
        })}
      >
        {Children.toArray(children).map((child: any, i) => {
          return (
            <>
              {cloneElement(child, {
                key: `modal-child-${i}`,
              })}
            </>
          );
        })}
      </div>
    </>
  );
};

interface Props {
  children: JSX.Element[] | any;
  isToast?: boolean;
  isOpen?: boolean;
  setIsOpen?: (e: any) => void;
}
