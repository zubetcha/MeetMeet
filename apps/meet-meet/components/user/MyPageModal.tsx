import { useEffect } from "react";
import { useUserForm } from "@hooks/user/useUserForm";
import { useRecoilState } from "recoil";
import userState from "recoil/user";

import { UserForm } from "./UserForm";
import { Modal, Button, Text } from "ui/src/pages"

export const MyPageModal = ({ setIsModal }: Props) => {
    const [user, setUser] = useRecoilState(userState);
    const { name, phone, department } = user;
    const initailValues = { name, phone, departmentId: department.id };

    const { onChangeTextField, onChangeDepartmentId, onClickMutateButton, btnState, values, mutationResult } = useUserForm(initailValues);
    const { isSuccess, data } = mutationResult;

    useEffect(() => {
        if (isSuccess && data) {
            // TODO: 성공 모달 1.3초 띄웠다가 없애기 
            // TODO: Recoil에 유저 정보 업데이트 
        }
    }, [isSuccess, data])

    return (
        <Modal>
            <Text type="headline-medium" style={{ fontWeight: "700" }}>회원 정보</Text>
            <Modal.Contents>
                <UserForm values={values} onChangeTextField={onChangeTextField} onChangeDepartmentId={onChangeDepartmentId} departmentId={department.id} />
            </Modal.Contents>
            <Modal.Buttons>
                <Button label="취소" size="large" configuration="textGray" onClick={() => setIsModal(false)} />
                <Button label="수정하기" size="large" configuration="filled" state={btnState} onClick={onClickMutateButton} />
            </Modal.Buttons>
        </Modal>
    )
}

interface Props {
    setIsModal: (isModal: boolean) => void;
}
