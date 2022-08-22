import { Children, isValidElement, ReactNode } from "react";

export const getCardTitleContents = (children: ReactNode, type: any) => {
  const childrenArray = Children.toArray(children);
  const cardContents = childrenArray.filter((child) => isValidElement(child) && child.type === type);

  return cardContents;
}

export const getComponentType = (component: JSX.Element) => {
  return (component).type;
}