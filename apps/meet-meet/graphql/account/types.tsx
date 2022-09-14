import { Department } from "graphql/department/types";

export type Account = {
  id: number,
  name: string,
  department: Department,
  email: string,
  phone: string,
  noticeTime: number,
  createdAt: string,
  updatedAt: string
}

export type AccountByDepartment = {
  accountByDepartment: {
    id: number,
    name: string,
    noticeTime: number,
    role: string;
    department: {
      id: number,
      name: string
    }
  }[] 
}