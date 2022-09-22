import { gql } from "@apollo/client";


export const GET_ACCOUNT_BY_DEPARTMENT = gql`
  query AccountsByDepartment($departmentId: Int!) {
    accountByDepartment(departmentId: $departmentId) {
      id,
      name,
      noticeTime,
      role,
      department {
        id,
        name
      }
    } 
  }
`;