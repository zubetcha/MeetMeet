import React, { ChangeEvent, useState } from "react"; 
import { useQuery } from "@apollo/client";
import classes from "./onboardingPage.module.scss";

import { GET_DEPARTMENTS } from "graphql/common/query";
import { usePostUserInfo } from "@hooks/queries/auth/useMutationQueries"

import { DepartmentData } from "graphql/common/types";

import { CardDepth1, Text, TextField, Button, SVG } from "ui/src/pages";

const OnboardingPage = () => {
  const [departments, setDepartments] = useState([]);
  const [TextFieldvalue, setTextFieldValue] = useState({ username: "", phone: "", departmentId: null})

  // TODO: departments 조회 gql -> 소속 부서 드롭다운 설정 

  const { data, loading, error } = useQuery<DepartmentData>(GET_DEPARTMENTS);

  console.log(data)
  console.log(loading)
  console.log(error)


  // TODO: onChangeValue
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTextFieldValue({ ...TextFieldvalue, [name]: value });
  }

  const onClick = () => {

  }

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
              <TextField name="username" status="default">
                <TextField.Label>이름</TextField.Label>
                <TextField.Input type="text" value="" placeholder="이름" onChange={onChange}/>
                <TextField.HelperText>헬퍼텍스트</TextField.HelperText>
              </TextField>
              <TextField name="phone" status="default">
                <TextField.Label>전화번호</TextField.Label>
                <TextField.Input type="text" value="" placeholder="전화번호" onChange={onChange}/>
                <TextField.HelperText>헬퍼텍스트</TextField.HelperText>
              </TextField>
              <TextField name="department" status="default">
                <TextField.Label>소속 부서</TextField.Label>
                <TextField.Input type="text" value="" placeholder="소속 부서">
                  <TextField.Unit>단위</TextField.Unit>
                  <TextField.Icon name="dropdown" />
                </TextField.Input>
                <TextField.HelperText>헬퍼텍스트</TextField.HelperText>
              </TextField>
            </div>
            <Button
              label="입력 완료"
              size="large"
              configuration="filled"
              style={{ width: "360px", justifyContent: "center" }}
            />
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
    </div>
  );
};

export default OnboardingPage;
