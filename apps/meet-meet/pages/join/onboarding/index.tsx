import { useEffect } from "react"; 
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useUserForm } from "@hooks/user/useUserForm";
import classes from "./onboardingPage.module.scss";

import userState from "recoil/user";

import { UserForm } from "@components/user/UserForm";
import { CardDepth1, Text, Button, SVG } from "ui/src/pages";

const OnboardingPage = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const initailValues = { name: "", phone: "", departmentId: null };

  const { onChangeTextField, onChangeDepartmentId, onClickMutateButton, btnState, values, mutationResult } = useUserForm(initailValues);
  const { isSuccess, data } = mutationResult;

  useEffect(() => {
    if (isSuccess && data) {
      setUser({...data.data});
      router.push("/")
    }
  }, [isSuccess, data])

  return (
    <div className={classes["onboardingPage-container"]}>
      <div>
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
              <UserForm values={values} onChangeTextField={onChangeTextField} onChangeDepartmentId={onChangeDepartmentId} />
              <Button
                label="입력 완료"
                size="large"
                configuration="filled"
                style={{ width: "360px", justifyContent: "center" }}
                state={btnState}
                onClick={onClickMutateButton}
              />
            </div>
          </CardDepth1.Contents>
        </CardDepth1>
      </div>
    </div>
  );
};

export default OnboardingPage;
