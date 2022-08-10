import React from "react";
import classes from "./modals.module.scss";
import classNames from "classnames";

import { colors } from "../../shared/style";
import { Button, SVG } from "../elements";

interface AlertInitialPWModalProps {
  onClickNow: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickLater: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ImageType {
  src: string;
  blurDataURL: string;
  width: number;
  height: number;
}

export const AlertInitialPWModal = ({
  onClickNow,
  onClickLater,
}: AlertInitialPWModalProps) => {
  return (
    <>
      <div className={classes.modalOuterBox}>
        <div
          className={classNames(
            classes.modalContainer,
            classes.afterLoginModal
          )}
        >
          <div>
          <SVG
            name="error"
            color={colors.dangerMedium}
            width={"40"}
            height={"40"}
          ></SVG>
          </div>
          <p className={classes.mainText}>
            계정 보안을 위해 비밀번호 변경이 필요합니다.
          </p>
          <p className={classes.subText}>
            고객님은 현재 초기 비밀번호를 사용중입니다.
            <br />
            안전한 계정 사용을 위해 비밀번호를 변경해주세요.
          </p>
          <div className={classes.btnsWrapper}>
            <Button
              text="나중에"
              size="large"
              style="text"
              onClick={onClickLater}
            />
            <Button
              text="지금 비밀번호 변경하기"
              size="large"
              style="solid"
              onClick={onClickNow}
            />
          </div>
        </div>
      </div>
    </>
  );
};
