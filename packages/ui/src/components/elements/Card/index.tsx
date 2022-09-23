import { CardDepth1Main, CardDepth2Main } from "./CardMain";
import { CardDepth1TitleBar, CardDepth2TitleBar } from "./CardTitleBar";
import { CardDepth1Title, CardDepth2Title } from "./CardTitle";
import { CardDepth1Contents, CardDepth2Contents } from "./CardContents";
import { CardTitleButtons } from "./CardTitleButtons";
import { CardExpandButton } from "./CardExpandButton";

export const CardDepth1 = Object.assign(CardDepth1Main, {
  TitleBar: CardDepth1TitleBar,
  Title: CardDepth1Title,
  Contents: CardDepth1Contents,
  ExpandButton: CardExpandButton,
  TitleButtons: CardTitleButtons,
})

export const CardDepth2 = Object.assign(CardDepth2Main, {
  TitleBar: CardDepth2TitleBar,
  Title: CardDepth2Title,
  Contents: CardDepth2Contents,
  TitleButtons: CardTitleButtons,
})