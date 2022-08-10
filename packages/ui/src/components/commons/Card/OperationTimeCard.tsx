import { useState } from "react";
import classes from "./card.module.scss";

import { Text, Button, HistoryChart, OperationTimeModal, SVG } from "ui/src/pages";
import { OperationTimeCardProps } from "../../../types/ui.types";
import { formatDateHour } from "../../../utils";
import { colors } from "../../../shared/style";

/**
 *
 * @param chartData (array) 차트를 그리는 데 사용되는 데이터
 * @param categories (array) 차트 레전드에 사용되는 데이터
 * @param startTime (number) 조회 기간 시작 날짜의 time
 * @param endTime (number) 조회 기간 종료 날짜의 time
 * @param handleConvertDiff 범위의 최대값
 */

export const OperationTimeCard = ({
  chartData,
  categories,
  startTime,
  endTime,
  handleConvertDiff,
  equipmentName, 
  btwHours,
  timeStampList
}: OperationTimeCardProps) => {
  const [detailModal, setDetailModal] = useState<boolean>(false);

  const data = {
    chartData,
    categories,
    startTime,
    endTime,
    handleConvertDiff,
    equipmentName,
    btwHours,
    timeStampList
  };


  return (
    <>
      <div className={classes.operationTimeCard_container}>
        <div className={classes.header}>
          <Text text="시간별 가동 상태" type="header5" weight="regular" />
          <Button
            text="자세히 보기"
            size="small"
            style="line"
            icon={<SVG name="search" width="16" height="16" color={colors.primary500} />}
            iconLocation="left"
            onClick={() => setDetailModal(true)}
          />
        </div>
        <div className={classes.body}>
          <HistoryChart
            data={{
              type: "card",
              ...data,
            }}
          />
        </div>
      </div>
      {detailModal && (
        <OperationTimeModal
          data={{
            type: "modal",
            ...data,
          }}
          setDetailModal={setDetailModal}
        />
      )}
    </>
  );
};
