import React, {useCallback, useEffect, useState, Children, useRef, Dispatch, SetStateAction} from 'react'
import {Button} from '../Buttons/Button';
import classes from "./select.module.scss";
import classNames from 'classnames';
import { Input } from '../Input';
import {SVG} from '../SVG/SVG';
import { colors } from '../../../shared/style';

import useOutsideAlerter from '../../../hooks/useOutsideAlerter';
import {SelectProps} from './Select.types';

/**
 * 
 * @param width (number) Select 컴포넌트 넓이 width
 * @param values ({id:number, name:string}[]) Select 컴포넌트 드롭다운에 들어갈 values  {id: id, name: 들어갈 요소의 이름}
 * @param selectedId (number) 선택된 요소의 id
 * @param setSelectedId : (setState fn) 선택된 요소 id setState function
 * @param isSearch : (boolean) 검색기능이 있는 Select 인지 여부 (true | false)
 * @param state : (disable | default | danger) input, button state 
 * @param isFocusOnSelected : (boolean) 선택된 요소 autoFocus 기능 여부
 * @param lable : (string) Select 컴포넌트 상단 라벨
 * @param input : input 컴포넌트 내부 style props
 * @param button: button 컴포넌트 내부 style props
 * @returns 
 */
export const Select=({
    width, 
    children, 
    values, 
    selectedId, 
    setSelectedId , 
    state="default",
    isSearch=false,
    isFocusOnSelected=true,
    label,
    input,
    button,
    onClickItem,
}:SelectProps)=>{
    const [isActive, setIsActive]= useState(false);
    const [item, setItem]=useState<string | undefined>(values?.filter((vl:any,i:number)=>vl?.id == selectedId)[0]?.name);
    const [inputValue, setInputValue]=useState('');
    const [searchResult, setSearchResult]=useState<any[]>();

    const wrapperRef = useRef(null as any);
    useOutsideAlerter(wrapperRef, ()=>setIsActive(false));


    // DESCRIBE: 선택된 요소로 autoFocus;
    useEffect(()=>{
        if(!isFocusOnSelected){
            return; 
        }

        document.getElementById(`item-${selectedId}`)?.scrollIntoView();
    },[isActive])

    // DESCRIBE: Select 컴포넌트 드롭다운 활성화
    const onActiveToggle = ()=>{
        if(state=="disable") {
            return;
        }

        setIsActive(!isActive);
        setInputValue('');
        setSearchResult(undefined);
    };
    
    const onSelectItem = (e:any)=>{
        e.preventDefault();
        const Id= e.target.id;
        const [targetId, itemId]=Id.split("-");

        setSelectedId(parseInt(itemId));
        onClickItem && onClickItem(parseInt(itemId));

        targetId === "item_name" 
        ? setItem(e.target.parentElement.innerText) 
        : setItem(e.target.innerText);

        e.target.className += "selected"
        setIsActive((prev) => !prev);
    };

    useEffect(()=>{
        setItem(values?.filter((vl:any,i:number)=>vl?.id == selectedId)[0]?.name);
    },[values]);

    useEffect(()=>{
        if(!selectedId){
            setItem(undefined);
        }
        if(selectedId?.toString() && values){
            let name = values.filter((vl:any,i:number)=>vl?.id == selectedId)[0]?.name;
            setItem(name);
        }
    },[selectedId])


    const onChange=(e:React.ChangeEvent<any>)=>{
        const {value} = e.target;
        setInputValue(value);
        searchItems(value);
    }

    const searchItems =(value:string)=>{
        let result:any[]=[];
        values.map((vl:any, i:number)=>{
          if((vl)?.name?.toString().toLowerCase().includes(value)){
            result.push(vl);
          }
        })
        setSearchResult(result);
    }
    
    return (
        <div 
            className={classes.select_container} 
            style={{width: `${width}px`}} 
            ref={wrapperRef}>
            <div 
                className={classes.select_body} 
                >
                    {isActive && isSearch?
                            <Input
                                type={"input"}
                                name={"select-input"}
                                value={inputValue}
                                placeholder={input?.placeholder}
                                onChange={onChange}
                                status={state}
                                size={"large"}
                                icon={<SVG name="search" color={colors.darkMedium} />}
                                iconMarginRight={"5px"}
                                label={label}
                                width={`${width}px`}
                                isHelperText={false}
                            ></Input>
                        :
                        <>
                            {label&&<div className={classes.label} style={{color: state==="disable"? colors.gray300 : colors.darkMedium}}>{label}</div>}
                            <span  style={{display:"block", margin: button?.margin? button.margin: "4px auto"}}>
                            <Button 
                                text={item ? item : isSearch && button?.placeholder? button?.placeholder: "선택해주세요"}
                                style={button?.style ? button?.style : "input"}
                                color = {item ? undefined : colors.darkLow}
                                icon={<SVG name={"dropdown"} width={"24"} height={"24"} 
                                    color={
                                        state==="disable"
                                        ? button?.style=="line"
                                            ? "#116D38"
                                            : colors.gray300
                                        : button?.style =="line"
                                            ? "#116D38"
                                            : colors.darkMedium
                                    }></SVG>
                                }
                                iconLocation="right"
                                justifyContent="space-between"
                                height={button?.height? button.height:undefined}
                                width={`${width}px`}
                                state={state}
                                onClick={onActiveToggle}
                                textWidth={button?.textWidth?button?.textWidth:undefined}
                                size={button?.size}
                            ></Button>   
                            </span>
                            {button?.helperText && 
                                <div 
                                    className={classes.placeholder}
                                    style={{color: state === "danger" ? '#F25341' : colors.darkMedium}}
                                >{button?.helperText}</div>
                            }
                        </>
                    }
            </div>
            {isActive&&
                <>
                    {!searchResult?
                        <div className={classes.select_menu}>
                            <ul className={classes.select_item_lists} 
                                style={{
                                    width: `${width}px`, 
                                    border: "1px solid rgba(0, 0, 0, 0.64)",
                                    boxShadow: isActive? "0px 4px 8px rgba(0, 0, 0, 0.16)" : "none",
                                }}>
                                
                                {Children.toArray(children).map((child:any, index:number)=>{
                                    return(
                                        <div key={`option-child-${index}`}>
                                            {React.cloneElement(child,{
                                                onClick: onSelectItem,
                                                selectedId:selectedId,
                                                i:index
                                            })}
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                :
                <>
                    <div className={classes.select_menu}>
                        <ul className={classes.select_item_lists} 
                            style={{
                                width: `${width}px`, 
                                border: searchResult? "1px solid rgba(0, 0, 0, 0.64)" : "none",
                                boxShadow: isActive? "0px 4px 8px rgba(0, 0, 0, 0.16)" : "none",
                            }}>
                            {
                                searchResult.length > 0
                                ? searchResult.map((item:any, index:number)=>{
                                    return(
                                        <div key={`option-child-search-result-${index}`}>
                                            <Option
                                                item={item}
                                                onClick={onSelectItem}
                                                selectedId={selectedId}
                                                i={index}
                                            ></Option>
                                        </div>
                                    )
                                })
                                :
                                <>
                                   <Option
                                        item={{id:0, name:"검색 결과가 없습니다"}}
                                    ></Option>
                                </>
                                }
                        </ul>
                    </div>
                </>
                }
            </>
            }
        </div>
    )
}


interface OptionProps{
    item : any;
    onClick?:(e:React.MouseEvent<HTMLLIElement>)=>void;
    onKeyDown?: React.KeyboardEventHandler;
    selectedId?: number | string;
    i?:number;
    disable?: boolean;
    fontSize?:string;
}

export const Option=({item, onClick, onKeyDown, selectedId, i, disable=false, fontSize}:OptionProps)=>{
    
    return(
        <>
        <li 
            id={`item-${item.id}`}
            key={`select-item-${item.id}`} 
            onClick={disable? ()=>{}: onClick} 
            onKeyDown={onKeyDown}
            className={
                classNames( item.name!== "검색 결과가 없습니다" ? disable? classes.disable : classes.select_item : classes.noresult, 
                            item.id == selectedId? classes.selected:'')}
            tabIndex={i}
            style={{
                fontSize:fontSize? fontSize:"16px"
            }}
            >
            <span id={`item_name-${item.id}`}>{item.name}</span>
        </li>
        </>
    )
}