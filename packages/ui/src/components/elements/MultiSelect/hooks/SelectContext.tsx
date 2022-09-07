import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { SelectItemType } from "../types/select.types";

export const SelectContext = createContext({
  // 현재 Option 요소들의 상태 (id, name, checked 로 이루어져 있음)
  values: [] as SelectItemType[] | undefined,
  // 선택 완료 버튼을 클릭해, onChange 함수로 넘겨줄 상태값
  confirmedValues:[] as SelectItemType[] | undefined,
  // 검색 결과에 일치하는 Option 요소들 
  searchResult: [] as SelectItemType[] | undefined,
  // 초기 checked 되어있는 Option 의 name 리스트
  defaultValues: undefined as string[] | undefined,
  // 현재 드롭다운 열려있는지/ 닫혀있는지 상태값
  isOpen: false,
  // 현재 선택되어 있는 요소들 개수 
  currentSelectedNumber: 0,
  // onChagne 함수로 넘겨줄 상태값 setState 함수
  setValues: (e: SelectItemType) => {},
  // searchResult setState 함수
  setSearchResult: (e: SelectItemType[] | undefined) => {},
  // isOpen setState 함수
  setIsOpen: (e: boolean) => {},
  // values 체크 상태 UPDATE dispatch 함수
  setCheckedItem: (id: string, checked: boolean) => {},
  // values 전체 선택 CHECKED_ALL dispatch 함수
  onClickCheckedAll: () => {},
  // value 전체 해제 UNCHECKED_ALL dispatch 함수
  onClickUncheckedAll: () => {},
  // confirmedValues 반영 함수 (선택 완료)
  onClickConfirm : ()=> {},
  // confirmedValues 이전 상태로 초기화하는 함수 (창 닫기, 외부 클릭)
  onClickCancel: ()=>{},
  firstRender: false,
});

export const useSelect = () => {
  const context = React.useContext(SelectContext);

  if (context === undefined) {
    throw new Error("useSelect must be used within a <MultiSelect />");
  }
  return context;
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      const stateIdList = state.map((item: any) => item.id);
      if (stateIdList.includes(action.value.id)) return [...state];
      return [...state, action.value];
    case "INITIALIZE":
      return [...action.value];
    case "UPDATE": {
      const { id, checked } = action.value;
      let newState: any[] = [];
      state.map((item: any) => {
        const newItem = {
          id: item.id,
          name: item.name,
          checked: id === item.id ? checked : item.checked,
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
        if (value.includes(item.id)) {
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
        if (value.includes(item.id)) {
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
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  children: React.ReactElement[] | React.ReactElement | any;
}

export const SelectProvider = ({
  setValue,
  defaultValues,
  isOpen,
  setIsOpen,
  children,
}: SelectProps) => {
  const [confirmedState, setConfirmedState]=useState<any[] | undefined>();
  const [state, dispatch] = useReducer(reducer, []);
  const [selected, setSelected] = useState<any[]>([]);
  const [currentSelectedNumber, setCurrentSelectedNumber] = useState(0);
  const [searchResult, setSearchResult] = useState<SelectItemType[]>();
  const firstRender = useRef(true);

  useEffect(() => {
    if (selected) {
      setValue(selected);
    }
  }, [selected]);

  useEffect(() => {
    if(!confirmedState) return;
    const selectedItems = confirmedState.filter((item: any) => item.checked);
    setSelected(selectedItems);
  }, [confirmedState]);

  useEffect(()=>{
    if(!state) return; 
    const currentSelectedItemNumers = state.filter((item:any)=>item.checked).length;
    setCurrentSelectedNumber(currentSelectedItemNumers);
  },[state])

  useEffect(()=>{
    if(state.length>0 && defaultValues && !confirmedState){
      setConfirmedState(state);
    }
  },[state, defaultValues, confirmedState])

  useEffect(()=>{
    console.log("confirmedState", confirmedState);
  },[confirmedState]);

  return (
    <>
      <SelectContext.Provider
        value={{
          values: state,
          confirmedValues: confirmedState,
          searchResult: searchResult,
          isOpen: isOpen,
          defaultValues: defaultValues,
          currentSelectedNumber: currentSelectedNumber,
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
          setCheckedItem: (id: string, checked: boolean) => {
            dispatch({
              type: "UPDATE",
              value: { id: id, checked: checked },
            });
          },
          onClickCheckedAll: () => {
            if (searchResult && searchResult?.length > 0) {
              dispatch({
                type: "CHECKED_SEARCH_ALL",
                value: searchResult.map((item: any) => item.id),
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
                value: searchResult.map((item: any) => item.id),
              });
              return;
            }
            dispatch({
              type: "UNCHECKED_ALL",
            });
          },
          firstRender: firstRender.current,
          onClickConfirm: ()=>{
            setConfirmedState(state)
            setIsOpen(false)
          },
          onClickCancel : ()=>{
            dispatch({
              type:"INITIALIZE",
              value:confirmedState
            })
            setIsOpen(false)
          },
        }}
      >
        {children}
      </SelectContext.Provider>
    </>
  );
};
