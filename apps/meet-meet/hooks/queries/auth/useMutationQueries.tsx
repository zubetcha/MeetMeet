import { useMutation, useQueryClient } from "react-query";
import { AuthAPI } from "@api/api";


export const usePostUserInfo = () => {
  const queryClient = useQueryClient(); 

  return useMutation(
    ["post", "userInfo"],
    (userInfo: {}) => AuthAPI.addUserInfo(userInfo),
    {
      onSuccess: (res) => {
        // TODO: invalidateQueries
      }
    }
  )
}