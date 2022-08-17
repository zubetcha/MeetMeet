import { DialogMain } from "./DialogMain";
import { DialogButtons } from "./DialogButtons";
import { DialogContent } from "./DialogContent";
import { DialogIcon } from "./DialogIcon";
import { DialogTitle } from "./DialogTitle";

export const Dialog = Object.assign(DialogMain, {
  Icon: DialogIcon,
  Title: DialogTitle,
  Content: DialogContent,
  Buttons: DialogButtons
})