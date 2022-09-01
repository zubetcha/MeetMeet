import { useEffect } from "react";
import { useRouter } from "next/router";
import { ACCESS_TOKEN } from "constants/auth";
import { AuthAPI } from "@api/api";

export const RouterGuard = ({children}: Props) => {
    const router = useRouter();
    const exceptionList = ["/login", "/join", "/join/onboarding", "/oauth/redirect"];

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

    const handleUserInfo = async () => {
        try {
            const { data } = await AuthAPI.getUserInfo();

            // if (추가한 유저 정보 O) router.push()
            // else router.replace("/join/onboarding");

        }
        catch (error) {throw new Error("유저 정보 조회 실패")}
    }

    useEffect(() => {
        if (!exceptionList.includes(router.pathname)) {
            checkAuth();
        }
    }, [])

    return children;
}

interface Props {
    children: JSX.Element[] | JSX.Element;
}