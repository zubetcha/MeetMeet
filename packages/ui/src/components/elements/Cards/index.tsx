import { CardDepth1Main } from "./CardDepth1Main";
import { CardDepth2Main } from "./CardDepth2Main";
import { CardTitleBar } from "./CardTitleBar";
import { CardTitle } from "./CardTitle";
import { CardContents } from "./CardContents";
import { CardExpandButton } from "./CardExpandButton";

export const CardDepth1 = Object.assign(CardDepth1Main, {
  TitleBar: CardTitleBar,
  Title: CardTitle,
  Contents: CardContents,
  ExpandButton: CardExpandButton
})

export const CardDepth2 = Object.assign(CardDepth2Main, {
  TitleBar: CardTitleBar,
  Title: CardTitle,
  Contents: CardContents,
})