import { Children, cloneElement, useState } from "react";
import classes from "./TextField.module.scss";
import { TextFieldStatusUnion } from "./TextField.types";

export const TextFieldMain = ({ children, status, name }: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <div className={classes["wrapper"]}>
        {Children.toArray(children).map((child: any, i) => {
          return cloneElement(child, {
              key: `textField-child-${i}`,
              isFocused,
              setIsFocused,
              status,
              name,
            });
        })}
      </div>
    </>
  );
};

interface Props {
  children: any;
  status: TextFieldStatusUnion;
  name: string;
}
