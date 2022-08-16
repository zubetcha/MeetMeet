import React from "react";
import { TextProps } from "../../../types/ui.types";
import { colors, fonts, texts } from "../../../shared/style";

/**
 *
 * @param text text = 컴포넌트에 들어가는 text
 * @param type value = header | body | caption
 * @param color value from color 모듈s
 * @param weight defaultValue = regular
 * @param cursor defaultValue = default
 * @param height defaultValue = fit-content
 * @returns
 */

// global title 컴포넌트
export const Text = ({
  text,
  type = "body1",
  color = "darkHigh",
  weight = "regular",
  cursor = "default",
  height = "fit-content",
}: TextProps) => {
  return (
    <div
      style={{
        fontSize: texts.size[type],
        lineHeight: texts.lineHeight[type],
        color: colors[color],
        fontWeight: weight,
        cursor: cursor,
        height: height,
      }}
    >
      {text}
    </div>
  );
};
