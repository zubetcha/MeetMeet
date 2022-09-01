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
  const { onChangeTextField, onChangeDepartmentId, onClickMutateButton, btnState, values, mutationResult } = useUserForm();
  const { isSuccess, data } = mutationResult;

  // const [values, setValues] = useState({ name: "", phone: "", departmentId: -1});
  // const [btnState, setBtnState] = useState<StateType>("disable");

  // const { data: userData, mutateAsync, isError, error: valuesError, isSuccess } = usePostUserInfo();

  // const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   const _value = name === "phone" ? getPhoneFormat(value) : value;

  //   setValues({ ...values, [name]: _value });
  // }

  // const onChangeDepartmentId = (e: SelectItemType) => {
  //   setValues({...values, departmentId: parseInt(e.id)});
  // }

  // const onClickAdd = () => {
  //   if (btnState === "disable") return;
    
  //   mutateAsync(values);
  // }

  // useEffect(() => {
  //   const { name, phone, departmentId } = values;

  //   name && phone.length === 13 && departmentId
  //   ? setBtnState("default")
  //   : setBtnState("disable");

  // }, [values])

  useEffect(() => {
    if (isSuccess && data) {
      setUser({...data});
      router.push("/")
    }
  }, [isSuccess, data])

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
  );
};

export default OnboardingPage;
