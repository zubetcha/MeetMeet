import { useState, useEffect, useMemo } from "react";

export const useWindowSize = () => {
  const [screenSize, getDimension] = useState({
    dynamicWidth: 0,
    dynamicHeight: 0,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window?.innerWidth,
      dynamicHeight: window?.innerHeight
    })
  }
  
  useEffect(() => {
    if (window) {
      window.addEventListener('resize', setDimension);
      
      return(() => {
          window.removeEventListener('resize', setDimension);
      })
    }
  }, [screenSize])

  useEffect(() => {
    if (window) {
      setDimension();
    }
  }, [])

  return screenSize;
}