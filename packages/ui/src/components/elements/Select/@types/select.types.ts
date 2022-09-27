export interface SelectItemType {
  id: string;
  name: string;
  noticeTime:number;
  role: string;
  __typename: string;
  department: {
    __typename: string;
    id: number;
    name: string;
  }
}
