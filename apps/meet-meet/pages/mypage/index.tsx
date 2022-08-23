import classes from "./mypagePage.module.scss";
import { CardDepth1, Text, TextField, SVG, Button } from "ui/src/pages";

const MypagePage = () => {
  return (
    <div className={classes.container}>
      <CardDepth1>
        <CardDepth1.Contents>
          <div className={classes["card-contents-wrapper"]}>
            <Text type="headline-medium" style={{ padding: "0 0 60px", fontWeight: "700", width: "100%" }}>
              회원 정보
            </Text>
            <div className={classes["card-textFields-wrapper"]}>
              <TextField name="username" status="default">
                <TextField.Label>이름</TextField.Label>
                <TextField.Input type="text" value="" placeholder="이름" />
                <TextField.HelperText>헬퍼텍스트</TextField.HelperText>
              </TextField>
              <TextField name="phone" status="default">
                <TextField.Label>전화번호</TextField.Label>
                <TextField.Input type="text" value="" placeholder="전화번호" />
                <TextField.HelperText>헬퍼텍스트</TextField.HelperText>
              </TextField>
              <TextField name="department" status="default">
                <TextField.Label>소속 부서</TextField.Label>
                <TextField.Input type="text" value="" placeholder="소속 부서">
                  <TextField.Unit>단위</TextField.Unit>
                  <TextField.Icon>
                    <SVG name="dropdown" />
                  </TextField.Icon>
                </TextField.Input>
                <TextField.HelperText>헬퍼텍스트</TextField.HelperText>
              </TextField>
            </div>
            <div className={classes["card-button-wrapper"]}>
              <Button label="수정하기" size="large" configuration="filled" />
            </div>
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
    </div>
  );
}

export default MypagePage;
