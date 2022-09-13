import React from "react";

interface Props {
  isShow: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 *
 * @param isShow (booelan) 필터링 리셋 버튼 보여줄지 여부
 * @param onClick (function) 버튼 클릭 이벤트 함수
 * @returns
 */
export function ResetFilteringButton({ isShow, onClick }: Props) {
  return <>{isShow && <button onClick={onClick}>Reset Filter</button>}</>;
}
