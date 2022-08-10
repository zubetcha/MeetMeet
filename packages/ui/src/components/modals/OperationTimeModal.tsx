import classes from "./modals.module.scss";

import { Modal, Button, HistoryChart } from "ui/src/pages";
import { HistoryChartProps } from "ui/src/types/ui.types";

interface OperationTimeModalProps {
  setDetailModal: (detailModal: boolean) => void;
  data: HistoryChartProps;
}

/**
 *
 * @param type (string) 차트 컨테이너 타입, value = "card" || "modal"
 * @param chartData (array) 차트를 그리는 데 사용되는 데이터
 * @param categories (array) 차트 레전드에 사용되는 데이터
 * @param startTime (number) 조회 기간 시작 날짜의 time
 * @param endTime (number) 조회 기간 종료 날짜의 time
 * @param handleConvertDiff 범위의 최대값
 * @param setDetailModal 상세 모달을 열고 닫는 setState 함수
 */

export const OperationTimeModal = ({
  setDetailModal,
  data
}: OperationTimeModalProps) => {
  
  return (
    <>
      <Modal type="operationTimeModal">
        <div className={classes.operationTimeModal_container}>
          <div>
            <p className={classes.title}>시간별 가동 상태</p>
            <p className={classes.equipmentName}>{data.equipmentName}</p>
            <HistoryChart data={data} />
          </div>
          <Button
            text="창닫기"
            size="large"
            style="solid"
            width="100%"
            onClick={() => setDetailModal(false)}
          />
        </div>
      </Modal>
    </>
  );
};
