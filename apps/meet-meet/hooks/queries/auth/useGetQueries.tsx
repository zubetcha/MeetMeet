import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { AuthAPI } from "@api/api";
import userState from "recoil/user";
import Router from "next/router";

export const useGetUserInfo = () => {
    const router = useRouter();
    const setUser = useSetRecoilState(userState);
    const result = useQuery(["user", "info"], () => AuthAPI.getUserInfo(), {
        onSuccess: (res) => {
            console.log(res.data);
            // DESCRIBE: recoil에 저장 
            // setUser(res.data)
        },
        onError: () => {
        }
    })

    return result;
}