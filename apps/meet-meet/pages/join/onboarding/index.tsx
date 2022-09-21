import { useUserForm } from "@hooks/user/useUserForm";
import { usePostUserInfo } from "@hooks/queries/user/useMutationQueries";
import classes from "./onboardingPage.module.scss";

import MeetmeetLogo from "../../../public/svg/meetmeet_horizontal.svg";
import { UserForm } from "@components/user/UserForm";
import { CardDepth1, Text, Button, SVG } from "ui/src/pages";

const OnboardingPage = () => {
  const initailValues = { name: "", phone: "", departmentId: null };
  const { onChangeTextField, onChangeDepartmentId, btnState, values } = useUserForm(initailValues);
  const { mutateAsync } = usePostUserInfo();

  const onClickUpdate = () => {
    if (btnState === "disable") return;
    mutateAsync(values);
  }

  return (
    <div className={classes["onboardingPage-container"]}>
      <div className={classes["onboardingCard-wrapper"]}>
        <CardDepth1>
          <CardDepth1.Contents>
            <div className={classes["card-contents-wrapper"]}>
              <div className={classes["card-title-wrapper"]}>
                <MeetmeetLogo width="144px" />
                <Text type="headline-medium" style={{ fontWeight: "700" }}>
                  회원 정보를 입력해주세요.
                </Text>
              </div>
              <UserForm values={values} onChangeTextField={onChangeTextField} onChangeDepartmentId={onChangeDepartmentId} />
              <Button
                label="입력 완료"
                size="large"
                configuration="filled"
                style={{ width: "100%", justifyContent: "center" }}
                state={btnState}
                onClick={onClickUpdate}
              />
            </div>
          </CardDepth1.Contents>
        </CardDepth1>
      </div>
    </div>
  );
};

export default OnboardingPage;
