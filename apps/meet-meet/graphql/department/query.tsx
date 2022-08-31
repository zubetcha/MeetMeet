import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      name
      createdAt
      updatedAt
    }
  }
`;