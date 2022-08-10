import React, { ReactChild, ReactChildren } from "react";
import classes from "./table.module.scss";
import classNames from 'classnames';
interface TdProps {
  children?: JSX.Element[] | JSX.Element;
  width?: string;
  onClick? : (e:any)=>void;
  field?: string;
  type?: string;
}

export default function Td({ children, width, onClick, field, type}: TdProps) {
  
  return (
  <td 
    className={classNames(classes.td, `resizable-td-${field}`)}
    style={{
      textAlign: 'center', 
      width: width && `${width}`,
      padding: type ==="object"? "12px 16px" : "16px"
    }} 
    onClick={onClick}
    >
      {children}
  </td>);
}
