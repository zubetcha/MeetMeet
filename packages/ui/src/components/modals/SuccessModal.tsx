import classNames from "classnames";
import classes from "./modals.module.scss";
import Image from "next/image";

import { Modal, SVG } from "../elements";
import DoneIcon from "../../assets/img/icon-done-40x40.png";
import Reseticon from "../../assets/img/icon-reset-40x40.png";
import { colors } from "../../shared/style";

// $TODO: 성공 모달 컴포넌트에 필요한 props

/**
 *
 * @param type 아이콘 타입 , value = "done" || "reset"
 * @param text 아이콘 아래에 들어가는 성공 알림 내용의 text
 * @returns
 */

interface SuccessModalProps {
  type: string;
  text: string;
  setIsOpen:(e:boolean)=>void;
}

export const SuccessModal = ({ type, text, setIsOpen }: SuccessModalProps) => {
  return (
    <>
      <Modal type="successModal" setIsOpen={setIsOpen}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}>
          <SVG name={type === "reset" ? "reset" : "done"} height="40" width="40" color={colors.primary500} />
        </div>
        <p className={classes.mainText}>{text}</p>
      </Modal>
    </>
  );
};
