import { useMutation, useQueryClient } from "react-query";
import Router, { useRouter } from "next/router";
import { AuthAPI } from "@api/api";


export const usePostUserInfo = () => {
  const router = useRouter();
  return useMutation(
    ["post", "userInfo"],
    (userInfo: {}) => AuthAPI.addUserInfo(userInfo),
    {
      onSuccess: (res) => {
        router.replace("/");
        // TODO: invalidateQueries
      }
    }
  )
}