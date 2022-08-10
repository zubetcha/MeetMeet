import React, { useState, useEffect, useCallback, useRef } from "react";

import classes from "./table.module.scss";
import classNames from "classnames";
import { MultiSelect, MultiOption, SVG } from "../../elements";
import useResizeHook from '../../../hooks/useResizeHook';
interface ThProps {
  rowSpan?: number;
  colSpan?: number;
  scope?: string;
  children?: JSX.Element[] | JSX.Element;
  width? :number;
  isFirst?: boolean;
  isLast?: boolean;
  isCheckbox?:boolean;
  textAlign? : string;
  sortState?:any;
  setSortState?:(e:any)=>void;
  filterState?: any;
  setFilterState?: (e:any)=>void;
  filteredList? : any[];
  setFilteredList? : (filteredColumen:any)=>void;
  field?: string;
  type?:string;
  data? : any[];
  isFilter?:boolean;
  initialFilterState?:any;
  initialData?:any;
}

export default function Th({
  rowSpan, 
  colSpan, 
  scope, 
  children, 
  width, 
  isFirst,
  isLast,
  isCheckbox, 
  textAlign='left', 
  sortState, 
  setSortState, 
  filterState,
  setFilterState,
  filteredList,
  setFilteredList,
  field, 
  type,
  data,
  isFilter=true,
  initialFilterState,
  initialData
}: ThProps) {
    // 필터 관련된 state
    const [dropdownItems, setDropdownItems] = useState<any[]>([]);
    const [isShowFilter, setIsShowFilter]=useState(false);
    const [selected, setSelected]=useState<any[]>();
    // 정렬 관련된 State 
    const [sortBy, setSortBy] = useState("none");
    // 버튼 show 관련 state
    const [isShowIcon, setIsShowIcon]=useState(false);
    // 정렬 걸려있는지 유무 
    const [isSort, setIsSort]=useState(false);
    // 필터 걸려있는지 유무
    const [isFiltered, setIsFiltered]=useState({state:false});
    const [initialSelectData, setInitialSelectData]=useState(initialData);

    const wrapperRef= useRef(null as any);
    const firstRender = useRef(true);
    const selectRef= useRef(null as any);

    useEffect(()=>{
      if(initialFilterState && initialData && initialData.length> 0){
        const initialSelectedData = initialData?.filter((dt:any)=>initialFilterState.values.includes(dt.name));
        setSelected(initialSelectedData);
      }
      else{
        setSelected(initialData);
      }
      selectRef.current==null;
    },[initialFilterState, initialData]);

    useEffect(()=>{
      setIsFiltered({state:false})
    },[field]);

    useEffect(()=>{
      if(firstRender.current){
        firstRender.current = false;
        return;
      }

      if(setFilterState && filterState[field as string]){
        if(selected?.length ==0 || selected ==undefined) return;
      
        let prevFilterState= filterState[field as string].map((prev:any, idx:number)=>{
            if(!selected.map((sl)=>sl.name).includes(prev.name)){
              return{
                id:prev.id,
                name:prev.name,
                checked:false,
              }
            }
            else{
              return{
                id:prev.id,
                name:prev.name,
                checked:true,
              }
            }
          });
          
          setFilterState({
            ...filterState,
            [field as string]:prevFilterState
          });
          
          
          if(filteredList && setFilteredList){         
            (selectRef.current!==null && selectRef.current!=selected ) && !(selectRef.current!=selected && selected.length === dropdownItems.length)
            ? setFilteredList([...filteredList, field])
            : setFilteredList(filteredList?.filter((ft)=>ft!=field));
          }

          selectRef.current=selected;
        }
    },[selected]);

    useEffect(()=>{
      filteredList?.includes(field)
      ? setIsFiltered({...{state:true}})
      : setIsFiltered({...{state:false}})
    },[filteredList])

    useEffect(()=>{
      if(filterState && data){
        const filteredData=data.map((dt)=>dt.name);
        setDropdownItems(filterState[field as string]?.filter((row:any)=>filteredData.includes(row.name)))
      }
    },[filterState, data]);

    const onClickSortButton =()=>{
      sortBy === "none" || sortBy === "desc"
      ? setSortBy("asc")
      : setSortBy("desc")

      if(setSortState){
        setSortState({
          'col': field,
          'by': sortBy === "none" || sortBy === "desc" ? "asc" : "desc",
          'type' : type == 'date'? 'date':''
        })
      }
    };

    useEffect(()=>{
      if(field != sortState?.col){
        setSortBy("none");
        setIsSort(false);
      }
      else{
        setIsSort(true);
      }
    },[sortState])


    const onClickFilterIcon=useCallback(()=>{
      setIsShowFilter(!isShowFilter);
    },[isShowFilter]);

    const { initial, resize } = useResizeHook({
      initialSelector: {
        type:"id",
        selector : `resizable-th-${field}`
      },
      resizeSelector:[
        {
          type:"id",
          selector : `resizable-th-${field}`
        },
        {
          type:"class",
          selector : `resizable-td-${field}`
        },
      ],
    });

    return (
      <>
        <th 
            rowSpan={rowSpan} 
            colSpan={colSpan} 
            scope={scope} 
            className={classNames(classes.th, isCheckbox && classes.checkBox)} 
            style={{width: width ? `${width}px`: '100%', 
            whiteSpace: width? 'normal' : 'nowrap', 
            textAlign: textAlign as any}} 
            ref={wrapperRef}
            onMouseEnter={()=>setIsShowIcon(true)}
            onMouseLeave={()=>setIsShowIcon(false)}
            id={`resizable-th-${field}`}
          >
          <div style={{display:"flex", position:"relative"}}>
            <div 
              style={{display:"flex", width:"100%", height:"100%", alignItems:"center"}}
            >
              <div  style={{display:"flex", width:"100%", height:"100%", alignItems:"center", justifyContent: isCheckbox? "center":""}}>
                <div>{!isFirst&&<span className={classes.vertical}></span>}</div>
                <span>{children}</span>
              </div>
              {!isCheckbox && 
                <div className={classes.header_icon} style={{marginLeft:"5px", display: isFilter? "flex" : "none"}}>
                  <span onClick={onClickSortButton} style={{display:"block"}}>
                    <SVG name={sortBy === "asc" ? "upward" : "downward"} width="16" height="16" color={isSort? "#000000DE" : isShowIcon? "#00000047" : "transparent"} isHoverEffect />
                  </span>
                  <span onClick={onClickFilterIcon}  style={{display:"block"}}>
                    <SVG name="filter" width="16" height="16" color={isFiltered.state || isShowFilter? "#000000DE": isShowIcon? "#00000047" : "transparent"} isHoverEffect />
                  </span>
                </div>
              }
            </div>

            <div style={{
                display : isShowFilter ? "block" : "none", 
                position:"absolute", 
                top:"-10px", 
                right: isFirst? '': isLast? "10px":"-200px", 
              }}
            >
            { filterState && filterState[field as string] &&
              <MultiSelect
                width={200}
                placeholder="키워드를 입력하세요"
                values={dropdownItems}
                isShowDropdown={isShowFilter}
                setIsShowDropdown={setIsShowFilter}
                selected={selected}
                setSelected={setSelected}
                initialData={initialFilterState?.field == field && initialFilterState.values}
                wrapperRef={wrapperRef}
                isShowTags={false}
                isboxShadow
              >
                {dropdownItems?.map((item, i)=>
                  <MultiOption
                    item={item}
                    key={`multi-option-${i}`}
                  ></MultiOption>
                )}
              </MultiSelect>
            }
            </div>
          </div>
          {/* <div id = "draggable-item"
              draggable   = 'true'
              onDragStart = {initial} 
              onDrag      = {resize}
              style={{width: isLast? "0px":"20px"}}
              className={classes.draggable_item}
          ></div> */}
        </th>
      </>
    )
}
