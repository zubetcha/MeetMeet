import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { SelectItemType } from "../@types/select.types";

export const MultiSelectContext = createContext({
  // 현재 Option 요소들의 상태 (id, name, checked 로 이루어져 있음)
  values: [] as SelectItemType[] | undefined,
  // 선택 완료 버튼을 클릭해, onChange 함수로 넘겨줄 상태값
  confirmedValues: [] as SelectItemType[] | undefined,
  // 검색 결과에 일치하는 Option 요소들
  searchResult: [] as SelectItemType[] | undefined,
  // 초기 checked 되어있는 Option 의 name 리스트
  defaultValues: undefined as string[] | undefined,
  // 현재 드롭다운 열려있는지/ 닫혀있는지 상태값
  isOpen: false,
  // 현재 선택되어 있는 요소들 개수
  currentSelectedNumber: 0,
  // 처음에 다 선택되어 있는 상태로 시작하는지
  defaultCheckedAll: false,
  // TriggerButton TextField Label
  label: "" as string | undefined,
  // onChagne 함수로 넘겨줄 상태값 setState 함수
  setValues: (e: SelectItemType) => {},
  // searchResult setState 함수
  setSearchResult: (e: SelectItemType[] | undefined) => {},
  // isOpen setState 함수
  setIsOpen: (e: boolean) => {},
  // values 체크 상태 UPDATE dispatch 함수
  setCheckedItem: (name: string, checked: boolean) => {},
  // values 전체 선택 CHECKED_ALL dispatch 함수
  onClickCheckedAll: () => {},
  // value 전체 해제 UNCHECKED_ALL dispatch 함수
  onClickUncheckedAll: () => {},
  // confirmedValues 반영 함수 (선택 완료)
  onClickConfirm: () => {},
  // confirmedValues 이전 상태로 초기화하는 함수 (창 닫기, 외부 클릭)
  onClickCancel: () => {},
  firstRender: false,
});

export const useMultiSelect = () => {
  const context = React.useContext(MultiSelectContext);

  if (context === undefined) {
    throw new Error("useMultiSelect must be used within a <MultiSelect />");
  }
  return context;
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      const stateNameList = state.map((item: any) => item.name);
      if (stateNameList.includes(action.value.name)) return [...state];
      return [...state, action.value];
    case "INITIALIZE":
      return [...action.value];
    case "UPDATE": {
      const { name, checked } = action.value;
      let newState: any[] = [];
      state.map((item: any) => {
        const newItem = {
          id: item.id,
          name: item.name,
          checked: name === item.name ? checked : item.checked,
        };
        newState.push(newItem);
      });
      return [...newState];
    }
    case "CHECKED_ALL": {
      let newState: any[] = [];
      state.map((item: any) => {
        const newItem = {
          id: item.id,
          name: item.name,
          checked: true,
        };
        newState.push(newItem);
      });
      return [...newState];
    }
    case "UNCHECKED_ALL": {
      let newState: any[] = [];
      state.map((item: any) => {
        const newItem = {
          id: item.id,
          name: item.name,
          checked: false,
        };
        newState.push(newItem);
      });
      return [...newState];
    }
    case "CHECKED_SEARCH_ALL": {
      let newState: any[] = [];
      const { value } = action;

      state.map((item: any) => {
        let newItem = item;
        if (value.includes(item.name)) {
          newItem = {
            id: item.id,
            name: item.name,
            checked: true,
          };
        }
        newState.push(newItem);
      });
      return [...newState];
    }
    case "UNCHECKED_SEARCH_ALL": {
      let newState: any[] = [];
      const { value } = action;

      state.map((item: any) => {
        let newItem = item;
        if (value.includes(item.name)) {
          newItem = {
            id: item.id,
            name: item.name,
            checked: false,
          };
        }
        newState.push(newItem);
      });
      return [...newState];
    }
    default:
      return state;
  }
}

interface SelectProps {
  setValue: (e: any) => void;
  defaultValues?: string[];
  label?: string;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  children: React.ReactElement[] | React.ReactElement | any;
  defaultCheckedAll: boolean;
}

export const MultiSelectProvider = ({
  setValue,
  defaultValues,
  label,
  isOpen,
  setIsOpen,
  children,
  defaultCheckedAll,
}: SelectProps) => {
  const [confirmedState, setConfirmedState] = useState<any[] | undefined>();
  const [state, dispatch] = useReducer(reducer, []);
  const [selected, setSelected] = useState<any[]>([]);
  const [currentSelectedNumber, setCurrentSelectedNumber] = useState(0);
  const [searchResult, setSearchResult] = useState<SelectItemType[]>();
  const firstRender = useRef(true);

  // DESCRIBE: 상위 컴포넌트 (MultiSelectMain) 으로 선택된 요소들 올려주는 로직
  useEffect(() => {
    if (selected) {
      setValue(selected);
    }
  }, [selected]);

  // DESCRIBE: 선택 완료 버튼을 눌렀을 때, 새로 선택한 요소들 반영하는 로직
  useEffect(() => {
    if (!confirmedState) return;
    const selectedItems = confirmedState.filter((item: any) => item.checked);
    setSelected(selectedItems);
  }, [confirmedState]);

  // DESCRIBE: 현재 선택된 요소들의 개수 {currentSelectedNumber}개 선택하는 로직
  useEffect(() => {
    if (!state) return;
    const currentSelectedItemNumers = state.filter(
      (item: any) => item.checked
    ).length;
    setCurrentSelectedNumber(currentSelectedItemNumers);
  }, [state]);

  // DESCRIBE: 초기 렌더링 시 (confirmedState undefined 일 때) 초기화 시켜주는 로직 (가장 제일 먼저 동작합니다.)
  useEffect(() => {
    if (state.length > 0 && !confirmedState) {
      setConfirmedState(state);
    }
  }, [state, confirmedState]);

  return (
    <>
      <MultiSelectContext.Provider
        value={{
          values: state,
          confirmedValues: confirmedState,
          searchResult: searchResult,
          label: label,
          isOpen: isOpen,
          defaultValues: defaultValues,
          currentSelectedNumber: currentSelectedNumber,
          defaultCheckedAll: defaultCheckedAll,
          setValues: (value: any) => {
            dispatch({
              type: "ADD",
              value: value,
            });
            firstRender.current = false;
          },
          setSearchResult: (e: SelectItemType[] | undefined) =>
            setSearchResult(e),
          setIsOpen: setIsOpen,
          setCheckedItem: (name: string, checked: boolean) => {
            console.log(name, checked);
            dispatch({
              type: "UPDATE",
              value: { name: name, checked: checked },
            });
          },
          onClickCheckedAll: () => {
            if (searchResult && searchResult?.length > 0) {
              dispatch({
                type: "CHECKED_SEARCH_ALL",
                value: searchResult.map((item: any) => item.name),
              });
              return;
            }
            dispatch({
              type: "CHECKED_ALL",
            });
          },
          onClickUncheckedAll: () => {
            if (searchResult && searchResult?.length > 0) {
              dispatch({
                type: "UNCHECKED_SEARCH_ALL",
                value: searchResult.map((item: any) => item.name),
              });
              return;
            }
            dispatch({
              type: "UNCHECKED_ALL",
            });
          },
          firstRender: firstRender.current,
          onClickConfirm: () => {
            setConfirmedState(state);
            setIsOpen(false);
          },
          onClickCancel: () => {
            dispatch({
              type: "INITIALIZE",
              value: confirmedState || [],
            });
            setIsOpen(false);
          },
        }}
      >
        {children}
      </MultiSelectContext.Provider>
    </>
  );
};
