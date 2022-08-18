import { DialogMain } from "./ModalMain";
import { DialogIcon } from "./ModalIcon";
import { DialogTitle } from "./ModalTitle";
import { DialogDescription } from "./ModalDescription";

export const Dialog = Object.assign(DialogMain, {
  Icon: DialogIcon,
  Title: DialogTitle,
  Description: DialogDescription,
})