import { createPortal } from "react-dom"

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const ModalPortal = ({ children }: Props) => {
  const modalElement = document.querySelector("#__next");
  return createPortal(children, modalElement!);
}
