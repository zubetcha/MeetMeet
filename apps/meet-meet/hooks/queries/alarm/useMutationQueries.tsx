import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { AlarmAPI } from "@api/api";
import { useGetUserInfo } from "../user/useGetQueries";
import { useHandleSuccess } from "@hooks/common/useHandleSuccess";
import { DeviceInfo } from "./alarm.types";

/**
 * 로그인 후 접속 기기의 OS 정보 및 FCM 토큰을 서버로 전달
 * 
 */
export const useSendDeviceInfo = () => {
  return useMutation(
    ["send", "deviceInfo"],
    (deviceInfo: DeviceInfo) => AlarmAPI.sendDeviceInfo(deviceInfo)
  );
};

/**
 * 회의 시작 전 알람을 받을 기준 시간 세팅
 * 
 */
export const useSetAlarmConfig = () => {
  const { refetch } = useGetUserInfo();
  const { handleSuccess } = useHandleSuccess();
  const title = "알람 기준 수정 완료"

  return useMutation(
    ["alarm", "config"],
    (noticeTime: number | null) => AlarmAPI.setAlarmConfig(noticeTime),
    {
      onSuccess: res => {
        console.log(res);
        refetch();
        handleSuccess({ title })
      },
    }
  )
};

/**
 * 특정 알람만 읽음 처리
 * 
 */
export const useReadAlarm = () => {
  return useMutation(
    ["alarm", "read"],
    (reservationId: number) => AlarmAPI.readAlarm(reservationId),
    {
      onSuccess: res => console.log("특정 알람 읽음", res),
    }
  )
};

/**
 * 모든 알람을 읽음 처리
 * 
 */
export const useReadAllAlarms = (setIsModal: (is: boolean) => void) => {
  const { handleSuccess } = useHandleSuccess();
  const title = "모두 읽음 완료";
  return useMutation(
    ["alarm", "readAll"],
    () => AlarmAPI.readAllAlarms(),
    {
      onSuccess: (res) => {
        console.log("모든 알람 읽음", res)
        handleSuccess({ title, setIsModal });
      }
    }
  )
}