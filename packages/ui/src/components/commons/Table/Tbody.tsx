import { ReactElement, useEffect} from 'react';
import {Tr} from "./Tr";
import classes from "./table.module.scss";
import useIntersectionOberserver from '../../../hooks/useIntersectionObserver';
interface TbodyProps{
    data:any[];
    height: string;
    isCheckbox: boolean;
    checkedList:number[];
    setCheckedList:(e:number[])=>void;
    setClickedList:(e:number)=>void;
    selectedRadioValue:string;
    setSelectedRadioValue:(e:string)=>void;
    ObservationComponent: null | (()=>ReactElement) ;
    filterState:any;
    tableKey: string;
    colWidths:number[]|undefined;
    isEmptyRow?:boolean;
    fields: string[];
    setIsShowBoxShadow: (e:boolean)=>void;
}

export default function Tbody({
    data, 
    height, 
    isCheckbox, 
    checkedList, 
    setCheckedList, 
    setClickedList, 
    selectedRadioValue,
    setSelectedRadioValue,
    ObservationComponent, 
    filterState, 
    tableKey,
    colWidths,
    isEmptyRow,
    fields,
    setIsShowBoxShadow
    // BottomShadow,
}:TbodyProps) {
    
    const onChangeRadio=(e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        const {value}=e.target;
        setSelectedRadioValue(value);
    };

    const {inView, ObserveObject}=useIntersectionOberserver();

    useEffect(()=>{
        inView
        ? setIsShowBoxShadow(false)
        : setIsShowBoxShadow(true);
    },[inView])

    
    return (
        <tbody className={classes.tbody}>
            {
                data.map((dt,i)=>{
                    return(
                        <Tr 
                        key={`tr-${i}-${tableKey}`}
                        index={i} 
                        data={dt} 
                        isCheckbox={isCheckbox} 
                        checkedList={checkedList}
                        setCheckedList={setCheckedList}
                        setClickedList={setClickedList}
                        tableKey={tableKey}
                        selectedRadioValue={selectedRadioValue}
                        onChangeRadio={onChangeRadio}
                        colWidths={colWidths}
                        isEmptyRow={isEmptyRow}
                        fields={fields}
                        ></Tr> 
                    )
                })
            }
            {/* {filterState.selectedValues.length == 0&&
                // 필터링 걸려있을 때, 무한 스크롤 동작 막는 예외처리
                <tr><td>{ObservationComponent&&<ObservationComponent></ObservationComponent>}</td></tr>
            } */}
            <tr>
                <td>
                    <ObserveObject></ObserveObject>
                </td>
            </tr>
        </tbody>
    );
}
 