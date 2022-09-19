import { Children, isValidElement, ReactNode, cloneElement, ReactElement } from "react";

export const getCardTitleContents = (children: ReactNode, type: string) => {
  const childrenArray = Children.toArray(children).map((child: any) => cloneElement(child));
  const cardTitleContents = childrenArray.filter((child) => {
    return isValidElement(child) && ((child.type as any).name === type || (child.type as any).displayName === type)
  });

  return cardTitleContents
}
