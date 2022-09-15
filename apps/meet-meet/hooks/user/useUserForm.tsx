import { useState, useEffect, ChangeEvent } from "react"
import { getPhoneFormat } from "ui/src/utils/getPhoneFormat";

import { SelectItemType } from "ui/src/components/elements/Select/@types/select.types";
import { StateType } from "ui/src/components/elements/Buttons/types/button.types"

/**
 * 
 * @param initialValues 
 * @returns 
 */
export const useUserForm = (initialValues: UserFormType) => {
    const [values, setValues] = useState(initialValues);
    const [btnState, setBtnState] = useState<StateType>("disable");

    const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const _value = name === "phone" ? getPhoneFormat(value) : value;

        setValues({ ...values, [name]: _value });
    }

    const onChangeDepartmentId = (e: SelectItemType) => {
        setValues({...values, departmentId: parseInt(e.id)});
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
        btnState, 
        values, 
    };
}

interface UserFormType {
    name: string;
    phone: string;
    departmentId: number | null;
}