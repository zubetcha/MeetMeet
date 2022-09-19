import { useQuery } from "@apollo/client";
import classes from "./user.module.scss";

import { GET_DEPARTMENTS } from "graphql/department/query";
import { Department, DepartmentData } from "graphql/department/types";
import { SelectItemType } from "ui/src/components/elements/Select/@types/select.types";

import { TextField, Select } from "ui/src/pages";

export const UserForm = ({ values, onChangeTextField, onChangeDepartmentId, departmentId }: Props) => {

  const { data } = useQuery<DepartmentData>(GET_DEPARTMENTS);
  const index = data?.departments.findIndex((department: Department) => department.id === departmentId)
  console.log(values)

  return (
    <div className={classes["textFields-wrapper"]}>
        <TextField name="name" status="default">
            <TextField.Label>이름</TextField.Label>
            <TextField.Input type="text" value={values.name} placeholder="이름" onChange={onChangeTextField} autoFocus/>
        </TextField>

        <TextField name="phone" status="default">
            <TextField.Label>전화번호</TextField.Label>
            <TextField.Input type="text" value={values.phone} placeholder="전화번호" onChange={onChangeTextField} maxLength={13}/>
        </TextField>

        <TextField name="department" status="default">
            <TextField.Label>소속 부서</TextField.Label>
            {data && (
                <Select isSearch defaultValue={departmentId ? data?.departments[index as number].name : ""} onChange={onChangeDepartmentId} style={{ width: "100%" }}>
                    {data.departments.map((department: Department) => {
                        const { id, name } = department;
                        return <Select.Option key={id} id={String(id)} name={name} />
                    })}
                </Select>
            )}
        </TextField>
    </div>
  )
}

interface Props {
    onChangeTextField: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDepartmentId: (e: SelectItemType) => void;
    values: any;
    departmentId?: number | null;
}
