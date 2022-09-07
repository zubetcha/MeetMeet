import React from "react";

import { Modal } from "./Dialog";
import { Text } from "./Text/Text";
import { SVG } from "./SVG/SVG";
import { colors } from "../../shared/style";

interface AlertProps {
  type: string;
  isShow: boolean;
  bodyText: string;
}

export function Alert({ type, isShow, bodyText }: AlertProps) {
  const showIcon = (type: string) => {
    switch (type) {
      case "check":
        return (
          <SVG
            name={type}
            width="40"
            height="40"
            color={colors.primary500}
          ></SVG>
        );
      case "done":
        return(
          <SVG
            name={type}
            width="40"
            height="40"
            color={colors.primary500}
          ></SVG>
        )
      default:
        return;
    }
  };
  return (
    <>
      {isShow && (
        <Modal>
          <div style={{ textAlign:"center" }}>{showIcon(type)}</div>
          <Text
            text={bodyText}
            type="body1"
            weight="700"
          ></Text>
        </Modal>
      )}
    </>
  );
}
