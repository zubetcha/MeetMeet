import React from "react";
import classNames from "classnames";
import classes from "./modals.module.scss";
import { colors, fonts } from "../../shared/style";

import { Button, Modal, Text, SVG } from "../elements";


// $TODO: 실패 모달 컴포넌트에 필요한 props

/**
 *
 * @param text 어떤 게 실패했는지에 대한 알림 내용의 text
 * @param onClick 다시 시도하기 버튼 클릭 이벤트 함수
 * @returns
 */

interface FailureModalProps {
  text: string;
  onClick: (e: any) => void;
}

export const FailureModal = ({ text, onClick }: FailureModalProps) => {
  return (
    <>
      <Modal type="failureModal">
        <div style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "16px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }}>
          <SVG name="error" color={colors.dangerMedium} width={"40"} height={"40"} />
          </div>
          <p className={classes.mainText}>
            {text}
            <br />
            번거로우시겠지만, 다시 시도 부탁드립니다.
          </p>
          <p className={classes.subText}>
            혹시 문제가 계속된다면 젠틀에너지 고객지원팀에 문의바랍니다.
            <br />
            문제를 해결할 수 있도록 빠르게 도와드리겠습니다.
          </p>
          <p className={classes.subText}>고객지원팀: cs@gentleenergycorp.com</p>
        </div>
        <Button
          text="다시 시도하기"
          size="large"
          style="solid"
          width="100%"
          onClick={onClick}
        />
      </Modal>
    </>
  );
};
