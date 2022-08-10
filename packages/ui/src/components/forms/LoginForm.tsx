import React, { useState, useEffect, useRef } from "react";
import classes from "./forms.module.scss";

import { Input, Button, Checkbox} from "../elements";

interface LoginForm {
  loginUsername: string;
  password: string;
}

interface LoginFormProps {
  values: LoginForm;
  inputStatus: LoginForm;
  helperText: LoginForm;
  setValues: (e: any) => void;
  setInputStatus: (e: string) => void;
  setHelperText: (e: string) => void;
  onChange: (e: React.ChangeEvent) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  btnState: string;
  onClickLogin: (e: any) => void;
  isFindPwModal?: boolean;
  isLoading? : boolean;
  isMaintainLogin? : boolean;
  isStoreId?: boolean;
  t: (key: string) => string;
}

export const LoginForm = ({
  values,
  inputStatus,
  helperText,
  setValues,
  setInputStatus,
  onChange,
  onSubmit,
  btnState,
  onClickLogin,
  isFindPwModal = true,
  isLoading=false,
  isMaintainLogin=false,
  isStoreId=false,
  t,
}: LoginFormProps) => {
  const [isMaintainLoginCheckboxStatus, setIsMaintainLoginCheckboxStatus]=useState(false);
  const [isStoreIdCheckboxStatus, setIsStoreIdCheckboxStatus]=useState(false);

  useEffect(()=>{
    const storedId = localStorage.getItem("storedId");

    if(storedId){
      setIsStoreIdCheckboxStatus(true);
      setValues({
        ...values,
        ["loginUsername"] : storedId
      })
    }   
    // TODO: 로그인 상태 유지에 관련된 로직 추가해야함.
  },[])

  const [resetBeforeLoginModal, setResetBeforeLoginModal] =
    useState<boolean>(false);

  const handleClickPWBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    // DESCRIBE: 비밀번호 찾기 모달 띄우기
    e.preventDefault();
    e.stopPropagation();

    setResetBeforeLoginModal(true);
  };

  const onChangeCheckbox=(e: React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    const {name, checked} = e.target;

    switch(name){
      case "isMaintainLogin-checkbox" : return setIsMaintainLoginCheckboxStatus(checked);
      case "isStoreId-checkbox" : return setIsStoreIdCheckboxStatus(checked);
    }
  }

  const onClickLoginButton=(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    e.stopPropagation();

    // TODO: 로그인 상태 유지에 관련된 로직 추가해야함.

    isStoreIdCheckboxStatus
    ? localStorage.setItem("storedId", values.loginUsername) 
    : localStorage.removeItem("storedId");

    onClickLogin(e);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={classes.form}>
          <div className={classes.row}>
            <div className={classes.input_group}>
              <Input
                type="text"
                name="loginUsername"
                placeholder={t("id")}
                label={t("id")}
                value={values.loginUsername}
                status={inputStatus.loginUsername}
                helperText={helperText.loginUsername}
                autoFocus={true}
                size="large"
                onChange={onChange}
                autoComplete={"username"}
              />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.input_group}>
              <Input
                type="password"
                name="password"
                placeholder={t("password")}
                label={t("password")}
                value={values.password}
                status={inputStatus.password}
                helperText={helperText.password}
                size="large"
                onChange={onChange}
                autoComplete={"current-password"}
              />
            </div>
          </div>
          <div className={classes.row} style={{marginTop:"26px"}}>
            <Button
              text={t("login")}
              size="large"
              style="solid"
              state={btnState}
              width="100%"
              type="submit"
              onClick={onClickLoginButton}
              isLoading={isLoading}
            />
          </div>
          {isFindPwModal && (
            <Button
              text={t("no-current-password")}
              size="large"
              style="text"
              state="default"
              onClick={handleClickPWBtn}
            ></Button>
          )}
        </div>
      </form>
      <div className={classes.checkbox_container}>
        {isMaintainLogin &&
          <Checkbox
            name="isMaintainLogin-checkbox"
            id="isMaintainLogin-checkbox"
            onChange={onChangeCheckbox}
            checked={isMaintainLoginCheckboxStatus}
            label={"로그인 상태 유지"}
          ></Checkbox>
        }
        {isStoreId &&
          <Checkbox
            name="isStoreId-checkbox"
            id="isStoreId-checkbox"
            onChange={onChangeCheckbox}
            checked={isStoreIdCheckboxStatus}
            label={"아이디 저장"}
          ></Checkbox>
        }
      </div>
    </>
  );
};
