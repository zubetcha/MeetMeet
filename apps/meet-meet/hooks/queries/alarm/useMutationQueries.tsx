import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { AlarmAPI } from "@api/api";
import { DeviceInfo } from "./alarm.types";

export const useSendDeviceInfo = () => {
  return useMutation(
    ["send", "deviceInfo"],
    (deviceInfo: DeviceInfo) => AlarmAPI.sendDeviceInfo(deviceInfo)
  );
}