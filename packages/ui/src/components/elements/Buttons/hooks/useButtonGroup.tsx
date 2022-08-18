import React, { useState, useEffect } from "react";

interface Props {
  defaultIndex: number;
  childrenLength: number;
  onChange: (e: any) => void;
}

export default function useButtonGroup({
  defaultIndex,
  childrenLength,
  onChange,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [btnState, setBtnState] = useState<string[]>(
    Array.from({ length: childrenLength }, () => "hover")
  );

  useEffect(() => {
    handleButtonState(selectedIndex);
    onChange(selectedIndex);
  }, [selectedIndex]);

  const handleButtonState = (selectedIndex: number) => {
    let newArray = [...btnState];
    newArray.map((_, idx: number) => {
      idx === selectedIndex
        ? (newArray[idx] = "focused")
        : (newArray[idx] = "hover");
    });
    setBtnState(newArray);
  };

  const onClick = (index: any) => {
    setSelectedIndex(index);
  };

  return {
    btnState,
    onClick,
  };
}
