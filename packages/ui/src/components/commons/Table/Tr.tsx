import React, {useState, useCallback, useEffect} from 'react'
import Td from './Td';
import classes from "./table.module.scss";
import {Checkbox, Radio} from "../../elements";
interface TrProps{
    index: number;
    data: any[];
    isCheckbox:boolean;
    checkedList: any[];
    setCheckedList:(e:number[])=>void;
    setClickedList:(e:any)=>void;
    tableKey:string;
    selectedRadioValue:string;
    onChangeRadio : (e: React.ChangeEvent<HTMLInputElement>) => void;
    colWidths:number[]|undefined;
    isEmptyRow?:boolean;
    fields: string[];
}

function TR({
  index, 
  data, 
  isCheckbox, 
  checkedList, 
  setCheckedList, 
  setClickedList, 
  tableKey, 
  selectedRadioValue, 
  onChangeRadio, 
  colWidths,
  isEmptyRow,
  fields
} : TrProps) {

  const [checked, setChecked]=useState(false);

  const onChange=(e: React.ChangeEvent<HTMLInputElement>, key:string)=>{
    let tmp:number[];
    const {checked}=e.target;

    checked
    ? tmp=[...checkedList, data]
    : tmp=checkedList.filter((tp,i)=>Object.entries(tp).toString() !== Object.entries(data).toString());

    setCheckedList(tmp);

    checked
    ? setChecked(true)
    : setChecked(false)
    return; 
  };

  useEffect(()=>{
    let flag=false;
    checkedList.map((checked)=>{
      if( Object.entries(checked).toString() === Object.entries(data).toString()) flag=true;
    })

    flag
    ? setChecked(true)
    : setChecked(false);

  },[checkedList, data]);


  const onClick=(e:any)=>{
    e.preventDefault();
    setClickedList({...data});
  }

  return (
      <tr className={classes.tr} >
        {(isCheckbox && !isEmptyRow) &&
           <Td key={`checkbox-td-${index}`} width="50px">
             <Checkbox
              name={`${index}-${tableKey}-checkbox`}
              id={`${index}-${tableKey}-checkbox`}
              onChange={(e)=>onChange(e,tableKey)}
              checked={checked}
              key={`${index}-${tableKey}-checkbox`}
             ></Checkbox>
            </Td>
        } 
        {fields?.map((key:any,index)=>{
          return key =="radio"
          ? <Td key={`Td-${index}-${data[key]}`} width={`${colWidths![index]}px`} field={key}>
            <Radio
              name={`radio-btn-${tableKey}-${data[key]}`}
              id={`radio-btn-${tableKey}-${data[key]}`}
              selectedValue={selectedRadioValue}
              onChange={onChangeRadio}
              value={data[key]}
            ></Radio>
            </Td>
          : <Td key={`Td-${index}`} onClick={onClick} width={`${colWidths![index]}px`} field={key} type={typeof data[key]}>{data[key]}</Td>
        })}
      </tr>
    );
}

export const Tr = React.memo(TR);