import { ModalMain } from "./ModalMain";
import { ModalIcon } from "./ModalIcon";
import { ModalTitle } from "./ModalTitle";
import { ModalDescription } from "./ModalDescription";
import { ModalButtons } from "./ModalButtons";
import { ModalContents } from "./ModalContents";

export const Modal = Object.assign(ModalMain, {
  Icon: ModalIcon,
  Title: ModalTitle,
  Description: ModalDescription,
  Contents: ModalContents,
  Buttons: ModalButtons,
})