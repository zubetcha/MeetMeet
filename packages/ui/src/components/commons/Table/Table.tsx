import React, { ReactElement, useCallback, useEffect, useState, useRef } from 'react';
import Thead from './Thead';
import Tbody from './Tbody';
import classes from "./table.module.scss";
import classNames from 'classnames';
import {getSortedData} from '../../../utils/getSortedData';


interface TableProps{
    style:string,
    columns:any[],
    rows:any[],
    isCheckbox:boolean,
    height?: string,
    checkedRow?: boolean[],
    isInfiniteScroll?: boolean,
    setCheckedRow: (e:number[])=>void;
    setClickedRow: (e:any)=>void;
    selectedRadio?:string;
    setSelectedRadio?:(e:string)=>void;
    ObservationComponent?: null | (()=>ReactElement) ;
    tableKey:string;
    isEmptyRow?: boolean;
    fieldList: string[];
    initialFilterState?: {
      field: string;
      values: any[];
    };
}

/**
 * 
 * @param style 테이블 스타일 primary | secondary 
 * @param columns 테이블 헤더 (2차 배열까지 가능)
 * @param rows 테이블 내용  (객체 배열)
 * @param isCheckbox 체크 박스 유무 true | false 
 * @param height 테이블 높이 (overflow:scroll)
 * @param isInfiniteScroll 무한스크롤 구현 true | false 
 * @param setCheckedRow 체크박스 선택
 * @param setClickedRow 클릭
 * @param selectedRadio 처음 선택되어 있는 radio 버튼의 value 값
 * @param setSelectedRadio raido 버튼 value 값 변경 set함수
 * @param ObservationComponent 감지하는 컴포넌트에서
 * @param tableKey 테이블 컴포넌트 구분용 key
 * @param fieldList 테이블에 보여지는 필드이름 리스트 
 * @param initialFilterState 테이블 최초 필터 상태 초기화를 위한 props (field, values)
 * @returns 
 */
export function Table({
  style, 
  columns, 
  rows, 
  isCheckbox, 
  height="100%", 
  isInfiniteScroll=false, 
  setCheckedRow=()=>{}, 
  setClickedRow=()=>{}, 
  selectedRadio,
  setSelectedRadio,
  ObservationComponent=null,
  tableKey,
  isEmptyRow=false,
  fieldList,
  initialFilterState,
}:TableProps) {
    // 정리된 row 들
    const [row, setRow]=useState<any>();
    // col 별로 정리한 row 들
    const [rowByCols, setRowByCols]=useState<any>();
    // 체크박스 관련 상태
    const [checkedList, setCheckedList]=useState<number[]>([]);
    // 클릭 관련 상태
    const [clickedList, setClickedList]=useState<any>();
    // 정렬 관련 상태
    const [sortState, setSortState]=useState({
      col:'',         // 정렬 기준이 되는 column 명
      by:'',          // 정렬 방법 (asc, desc, none)
      type:'',        // column 타입
    })
    // field 별 필터 선택된 values 값들 (key: field 이름, value : 값들 )
    const [filterState, setFilterState]=useState<{[key:string]:any[]}>({});
    // 현재 필터링이 걸려있는 filter 컬럼
    const [filteredList, setFilteredList]=useState<any[]>([]);
    // 라디오 버튼 관련 상태
    const [selectedRadioValue, setSelectedRadioValue]=useState(selectedRadio? selectedRadio: '');
    // Td로 보여줄 field 리스트
    const [fields, setFields]=useState(fieldList);
    // column 넓이
    const [colWidths, setColWidths] = useState();

    const [isShowBoxShadow, setIsShowBoxShadow]=useState(false);

    useEffect(()=>{
      initializeState();
    },[columns])
    
    useEffect(()=>{
      if(rows){
        setCheckedList([]);
        setClickedList(undefined);
        makeInitialFilterState([...rows]);
        makeFilterModalByCols([...rows]);
      }
    },[rows]);

    const initializeState=()=>{
      setRowByCols({});
      setSortState({
        col:'',          
        by:'',       
        type:'', 
      })
      setFilteredList([]);
      setFilterState({});
      setCheckedList([]);
      setClickedList(undefined);
    }

    useEffect(() => {
      setSelectedRadioValue(selectedRadio ? selectedRadio : '');
    }, [selectedRadio])
 

    useEffect(()=>{
     if(fieldList){
        setFields(fieldList);
      }
    },[fieldList]);

    useEffect(()=>{
      if(setSelectedRadio && selectedRadioValue){
        setSelectedRadio(selectedRadioValue);
      }
    },[selectedRadioValue]);

    useEffect(()=>{
      if(!clickedList) return;
      setClickedRow({...clickedList});
    },[clickedList])

    useEffect(()=>{
      if(filterState.selectedIdx?.length == 0){
        sortingRows(row);
        return;
      }
      setCheckedRow(checkedList);
    },[checkedList]);

    useEffect(()=>{
      filteredList.length >0
      ? makeFilterModalByCols(filterData(), filteredList)
      : makeFilterModalByCols(rows);
      
      sortingRows(filterData());
    },[sortState, filteredList, rows])

    // DESCRIBE: 데이터 필터링 하는 함수
    const filterData=()=>{
      let newRow:any[]=[];

      const parsedFilteredList=Array.from(new Set(filteredList));
      rows?.map((row:any, _)=>{
        let flag=true;
        parsedFilteredList.map((key)=>{
         const checkedNameList = filterState[key]?.filter((item)=>item.checked).map((item)=>item.name);
         flag = checkedNameList?.includes(row[key]);
        })
        if(flag) newRow.push(row);
      })
      return newRow;
    }

    // DESCRIBE: 필터링 모달 만드는 함수
    const makeFilterModalByCols=useCallback((data:any[], filteredList?:string[])=>{
        let prevFilterState={...filterState};
        const newFilterModalData:any={};
        let checked:any={};

        // DESCRIBE: key 로 묶기 (field 명)
        data?.map((row,idx) => {
          for (const [key, value] of Object.entries(row)){
            if(!newFilterModalData[key]){
              newFilterModalData[key]=[{
                id:idx,
                name: value,
              }] 
              checked[key]=[value];
            }
            else if(!checked[key].includes(value)){
              newFilterModalData[key]=[
                ...newFilterModalData[key],
                {
                  id:idx,
                  name:value,
                }
              ]
              checked[key].push(value);
            } 
          }
        });


        // DESCRIBE: 중복제거
        for(const [key, value] of Object.entries(newFilterModalData)){
          let parsedList = Array.from(new Set(value as []));
          newFilterModalData[key]=parsedList;
        }

        
        if(filteredList && filteredList.length>0){
            filteredList.map((key)=>{
              prevFilterState[key]?.map((row)=>{
                if(row.checked===false){
                  newFilterModalData[key]?.push({id:row.id, name:row.name});
                }
              })
            })
            // 새로 필터링된 데이터 필터링 모달 부분.
            if(filteredList.length >1){
              newFilterModalData[filteredList[filteredList.length-1]]=rowByCols[filteredList[filteredList.length-1]];
            }
        }

        if(newFilterModalData && Object.keys(newFilterModalData).length > 0 ){
          setRowByCols({...newFilterModalData});
        }

    },[filterState]);
    
    

    // DESCRIBE: 최초 필터링 상태값 만드는 함수
    const makeInitialFilterState=(data:any[])=>{
      let newFilterModalState :any={};

      data?.map((d,idx)=>{
        for (const [key, value] of Object.entries(d)){
          if(!newFilterModalState[key]){
            newFilterModalState[key]=[{id:idx,name:value,checked:true}]
          }
          else{
            if(!newFilterModalState[key].includes({id:idx, name:value, checked:true}) && !newFilterModalState[key].map((v:any)=>v.name).includes(value)){
              newFilterModalState[key].push({id:idx, name:value, checked:true});
            }
          }
        }
      });

      if(initialFilterState){
        const {field, values} = initialFilterState;

        newFilterModalState[field]?.map((tp:any, idx:number)=> {
          values.includes(tp.name)
          ? newFilterModalState[field][idx].checked=true
          : newFilterModalState[field][idx].checked=false
        });

        setFilteredList([field]);
      }
      setFilterState({...newFilterModalState});
    }

    const sortingRows = (data:any[]) =>{
      let tmp =[...data]
      // col : 정렬 기준이되는 컬럼, by : 정렬 기준
      const {col, by, type}=sortState;

      // 정렬 기준 및 방법 없으면 그대로 출력
      if(col ==='' && by==='' ){
        setRow(tmp);
        return; 
      }

      if(type=="button"){
        return;
      }
    
      // DESCRIBE: 정렬함수
      let sortedRows = tmp.sort((a:any, b:any)=>{
        let check=[null, '-'];
       
        if(!check.includes(a[col]) && !check.includes(b[col])){
          let type_ = type === "date"? type : typeof a[col];
          switch(type_){
            case "date": return getSortedData(new Date(a[col]), new Date(b[col]), by);
            case "string": return getSortedData(a[col].toLowerCase(), b[col].toLowerCase(), by)
            case "number": return getSortedData(a[col], b[col], by);
          }
        }
        
        // 예외사항 (null, '-') 일 경우 뒤로 보내기
        if (check.includes(a[col])) return 1;
        else if(check.includes(b[col])) return -1;
        else return 0;
      });

      setRow(sortedRows);
    }

    const onChange=(e: React.ChangeEvent<HTMLInputElement>, setChecked:(e:boolean)=>void)=>{
      if(e.target.checked){
        setChecked(true);      
        setCheckedList([...row!])
      }
      else{
        setChecked(false)
        setCheckedList([]);
      }
    };

    useEffect(() => {
      const _colWidths = columns[columns.length - 1]?.map((column: any) => {
        return column.width;
      });

      setColWidths(_colWidths);
    }, [columns]);

    return (
      <div style={{height: `${height}`}} className={classes.table_wrapper}> 
        <table className={classNames(classes.table, classes[style], isCheckbox ? classes.hover : classes.nohover)} >
            {rowByCols && row && Object.keys(rowByCols).length > 0 ?
              <Thead 
                columns={columns} 
                isCheckbox={isCheckbox} 
                sortState={sortState}
                setSortState={setSortState}
                filterState={filterState}
                setFilterState={setFilterState}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                data={rowByCols}
                onChange={onChange}
                tableKey={tableKey}
                initialFilterState={initialFilterState}
              ></Thead>
              :
              <>
              {row && rowByCols &&
               <Thead 
                columns={columns} 
                isCheckbox={isCheckbox} 
                sortState={sortState}
                setSortState={setSortState}
                filterState={filterState}
                setFilterState={setFilterState}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                data={rowByCols}
                onChange={onChange}
                tableKey={tableKey}
                initialFilterState={initialFilterState}
              ></Thead>
              }
              </>
            }
            {row && 
            <Tbody 
              data={row} 
              height={height} 
              isCheckbox={isCheckbox} 
              checkedList={checkedList} 
              setCheckedList={setCheckedList} 
              setClickedList={setClickedList} 
              selectedRadioValue={selectedRadioValue}
              setSelectedRadioValue={setSelectedRadioValue}
              filterState={filterState}
              ObservationComponent={isInfiniteScroll? ObservationComponent: null}
              tableKey={tableKey}
              colWidths={colWidths}
              isEmptyRow={isEmptyRow}
              fields={fields}
              setIsShowBoxShadow={setIsShowBoxShadow}
            ></Tbody>
            }
        </table>
        <div className={classes.bottom_shadow} style={{display: isShowBoxShadow ? "block" : "none"}}></div>
      </div>
    )
}