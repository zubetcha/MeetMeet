import React from "react";

interface Props {
  style?: any;
  children: JSX.Element;
}

export const CheckboxLabel = ({ style, children }: Props) => {
  return <div style={{ ...style }}>{children}</div>;
};
