import { StringNullableChain } from "lodash";
import React, { SetStateAction, Dispatch } from "react";
export interface customerPageInfo {
  element: {
    customer: string;
    pages: pageInfo[];
  }[];
}

export interface navBarProps {
  close: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  clickLogout?: (e: any) => void;
  customerInfo: {
    customer: {
      path: string;
      title: string;
    };
    pages: {
      path: string;
      title: string;
    }[];
  };
  shouldLogin: boolean;
  userInfo?: UserInfoType;
  setMyPageModal: Dispatch<SetStateAction<Boolean>>;
}

export interface NavMenuProps {
  page: pageInfo;
  key: number;
  customer: string;
}

export interface pageInfo {
  path: string;
  title: string;
}

interface workingRotationType{
  currentRation:number;
  rotationList: any;
  
}
export interface InquiryLayoutProps {
  timePicker?: boolean;
  workingHour?: boolean;
  equipmentType?: boolean;
  operatingStatusType?: boolean;
  equipmentTypeData?: string;
  workingHourData?: number;
  workingRotationData?: workingRotationType;
  mainStatus?: string;
  setWorkingHour?: React.Dispatch<React.SetStateAction<string>>;
  setDate?: React.Dispatch<React.SetStateAction<DateType>>;
  date: DateType;
  startTime:number
}

export interface DateType {
  startDate: Date;
  endDate: Date;
}

export interface WorkingHourProps {
  workingHourData: number | undefined;
  workingHourSelectedId: string;
  workingRotationData?: workingRotationType;
  // setHour:React.Dispatch<React.SetStateAction<string>>
}

export interface OperatingStatusTypeProps {
  mainStatus: string;
  mainStatusSelectedId: string;
  onlyMain: boolean;
}

export interface ButtonProps {
  size?: string;
  style?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text?: string;
  textWidth?: string;
  width?: string | number;
  height?: string;
  color?: string;
  borderRadius?: string;
  border?: boolean;
  onClick?: (e: React.MouseEvent<any>) => void;
  onHover?: (state:any) => void;  
  state?: string;
  justifyContent?: string;
  isLoading?: boolean;
  icon?: any;
  iconLocation?: string;
  id?: string;
  last?: boolean;
  padding?: string;
}

export interface ExitToBurgerProps {
  length?: string;
  isClose?: boolean;
  setClose?: any;
}

export interface CalendarProps {
  date: Date;
  onClickDate: (value: Date) => void;
  start: Date;
  end: Date;
  hoverDates: Date[];
  onMouseOverDate: (value: Date) => void;
  onMouseLeaveDate: () => void;
  btwDates?:DateType;
  startTime?:number
}

export interface MultipleCalendarsProps {
  date: Date;
  start: Date;
  end: Date;
  setCalendar: Dispatch<SetStateAction<boolean>>;
  onClickSubmitBtn?: (startDate: Date, endDate: Date) => void;
  startTime?:number
}

export interface DatesProps {
  dateInfo: {
    condition: string;
    weekend: string;
    date: number;
    value: Date;
  };
  onClickDate: (value: Date) => void;
  btwDates: boolean;
  startDate: boolean;
  endDate: boolean;
  hoverDate: boolean;
  onMouseOverDate: (value: Date) => void;
  onMouseLeaveDate: () => void;
  availableDates?: DateType
  startHourMinutes?:number
}

export interface TimePickerProps {
  start?: Date;
  end?: Date;
  startTime:number
  // setDate:React.Dispatch<React.SetStateAction<DateType>>
}

export interface EquipmentTypeProps {
  equipmentTypeData: string | undefined;
  equipTypeSelectedId: string;
  // setEquipType?: any;
}

export interface OperationAvgBoxProps {
  selected_data: selected_dataTypes;
  equipmentSize: string;
  current_depth: string;
}

export interface EquipOperationBoxProps {
  selected_data: selected_dataTypes;
  equipmentSize: string;
}

export interface EquipProductionBoxProps {
  selected_data: selected_dataTypes;
  equipmentSize: string;
}

export interface selected_dataTypes {
  id: number;
  name: string;
  infoBySize: any;
}

export interface ComponentDepthFilterProps {
  component_depth: string;
  current_depth: string;
}

export interface ComponentDepthBoxProps {
  data: any;
  equipmentSize: string;
  current_depth: string;
  component_depth: string;
}

export interface MyPageModalProps {
  userInfo: UserInfoType;
  setMyPageModal: (myPageModal: boolean) => void;
  setPasswordChangeModal: (PasswordChangeModal: boolean) => void;
}

export type UserInfoType = {
  accountId: number;
  department: string;
  email: string;
  isGEC: boolean;
  isInitialPassword: boolean;
  isLogin: boolean;
  isSuper: boolean;
  name: string;
  type: string;
  phone: string;
  username: string;
};

export interface OperationTimeCardProps {
  chartData: HistoryChartDataType[];
  categories: string[];
  startTime: number;
  endTime: number;
  handleConvertDiff: (duration: number) => string | undefined;
  equipmentName:string;
  btwHours:any[];
  timeStampList:{
    startTimestampList : string [];
    stopTimestampList : string[];
  }
}
export interface HistoryChartProps extends OperationTimeCardProps {
  type: string;
}

export interface HistoryChartDataType {
  name: string;
  value: number[];
  itemStyle: {
    normal: {
      color: string;
    };
  };
}
[];
