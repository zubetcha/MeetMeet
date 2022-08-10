import { Dispatch, SetStateAction } from "react";

export type valueType = {
  id: string | number;
  name: string;
};
export interface SelectProps {
  width: number;
  children: JSX.Element[];
  values: valueType[];
  selectedId: number | undefined;
  setSelectedId: Dispatch<SetStateAction<any>>;
  isSearch?: boolean;
  state?: "disable" | "default" | "danger";
  isFocusOnSelected?: boolean;
  label?: string;
  input?: {
    placeholder?: string;
  };
  button?: {
    style?: string;
    placeholder?: string;
    textWidth?: string;
    helperText?: string;
    size?: string;
    margin?: string;
    height?: string;
  };
  onClickItem?: (id: any) => void;
}
