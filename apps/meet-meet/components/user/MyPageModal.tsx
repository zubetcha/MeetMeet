import { useUserForm } from "@hooks/user/useUserForm";
import { useRecoilValue } from "recoil";
import { usePostUserInfo } from "@hooks/queries/user/useMutationQueries";
import userState from "recoil/user";

import { UserForm } from "./UserForm";
import { Modal, Button, Text } from "ui/src/pages"

interface Props {
    isModal: boolean;
    setIsModal: (isModal: boolean) => void;
}
export const MyPageModal = ({ isModal, setIsModal }: Props) => {
    const userInfo = useRecoilValue(userState);
    const { mutateAsync } = usePostUserInfo(setIsModal);
    const { name, phone, department } = userInfo;
    const initailValues = { name, phone, departmentId: department.id };

    const { onChangeTextField, onChangeDepartmentId, btnState, values } = useUserForm(initailValues);

    const onClickUpdate = () => {
        if (btnState === "disable") return;
        mutateAsync(values);
    }

    return (
        <Modal isOpen={isModal}>
            <Modal.Title type="title-large" weight="700">회원 정보</Modal.Title>
            <Modal.Contents>
                <UserForm values={values} onChangeTextField={onChangeTextField} onChangeDepartmentId={onChangeDepartmentId} departmentId={department.id} />
            </Modal.Contents>
            <Modal.Buttons>
                <Button label="취소" size="large" configuration="textGray" onClick={() => setIsModal(false)} />
                <Button label="수정하기" size="large" configuration="filled" state={btnState} onClick={onClickUpdate} />
            </Modal.Buttons>
        </Modal>
    )
}


