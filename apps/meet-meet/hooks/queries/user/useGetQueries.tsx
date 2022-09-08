import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import userState from "recoil/user";
import { AuthAPI } from "@api/api";

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