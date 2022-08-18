import { useState } from "react";
import { Text, TextField, SVG, Modal, Button } from "ui/src/pages";

const Login = () => {
  const [value, setValue] = useState("");

  const onChange = (e: any) => {
    const { value } = e.target;
    setValue(value);
  }

  const status = "default"

  return (
    <>
    <div style={{ width: "1200px" }}>
      <Text>ㅎㅇ</Text>
      <TextField status={status} name="username">
        <TextField.Label>ID</TextField.Label>
        <TextField.Input
          type="text"
          placeholder="ID"
          value={value}
          onChange={onChange}
        >
          <TextField.Unit>단위</TextField.Unit>
          <TextField.Icon>
            <SVG name="dropdown" />
          </TextField.Icon>
        </TextField.Input>
        <TextField.HelperText>ID</TextField.HelperText>
      </TextField>
      <Modal isToast>
        <Modal.Contents>
          <Modal.Icon>
            <SVG name="done" color="primary"/>
          </Modal.Icon>
          <Modal.Title>모달 타이틀 혹은 주요 메세지</Modal.Title>
          <Modal.Description>모달 디스크립션 영역입니다. <br/> 주요메세지에 대해 부가적인 설명이 필요할 때 사용합니다.</Modal.Description>
          <Modal.Description>모달 디스크립션2: 부가 설명 문단이 필요할때 사용</Modal.Description>
          <Modal.Description>모달 디스크립션3: 부가 설명 문단이 필요할때 사용</Modal.Description>
        </Modal.Contents>
      </Modal>
    </div>
    </>
  )
}

export default Login;