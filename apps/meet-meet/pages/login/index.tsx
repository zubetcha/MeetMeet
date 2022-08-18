import { useState } from "react";
import { Text, TextField, SVG } from "ui/src/pages";

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
      <Text text="ㅎㅇ" />
      {/* <TextField
        type="text"
        name="username"
        labelText="ID"
        status="default"
        placeholder="ID"
        helperText="ID"
        value={value}
        onChange={onChange}
        unitText="단위" 
        icon={<SVG name="dropdown" />}
        autoFocus
      />
      <TextField
        type="text"
        name="username"
        labelText="ID"
        status="default"
        placeholder="ID"
        helperText="ID"
        value={value}
        onChange={onChange}
        unitText="단위" 
        icon={<SVG name="dropdown" />}
      /> */}
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
    </div>
    </>
  )
}

export default Login;