import React, { useRef } from "react"

export const usePullToRefresh = () => {
  const touchRef = useRef<HTMLElement | null>(null);
  const loadingRef = useRef<HTMLElement | null>(null);
  const touchStartY = useRef(0);
  const loadingRefHeight = useRef(0);
  const handleRefresh = useRef(() => {});

  // 로딩 요소의 최대 높이
  // (터치가 끝났을 때 이 높이보다 높으면 새로고침 함수를 실행)
  const MAX_HEIGHT = 60;

  function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
    if (!touchRef.current) return;
    if (touchRef.current.scrollTop !== 0) return;
    touchStartY.current = e.changedTouches[0].screenY;
    const el = document.createElement('touchRef');
    el.classList.add('loadingRef-element'); // 스타일을 지정해주자.
    touchRef.current?.prepend(el); // 스크롤되는 요소의 최상단에 추가해준다.
    loadingRef.current = el;
  }
  function handleTouchMove(e: React.TouchEvent<HTMLElement>) {
    // 만약 로딩 요소가 생성되었다면
    if (loadingRef.current) {
      const screenY = e.changedTouches[0].screenY;
      const height = Math.floor((screenY - touchStartY.current) * 0.3);
      // height 가 0 보다 크다면
      if (height >= 0) {
        loadingRef.current.style.height = `${height}px`;
        loadingRefHeight.current = height;
      }
    }
  }
  function handleTouchEnd() {
    // 로딩 요소의 높이가 MAX_HEIGHT 보다 크다면
    if (loadingRef.current && loadingRefHeight.current >= MAX_HEIGHT) {
      // 새로고침 함수를 실행한다.
      handleRefresh.current();
      touchRef.current?.removeChild(loadingRef.current); // 로딩 요소를 제거
      loadingRef.current = null;
      loadingRefHeight.current = 0;
      touchStartY.current = 0;
    }
  }

  return {
    touchRef,
    loadingRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}
