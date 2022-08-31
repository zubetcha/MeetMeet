import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import { AuthAPI } from "@api/api";

export const usePostUserInfo = () => {
  const router = useRouter();
  return useMutation(
    ["post", "userInfo"],
    (userInfo: {}) => AuthAPI.addUserInfo(userInfo),
  )
}