import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { useGetUserInfo } from "./useGetQueries";
import { useHandleSuccess } from "@hooks/common/useHandleSuccess";

import { AuthAPI } from "@api/api";

export const usePostUserInfo = (setIsModal?: (is: boolean) => void) => {
  const { pathname, replace } = useRouter();
  const { refetch } = useGetUserInfo();
  const { handleSuccess } = useHandleSuccess();

  const result =  useMutation(
    ["mutate", "userInfo"],
    (userInfo: {}) => AuthAPI.addUserInfo(userInfo),
    {
      onSuccess: ({ data }) => {
        if (pathname.includes("/join/onboarding")) {
          replace("/");
        }
        else if (setIsModal) {
          handleSuccess({ title: "회원 정보 수정 성공", setIsModal });
          refetch();
        }
      }
    }
  );

  return result;
}