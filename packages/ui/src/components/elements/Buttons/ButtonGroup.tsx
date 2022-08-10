import React, { useState, Children, useEffect } from "react";
import classes from "./button.module.scss";
import classNames from "classnames";

interface ButtonGroupProps {
  size?: string;
  style: string;
  selectedId?: any;
  setSelectedId?: (id:any) => void;
  children: JSX.Element[];
  onClick?:(e:any)=>void;
}


/**
 * 
 * @param size 크기
 * @param style solid | line | text
 * @param setSelectedId 선택 버튼 setState 함수
 * @param selected 선택된 버튼 인덱스
 * @param onClick 버튼 onClick event
 * @returns 
 */
export function ButtonGroup({
  size,
  style,
  setSelectedId,
  selectedId,
  children,
  onClick,
}: ButtonGroupProps) {
  const [btnState, setBtnState] = useState<string[]>(
    Array.from({ length: Children.toArray(children).length }, () => "default")
  );

  useEffect(() => {
    let newArray = [...btnState];
    newArray.map((item, i) => {
      i == selectedId ? (newArray[i] = "focused") : (newArray[i] = "default");
    });
    setBtnState(newArray);
  }, [selectedId]);

  const handleClick = 
    (e: any) => {
      let id; 

      if(e.target.closest(".button")){
        id = e.target.closest(".button").id;
      }
      else{
        id = e.target.id;
      }
      
      if (setSelectedId !== undefined) {
        setSelectedId(Number(id));
      }
    }

  return (
    <div className={classNames(classes[style], classes.btnGroup)}>
      {Children.toArray(children).map((child: any, index: number) => {
        return (
          <div className={classes.btnElement} key={`button-child-${index}`}>
            {React.cloneElement(child, {
              style,
              state: btnState[index],
              id: index,
              borderRadius: "0px",
              size,
              last: index ==Children.toArray(children).length -1 ? true :false,
              onClick: onClick? onClick: handleClick,
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
