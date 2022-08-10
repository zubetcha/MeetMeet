import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

import { ButtonProps } from "../../../types/ui.types";
import { buttons } from "../../../shared/style";
import RotateIcon from "../../../assets/img/rotate-icon.png";
import classes from "./button.module.scss";
import classNames from "classnames";
// $TODO: 버튼 모듈화에 필요한 props 받아오기

/**
 *
 * @param text 버튼에 들어가는 text
 * @param size 버튼 사이즈, value = large || medium
 * @param style 버튼 스타일, value= text || line || solid
 * @param onClick 클릭 이벤트 함수
 * @param width 버튼 width, defaultValue = "fit-content", 필요시 px값을 할당하면 됨
 * @param height 버튼 height, defaultValue = "fit-content", 필요시 px값을 할당하면 됨
 * @param borderRadius 버튼 border-radius, defaultValue = "4px", 필요시 px값으로 할당하면 됨
 * @param border
 * @param state 버튼 상태, defaultValue ="default", value = "default" || "focused" || "disable"
 * @param isLoading 로딩 중일 때 버튼 text 대신 로딩바가 돌 수 있도록, value = true || false
 * @param icon 아이콘 유무, defaultValue = false, value = true || false
 * @param iconLoaction 아이콘 위치 "left" | "right"
 * @param last 마지막인지,
 * @param padding 버튼의 패딩 값을 따로 설정하고싶은 경우
 * @returns
 */

export const Button = ({
  text,
  type="button",
  size = "large",
  style = "solid",
  state = "default",
  width = "fit-content",
  textWidth,
  height = "fit-content",
  color,
  borderRadius = "4px",
  last=false,
  justifyContent = "center",
  isLoading,
  border=true,
  icon,
  iconLocation,
  id,
  onClick,
  onHover,
}: ButtonProps) => {
  // $TODO: is_focused에따라 상태값 변환 시켜주기
  const [btnState, setbtnState] = useState(state);

  // $TODO: 마우스가 버튼위에 있을 때
  const onMouseEnter = useCallback(() => {
    if(onHover) onHover(true);
    if (btnState === "default") {
      setbtnState("hover");
    }
  }, [btnState]);
  
  // $TODO: 마우스가 버튼에서 벗어났을때
  const onMouseLeave = useCallback(() => {
    if(onHover) onHover(false);
    if (btnState === "hover") {
      setbtnState("default");
    }
  }, [btnState]);

  useEffect(() => {
    setbtnState(state);
    return;
  }, [state]);
  

  return (
    <button
      id={id}
      style={{
        color: isLoading ? "transparent" : color? color : buttons[style][btnState].color,
        backgroundColor: buttons[style][btnState].backgroundColor,
        border: border? buttons[style][btnState].border : 'none',
        borderRight: border||!last? buttons[style][btnState].border : '',
        textDecoration: buttons[style][btnState].textDecoration,
        cursor: buttons[style][btnState].cursor,
        padding: buttons[style].padding[size],
        borderRadius: borderRadius,
        width: width,
        height: buttons.height[size],
        fontSize: buttons.fontSize[size],
        fontWeight: style!=="input" ? "bold" : "regular",
        // button width가 줄어들었을 때 text 줄바꿈 block
        whiteSpace: "nowrap",
        // textAlign: "center",
        display: "flex",
        justifyContent: justifyContent,
        alignItems: "center",
        position: "relative",
        gap: "6.67px",
        letterSpacing: "-0.012em"  
      }}
      className={classNames("button", style=="input" &&state!=="disable"? classes.hover: '')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      disabled={btnState == "disable" ? true : false}
      type={type}
    >
      <div className={classes.rotateIcon_wrapper}>
        {isLoading ? (
          <Image
            className={classes.rotateIcon}
            src={RotateIcon}
            alt="rotate-icon"
          />
        ) : null}
      </div>
      {icon && iconLocation==="left" ? (
        <div
          className={classes.button_icon}
          style={{ cursor: buttons[style][btnState].cursor }}
          onClick={onClick}
        >
          {icon}
        </div>
      ) : null}
      {
        text &&
        <div style={{ cursor: buttons[style][btnState].cursor, width:textWidth? textWidth:"fit-content", overflow:"hidden", textAlign:"left", whiteSpace:"nowrap", textOverflow:"ellipsis", height: buttons.lineHeight[size], display: "flex", alignItems: "center", justifyContent: justifyContent? justifyContent: "center"}} id={id}>
          <p style={{ cursor: buttons[style][btnState].cursor }}  id={id}>
            {text}
          </p>
        </div>
      }
      {icon && iconLocation==="right" ? (
        <div className={classes.button_icon} >
          {icon}
        </div>
      ) : null}
    </button>
  );
};