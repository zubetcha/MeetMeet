import React, { ChangeEvent, useState, useEffect } from "react"; 
import { useQuery } from "@apollo/client";
import classes from "./onboardingPage.module.scss";

import { GET_DEPARTMENTS } from "graphql/common/query";
import { usePostUserInfo } from "@hooks/queries/auth/useMutationQueries";

import { StateType } from "ui/src/components/elements/Buttons/types/button.types";
import { DepartmentData, Department } from "graphql/common/types";
import { SelectItemType } from "ui/src/components/elements/Select/types/select.types";

import { CardDepth1, Text, TextField, Button, SVG, Select } from "ui/src/pages";

const OnboardingPage = () => {

  const [userInfo, setUserInfo] = useState({ name: "", phone: "", departmentId: ""});
  const [btnState, setBtnState] = useState<StateType>("disable");

  const { data, loading, error } = useQuery<DepartmentData>(GET_DEPARTMENTS);
  const { mutateAsync, isError } = usePostUserInfo();

  const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const _value = name === "phone" ? value.replace(/[^0-9]/g, "").replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`) : value;

    setUserInfo({ ...userInfo, [name]: _value });
  }

  const onChangeDepartmentId = (e: SelectItemType) => {
    setUserInfo({...userInfo, departmentId: e.id});
  }

  const onClickAdd = () => {
    if (btnState === "disable") return;
    
    mutateAsync(userInfo);
  }

  useEffect(() => {
    const { name, phone, departmentId } = userInfo;

    name && phone.length === 13 && departmentId
    ? setBtnState("default")
    : setBtnState("disable");

  }, [userInfo])

  return (
    <div className={classes["onboardingPage-container"]}>
      <CardDepth1>
        <CardDepth1.Contents>
          <div className={classes["card-contents-wrapper"]}>
            <div className={classes["card-title-wrapper"]}>
              <div style={{ width: "144px" }}>
                <SVG name="meetmeetHori" />
              </div>
              <Text type="headline-medium" style={{ fontWeight: "700" }}>
                회원 정보를 입력해주세요.
              </Text>
            </div>
            <div className={classes["card-textFields-wrapper"]}>
              <TextField name="name" status="default">
                <TextField.Label>이름</TextField.Label>
                <TextField.Input type="text" value={userInfo.name} placeholder="이름" onChange={onChangeTextField}/>
              </TextField>

              <TextField name="phone" status="default">
                <TextField.Label>전화번호</TextField.Label>
                <TextField.Input type="text" value={userInfo.phone} placeholder="전화번호" onChange={onChangeTextField} maxLength={13}/>
              </TextField>

              <TextField name="department" status="default">
                <TextField.Label>소속 부서</TextField.Label>
                <Select isSearch defaultValue="" onChange={onChangeDepartmentId} style={{ width: "100%" }}>
                  {data && data.departments.map((department: Department) => {
                    const { id, name } = department;
                    return (
                      <Select.Option key={id} id={String(id)} name={name} />
                    )
                  })}
                </Select>
              </TextField>
            </div>
            <Button
              label="입력 완료"
              size="large"
              configuration="filled"
              style={{ width: "360px", justifyContent: "center" }}
              state={btnState}
              onClick={onClickAdd}
            />
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
    </div>
  );
};

export default OnboardingPage;
