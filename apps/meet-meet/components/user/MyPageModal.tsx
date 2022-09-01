import { useState } from "react";
import { getPhoneFormat } from "ui/src/utils/getPhoneFormat";

import { SelectItemType } from "ui/src/components/elements/Select/types/select.types";
import { UserForm } from "./UserForm";
import { Modal, Button, Text } from "ui/src/pages"

export const MyPageModal = ({ setIsModal }: Props) => {
    const [values, setValues] = useState({ name: "", phone: "", departmentId: -1 });

    const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const _value = name === "phone" ? getPhoneFormat(value) : value;
        
        setValues({ ...values, [name]: _value });
    }

    const onChangeDepartmentId = (e: SelectItemType) => {
        setValues({...values, departmentId: parseInt(e.id)});
    }

    return (
        <Modal>
            <Text type="headline-medium" style={{ fontWeight: "700" }}>회원 정보</Text>
            <Modal.Contents>
                <UserForm values={values} onChangeTextField={onChangeTextField} onChangeDepartmentId={onChangeDepartmentId}  />
            </Modal.Contents>
            <Modal.Buttons>
                <Button label="취소" size="large" configuration="textGray" onClick={() => setIsModal(false)} />
                <Button label="수정하기" size="large" configuration="filled" />
            </Modal.Buttons>
        </Modal>
    )
}

interface Props {
    setIsModal: (isModal: boolean) => void;
}
