import { useRef } from "react";
import { useEffect, useState } from "react";
import { selectedIndex } from "..";

interface Props {
  defaultIndex: selectedIndex;
  childrenLength: number;
  onChange: (e: any) => void;
}

export const useCellGroup = ({
  defaultIndex,
  childrenLength,
  onChange,
}: Props) => {
  const [selectedIndex, setSelectedIndex] =
    useState<selectedIndex>(defaultIndex);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [btnState, setBtnState] = useState<string[]>(
    Array.from({ length: childrenLength }, () => "default")
  );
  const [btnHoverState, setBtnHoverState] = useState<boolean[]>(
    Array.from({ length: childrenLength }, () => false)
  );

  useEffect(() => {
    setBtnState(Array.from({ length: childrenLength }, () => "default"));
    setBtnHoverState(Array.from({ length: childrenLength }, () => false));
  }, [childrenLength]);

  useEffect(() => {
    handleButtonState(selectedIndex);
    onChange(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    handleButtonHoverState(hoverIndex);
  }, [hoverIndex, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(defaultIndex);
  }, [defaultIndex]);

  const handleButtonState = (selectedIndex: selectedIndex) => {
    let newArray = [...btnState];
    if (typeof selectedIndex.start !== "number") {
      newArray.map((_, idx: number) => {
        newArray[idx] = "default";
      });
    } else if (typeof selectedIndex.end !== "number") {
      newArray.map((_, idx: number) => {
        idx === selectedIndex.start
          ? (newArray[idx] = "focused")
          : (newArray[idx] = "default");
      });
    } else {
      newArray.map((_, idx: number) => {
        if (
          typeof selectedIndex.start === "number" &&
          typeof selectedIndex.end === "number"
        ) {
          selectedIndex.start <= idx && idx <= selectedIndex.end
            ? (newArray[idx] = "focused")
            : (newArray[idx] = "default");
        }
      });
    }

    setBtnState(newArray);
  };

  const handleButtonHoverState = (hoverIndex: number) => {
    let newArray = [...btnHoverState];
    if (hoverIndex === -1) {
      newArray.map((_, idx: number) => {
        newArray[idx] = false;
      });
    } else if (typeof selectedIndex.start !== "number") {
      newArray.map((_, idx: number) => {
        idx === hoverIndex ? (newArray[idx] = true) : (newArray[idx] = false);
      });
    } else if (typeof selectedIndex.end !== "number") {
      if (selectedIndex.start > hoverIndex) {
        newArray.map((_, idx: number) => {
          idx === hoverIndex ? (newArray[idx] = true) : (newArray[idx] = false);
        });
      } else {
        newArray.map((_, idx: number) => {
          if (typeof selectedIndex.start === "number") {
            idx <= hoverIndex && idx >= selectedIndex.start
              ? (newArray[idx] = true)
              : (newArray[idx] = false);
          }
        });
      }
    } else {
      if (selectedIndex.start > hoverIndex) {
        newArray.map((_, idx: number) => {
          if (typeof selectedIndex.end === "number") {
            idx >= hoverIndex && idx <= selectedIndex.end
              ? (newArray[idx] = true)
              : (newArray[idx] = false);
          }
        });
      } else {
        newArray.map((_, idx: number) => {
          if (typeof selectedIndex.start === "number") {
            idx >= selectedIndex.start && idx <= hoverIndex
              ? (newArray[idx] = true)
              : (newArray[idx] = false);
          }
        });
      }
    }

    setBtnHoverState(newArray);
  };

  const onClick = (index: number) => {
    let _selectedIndex = { ...selectedIndex };

    if (typeof selectedIndex.start !== "number") {
      _selectedIndex.start = index;
      _selectedIndex.end = index;
    } else {
      if (selectedIndex.start > index || selectedIndex.end === index) {
        _selectedIndex.start = index;
      } else {
        _selectedIndex.end = index;
      }
    }

    setSelectedIndex(_selectedIndex);
  };

  const onMouseOver = (index: number) => {
    setHoverIndex(index);
  };

  const onMouseLeave = () => {
    setHoverIndex(-1);
  };

  return {
    btnState,
    btnHoverState,
    onClick,
    onMouseOver,
    onMouseLeave,
  };
};
