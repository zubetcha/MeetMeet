import React from "react";

import { Modal } from "./Modal";
import { Button } from "./Buttons/Button";
import { SVG } from "./SVG/SVG";
import classes from "./elements.module.scss";
import { colors } from "../../shared/style";

interface DialogProps {
  type?: string;
  isShow: boolean;
  cancleBtnText: string;
  confirmBtnText: string;
  onClickConfirmBtn: () => void;
  onClickCloseBtn: () => void;
  description:{
    title?: JSX.Element;
    sub1?: JSX.Element;
    sub2?: JSX.Element;
    sub3?: JSX.Element;
  },
  width?:string;
  isLoading?:boolean
}

export const Dialog = ({
  type="default",
  isShow,
  cancleBtnText,
  confirmBtnText,
  description,
  onClickConfirmBtn,
  onClickCloseBtn,
  width = '408px', 
  isLoading
}: DialogProps) => {
  const showIcon = (type: string) => {
    switch (type) {
      case "yellow-danger":
        return (
          <SVG
            name="error"
            color={colors.warningMedium}
            width={"40"}
            height={"40"}
          ></SVG>
        );
      default:
        return (
          <SVG
            name="error"
            color={colors.dangerMedium}
            width={"40"}
            height={"40"}
          ></SVG>
        );
    }
  };

  return (
    <>
      {isShow && (
        <div className={classes.dialog_container}>
          <Modal>
            <div style={{
              width: width
            }} >
              <div className={classes.header}>{showIcon(type)}</div>
              <div className={classes.body}>
                {description.title && <div className={classes.title}>{description.title}</div>}
                {description.sub1&& <div className={classes.sub}>{description.sub1}</div>}
                {description.sub2&& <div className={classes.sub}>{description.sub2}</div>}
                {description.sub3&& <div className={classes.sub}>{description.sub3}</div>}
              </div>
              <div className={classes.footer}>
                <Button
                  text={cancleBtnText}
                  style="text"
                  onClick={onClickCloseBtn}
                ></Button>
                <Button
                  text={confirmBtnText}
                  style="solid"
                  onClick={onClickConfirmBtn}
                  isLoading={isLoading}
                ></Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Dialog;
