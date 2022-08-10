import React, {useState, useCallback, useEffect} from 'react'
import Th from './Th';
import {Checkbox} from "../../elements/Checkbox";
import classes from './table.module.scss';
interface TheadProps{
  columns:any[];
  isCheckbox:boolean;
  sortState:any;
  setSortState: (e:any)=>void;
  filterState : any;
  setFilterState : (e:any)=>void;
  filteredList : string[];
  setFilteredList : (filteredColumen:any)=>void;
  data: any;
  onChange :(e: React.ChangeEvent<HTMLInputElement>, setChecked:(e:boolean)=>void)=>void;
  tableKey: string;
  initialFilterState?: any;
}

export default function Thead({
  columns, 
  isCheckbox, 
  sortState, 
  setSortState, 
  filterState,
  setFilterState,
  filteredList,
  setFilteredList,
  data,
  onChange,
  tableKey,
  initialFilterState
}:TheadProps) {
    const [checked, setChecked]=useState(false);
    const [initialData, setInitialData]=useState(data);

    useEffect(()=>{
      setChecked(false);
    },[tableKey]);

    return (
      <thead className={classes.thead}>
        {columns.map((column,i)=>{
          return(
            <tr key={`tr-${i}-${tableKey}`}>
            {isCheckbox&&
              <Th key={'checkbox-header'} width={50} isFirst={true} isCheckbox={isCheckbox} >
                 <Checkbox
                  name={`check-all-${tableKey}`}
                  id={`check-all-${tableKey}`}
                  onChange={(e)=>onChange(e,setChecked)}
                  checked={checked}
                 ></Checkbox>
              </Th>
            }
            {initialData&&
            <>
              {column.map((col:any,i:number)=>{
                  return (
                      <Th
                        rowSpan={col.rowSpan !== undefined ? col.rowSpan : 1}
                        colSpan={col.colSpan !== undefined ? col.colSpan : 1}
                        scope={col.scope !== undefined ? col.scope : "col"}
                        key={`Th-${i}`}
                        width={col.width}
                        isFirst={(col.isFirst == undefined)? !isCheckbox&& col.isFirst : i==0? true : false}
                        isLast={i===column.length -1}
                        sortState={sortState}
                        setSortState={setSortState}
                        filterState={filterState}
                        setFilterState={setFilterState}
                        filteredList={filteredList}
                        setFilteredList={setFilteredList}
                        field={col.field}
                        type={col.type}
                        data={data[col.field]}
                        initialData={initialData[col.field]}
                        isFilter={col.isFilter}
                        initialFilterState={(initialFilterState && initialFilterState.field === col.field)?  initialFilterState : undefined}
                      >
                        <div style={{textAlign :'left', margin: col.textAlign === "center"? "0 auto" : "0px 0px 0px 15px", whiteSpace:"nowrap"}}>
                          {col.headerName !== undefined ? col.headerName : 1}
                        </div>
                      </Th>
                  );
              })}
            </>
          }
          </tr>
          )
        })}
          
      </thead>
    );
}
