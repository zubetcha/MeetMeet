import React from "react";

interface Props {
  style: any;
  children: JSX.Element;
}

export const RadioLabel = ({ style, children }: Props) => {
  return <span style={{ ...style }}>{children}</span>;
};
