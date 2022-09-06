 import { Children, isValidElement, ReactNode, cloneElement } from "react";

export const getCardTitleContents = (children: ReactNode, type: string) => {
  const childrenArray = Children.toArray(children).map((child: any) => cloneElement(child));
  const cardTitleContents = childrenArray.filter((child: any) => isValidElement(child) && child.type.name === type);

  return cardTitleContents
}
