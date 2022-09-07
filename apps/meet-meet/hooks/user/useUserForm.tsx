import { useState, useEffect, ChangeEvent } from "react"
import { usePostUserInfo } from "@hooks/queries/auth/useMutationQueries";
import { getPhoneFormat } from "ui/src/utils/getPhoneFormat";

import { SelectItemType } from "ui/src/components/elements/Select/types/select.types";
import { StateType } from "ui/src/components/elements/Buttons/types/button.types"

export const useUserForm = (initialValues: UserFormType) => {
    const [values, setValues] = useState(initialValues);
    const [btnState, setBtnState] = useState<StateType>("disable");

    const userInfo = usePostUserInfo();

    const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const _value = name === "phone" ? getPhoneFormat(value) : value;

        setValues({ ...values, [name]: _value });
    }

    const onChangeDepartmentId = (e: SelectItemType) => {
        setValues({...values, departmentId: parseInt(e.id)});
    }

    const onClickMutateButton = () => {
        if (btnState === "disable") return;
        userInfo.mutateAsync(values);
    }

    useEffect(() => {
        const { name, phone, departmentId } = values;
        
        name && phone.length === 13 && departmentId
        ? setBtnState("default")
        : setBtnState("disable");
    }, [values])

    return { 
        onChangeTextField, 
        onChangeDepartmentId, 
        onClickMutateButton, 
        btnState, 
        values, 
        mutationResult: { ...userInfo }
    };
}

interface UserFormType {
    name: string;
    phone: string;
    departmentId: number | null;
}