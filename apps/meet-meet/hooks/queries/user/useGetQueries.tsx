import { useQuery } from "react-query";
import { useQuery as useQueryGql } from "@apollo/client";
import { useSetRecoilState } from "recoil";
import userState from "recoil/user";
import { AuthAPI } from "@api/api";
import { DepartmentData } from "graphql/department/types";
import { AccountByDepartment } from "graphql/account/types";
import { GET_DEPARTMENTS } from "graphql/department/query";
import { GET_ACCOUNT_BY_DEPARTMENT } from "graphql/account/query";

export const useGetUserInfo = () => {
  const setUser = useSetRecoilState(userState);
  const result = useQuery(["get", "userInfo"], () => AuthAPI.getUserInfo(), {
    enabled: false,
    onSuccess: res => {
      setUser(res.data);
    },
  })

  return result;
}

export const useGetDepartments = () => {
  const result = useQueryGql<DepartmentData>(GET_DEPARTMENTS, {

  })
  return { ...result }
}

export const useGetAccountsByDepartment = (id: number) => {
  const result = useQueryGql<AccountByDepartment>(GET_ACCOUNT_BY_DEPARTMENT, {
      variables: {departmentId: id}
  })  
  return { ...result }
}