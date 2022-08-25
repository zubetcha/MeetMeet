import { useQuery } from "react-query";
import { AuthAPI } from "@api/api";

export const useGetGoogleLogin = () => {
  return useQuery(
    ["google-login"],
    () => AuthAPI.googleLogin(),
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res)
        // DESCRIBE: 웹스토리지에 jwt 저장 
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        // TODO: isFirst 여부에 따라 온보딩 페이지 or 메인 페이지로 리다이렉트 


      }
    }
  )
}