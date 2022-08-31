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
  userInfo: UserInfoType;
  setMyPageModal: Dispatch<SetStateAction<Boolean>>;
  clickLogout?: () => void;
}

export interface NavMenuProps {
  page: pageInfo;
  key: number;
  customer: string;
}

export interface TextProps {
  text: string;
  size?: string;
  color?: string;
  weight?: string;
  type?: string;
  cursor?: string;
}

export interface pageInfo {
  path: string;
  title: string;
}

export interface InquiryLayoutProps {
  timePicker?: boolean;
  workingHour?: boolean;
  equipmentType?: boolean;
  equipmentTypeData?: string;
  workingHourData?: string;
  setWorkingHour?: React.Dispatch<React.SetStateAction<string>>;
  setDate?: React.Dispatch<React.SetStateAction<DateType>>;
  date: DateType;
}

export interface DateType {
  startDate: Date;
  endDate: Date;
}

export interface WorkingHourProps {
  workingHourData: string | undefined;
  // setHour:React.Dispatch<React.SetStateAction<string>>
}

export interface ButtonProps {
  size?: string;
  style?: string;
  text?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  state?: string;
  justifyContent?: string;
  isLoading?: boolean;
  icon?: boolean;
  iconImg?: any;
  iconWidth?: string;
  iconHeight?: string;
  id?: string;
}

export interface ExitToBurgerProps {
  length?: string;
  close?: boolean;
  setClose?: any;
}

export interface CalendarProps {
  date: Date;
  onClickDate: (value: Date) => void;
  start: Date;
  end: Date;
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
}

export interface TimePickerProps {
  start?: Date;
  end?: Date;
  // setDate:React.Dispatch<React.SetStateAction<DateType>>
}

export interface EquipmentTypeProps {
  equipmentTypeData: string | undefined;
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

export interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  helperText?: string;
  focused?: boolean;
  textInput?: boolean;
  status: string;
  size: string;
  icon?: boolean;
  iconPaths?: {
    default: string;
    active: string;
    focused: string;
  };
  children: JSX.Element;
  width?: string;
  borderRadius?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
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

export interface SensorDataType {
  sensorName: string;
  sensorType: string;
  label: string[];
  data: number[];
}

export interface SensorDataTypePov {
  sensorName: string;
  sensorType: string;
  label: string[];
  data: number[][];
  btwHours: string[][];
  sensorId: string;
}

export interface AccountFormType {
  customerId: number;
  username?: string;
  password?: string;
  name: string;
  department: null;
  email: string;
  phone: string;
  isManager: boolean;
  authorityId: number;
}
