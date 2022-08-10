import React, { useState, useEffect } from "react";
import classes from "./modals.module.scss";
import classNames from "classnames";

import { Button, Input, SVG } from "../elements";
import { colors } from "../../shared/style";

interface PasswordChangeForm {
  curPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface PasswordChangeModalProps {
  noCurrentPassword?: boolean;
  handleClickClose: () => void;
  isLoading: boolean;
  values: PasswordChangeForm;
  inputStatus: PasswordChangeForm;
  helperText: PasswordChangeForm;
  setValues: (values: object) => void;
  setInputStatus: (inputStatus: object) => void;
  setHelperText: (helperText: object) => void;
  onChange: (e: React.ChangeEvent) => void;
  btnState: string;
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
  onClickChangeBtn: () => void;
}

interface VisibilityIconsType {
  default: string;
  active: string;
  focused: string;
}

/**
 *
 * @param setPasswordChangeModal 비밀번호 변경 모달  true | false
 * @param noCurrentPassword [현재 비밀번호 알 수 없는 경우인지?]  true | false
 * @param username [현재 비밀번호 알 수 없을 때] 비밀번호 변경을 위해 사용될 username
 * @returns
 */
export const PasswordChangeModal = ({
  noCurrentPassword,
  handleClickClose,
  isLoading,
  values,
  inputStatus,
  helperText,
  onChange,
  btnState,
  isDone,
  setIsDone,
  onClickChangeBtn,
}: PasswordChangeModalProps) => {
  const [curPWVisible, setCurPWVisible] = useState<boolean>(false);
  const [newPWVisible, setNewPWVisible] = useState<boolean>(false);
  const [checkNewPWVisible, setCheckNewPWVisible] = useState<boolean>(false);

  // const handleChangeButtonState = () => {
  //   if (!noCurrentPassword) {
  //     if (
  //       curPWValue.length > 0 &&
  //       newPWStatus.status === "nice" &&
  //       checkNewPWStatus.status === "nice"
  //     ) {
  //       setChangeBtnState("default");
  //     } else {
  //       setChangeBtnState("disable");
  //     }
  //   } else {
  //     if (newPWStatus.status === "nice" && checkNewPWStatus.status === "nice") {
  //       setChangeBtnState("default");
  //     } else {
  //       setChangeBtnState("disable");
  //     }
  //   }
  // };

  const handleClickIcon = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // DESCRIBE:
    const { className } = e.currentTarget;
    if (className === "curPassword") {
      setCurPWVisible(!curPWVisible);
    } else if (className === "newPassword") {
      setNewPWVisible(!newPWVisible);
    } else if (className === "newPasswordConfirm") {
      setCheckNewPWVisible(!checkNewPWVisible);
    }
  };

  const handleInitState = () => {
    setCurPWVisible(false);
    setNewPWVisible(false);
    setCheckNewPWVisible(false);
  };

  const handleInputIconColor = (value: string) => {
    if (value.length) {
      return colors.darkMedium;
    } else {
      return colors.darkLow;
    }
  }

  useEffect(() => {
    if (isDone) {
      handleInitState();
    }
  }, [isDone]);

  return (
    <>
      <div className={classNames(classes.modalContainer, classes.PWResetModal)}>
        {!noCurrentPassword && (
          <Input
            type={curPWVisible ? "text" : "password"}
            name="curPassword"
            placeholder="현재 비밀번호"
            label="현재 비밀번호"
            value={values.curPassword}
            status={inputStatus.curPassword}
            helperText={helperText.curPassword}
            size="medium"
            width="100%"
            onChange={onChange}
            icon={
              <SVG
                name={curPWVisible ? "visibilityOn" : "visibilityOff"}
                color={handleInputIconColor(values.curPassword)}
              />
            }
            onClick={handleClickIcon}
          />
        )}

        <div className={classes.information}>
          <p className={classes.mainText}>
            j
            Factoroid의 안전한 계정 사용을 위해
            <br />
            아래 가이드를 따라 비밀번호를 설정해주세요.
          </p>
          <div className={classNames(classes.flex, classes.flexColumn)}>
            <div className={classNames(classes.flex, classes.flexRow)}>
              <div className={classes.iconWrapper}>
                <SVG name="error" color={colors.dangerMedium} />
              </div>
              <p className={classes.mainText}>필수 조건</p>
            </div>
            <p className={classes.subText}>
              - 최소 8자 이상이어야 합니다.
              <br />
              - 영문자, 숫자, 특수문자 3가지를 모두 포함해야 합니다.
              <br />- 특수문자는 !@#$%^&*.()만 사용 가능합니다.
            </p>
          </div>
          <div className={classNames(classes.flex, classes.flexColumn)}>
            <div className={classNames(classes.flex, classes.flexRow)}>
              <div className={classes.iconWrapper}>
                <SVG name="error" color={colors.warningMedium} />
              </div>
              <p className={classes.mainText}>권장 사항</p>
            </div>
            <p className={classes.subText}>
              - 동일한 문자의 반복은 피해주세요.
              <br />- 키보드 상에서 나란히 있는 문자열은 피해주세요.
            </p>
          </div>
        </div>
        <Input
          type={newPWVisible ? "text" : "password"}
          name="newPassword"
          placeholder="새 비밀번호"
          label="새 비밀번호"
          value={values.newPassword}
          status={inputStatus.newPassword}
          helperText={helperText.newPassword}
          size="medium"
          width="100%"
          onChange={onChange}
          icon={
            <SVG
              name={newPWVisible ? "visibilityOn" : "visibilityOff"} 
              color={handleInputIconColor(values.newPassword)}
            />
          }
          onClick={handleClickIcon}
        />
        <Input
          type={checkNewPWVisible ? "text" : "password"}
          name="newPasswordConfirm"
          placeholder="새 비밀번호 재입력"
          label="새 비밀번호 재입력"
          value={values.newPasswordConfirm}
          status={inputStatus.newPasswordConfirm}
          helperText={helperText.newPasswordConfirm}
          size="medium"
          width="100%"
          onChange={onChange}
          icon={
            <SVG
              name={checkNewPWVisible ? "visibilityOn" : "visibilityOff"}
              color={handleInputIconColor(values.newPasswordConfirm)}
            />
          }
          onClick={handleClickIcon}
        />
        <div className={classes.btnsWrapper}>
          <Button
            text="취소하기"
            size="large"
            style="text"
            onClick={
              noCurrentPassword ? handleClickClose : () => setIsDone(true)
            }
          />
          <Button
            text="비밀번호 변경 완료"
            size="large"
            style="solid"
            height="40px"
            state={btnState}
            isLoading={isLoading ? true : false}
            onClick={onClickChangeBtn}
          />
        </div>
      </div>
    </>
  );
};
