import { colors } from "../shared/style";

export const color =[
    '#116D38',
    '#FFC600',
    '#F25341',
    '#00D9AF',
    '#A0C5AF',
    '#FFE58D',
    '#FF9F8B',
    '#80ECD7',
]

// 데이터 자리수 관련 상수 (어드민에서 사용)
export const MACADDRESS_MAX_LENGTH = 12;

// DESCRIBE: 센서별 범례 색상
export const sensorColors: { [type: string]: string } = {
  CU: colors.primary900,
  VB: colors.primary800,
  HT: colors.primary700,
  LT: colors.primary600,
  CT: colors.primary500,
  SC: colors.primary400,
  US: colors.primary300,
  TL: colors.primary200,
  HS: colors.primary100,
  NH: colors.secondary900,
  TV: colors.secondary800,
  TH: colors.secondary700,
  TP: colors.secondary600,
  VO: colors.secondary500,
  RF: colors.secondary400,
  FT: colors.secondary300,
  MT: colors.secondary200,
  PX: colors.secondary100,
}

export const sensorColor = [
  colors.primary200,
  colors.primary300,
  colors.primary400,
  colors.primary500,
  colors.primary600,
  colors.gray200,
]

// DESCRIBE: 센서 타입 한국어
export const koreanSensorType: { [type: string]: string } = {
  CU: "전류",
  VB: "진동",
  HT: "열",
  LT: "빛",
  CT: "카운팅",
  SC: "전자 저울",
  US: "초음파",
  TL: "경광등",
  HS: "황화수소 가스 검출",
  NH: "암모니아 가스 검출",
  TV: "TVOC 가스 검출 (공기질)",
  TH: "온/습도",
  TP: "정밀온도 (고온 표면 측정)",
  RF: "RFID",
  FT: "발판 스위치",
  MT: "모션",
  PX: "근접",
  VO: "전압",
}