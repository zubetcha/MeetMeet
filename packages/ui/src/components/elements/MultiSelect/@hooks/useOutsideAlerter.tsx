import React, { useEffect, useRef } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideAlerter = (handleFunction: any) => {
  const ref = useRef(null as any);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleFunction();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleFunction]);

  return {
    ref,
  };
};
