import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import userState from "recoil/user";
import { AuthAPI } from "@api/api";

import { ACCESS_TOKEN } from "constants/auth";

export const RouterGuard = ({children}: Props) => {
    const router = useRouter();
    const setUser = useSetRecoilState(userState);
    const exceptionList = ["/login", "/join", "/join/onboarding", "/oauth/redirect"];

    // DESCRIBE: 웹스토리지 토큰 유무 여부 확인 
    const checkAuth = () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        if (!accessToken) {
            router.replace("/login");
            return;
        }
        else if (accessToken) {
            handleUserInfo();
        }
    };

    // DESCRIBE: 토큰으로 받은 유저 정보에 유저 이름, 전화번호, 소속 부서 중에 하나라도 없을 경우 온보딩 페이지로 리다이렉트 
    const handleUserInfo = async () => {
        try {
            const { data } = await AuthAPI.getUserInfo();
            const { name, department, phone } = data;

            if (!name || !department || !phone) {
                router.replace("/join/onboarding");
                return;
            }
            setUser(data);
        }
        catch (error) {throw new Error("유저 정보 조회 실패")}
    }

    useEffect(() => {
        // DESCRIBE: 토큰 확인이 필요 없는 페이지의 경우에만 checkAuth 함수 실행 
        if (!exceptionList.includes(router.pathname)) {
            checkAuth();
        }
    }, [])

    return <>{children}</>;
}

interface Props {
    children: JSX.Element[] | JSX.Element;
}