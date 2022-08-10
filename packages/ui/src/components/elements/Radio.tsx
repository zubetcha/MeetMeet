import React, {useState, useEffect} from 'react';
import classes from './elements.module.scss';

import { SVG } from './SVG/SVG';

interface RadioProps{
    name: string;
    id: string;
    checked?: boolean;
    label?: string;
    selectedValue:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value :string;
}   

/**
 * @param name radio 그룹 이름
 * @param id 해당 input[type="radio"]의 id
 * @param label radio 버튼의 label 
 * @param selectedValue 선택된 input 의 value ( 상위 컴포넌트에서 관리 )
 * @param onChange input onChange 이벤트 핸들러 ( 상위 컴포넌트에서 관리 )
 * @param value  해당 input[type="radio"]의 value 
 * @returns 
 */
export const Radio = ({
    name,
    id,
    label,
    selectedValue,
    onChange,
    value,
}:RadioProps) => {
    const [checked, setChecked]=useState(false);

    useEffect(()=>{
        selectedValue == value
        ? setChecked(true)
        : setChecked(false);
    },[selectedValue])

    return (
        <>
            <label
                htmlFor={id}
                className={classes.checkbox_hover}
            >
                {checked==true ? (
                    <SVG name="selectedRadio" />
                ):(
                    <SVG name="unSelectedRadio" />
                )}
            <input
                type="radio"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                checked={checked}
                style={{display:"none"}}
            ></input>
            <span>{label}</span>
            </label>
        </>
    )
}
