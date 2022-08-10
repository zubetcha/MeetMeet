import React, {useState} from 'react';
import {debounce} from 'lodash';
interface resizeSelectorType{
    type : string;
    selector : string;
}

interface useResizeHookProps{
    initialSelector : resizeSelectorType;
    resizeSelector : resizeSelectorType[];
}

export default function useResizeHook({initialSelector, resizeSelector}:useResizeHookProps) {
    const [initialPos,   setInitialPos] = useState<number>();
    const [initialSize, setInitialSize] = useState<number>();

    const initial = (e:React.DragEvent<HTMLDivElement>) => {
        const {type, selector} = initialSelector;
        
        if(type === "id"){
            let resizable = document.getElementById(selector) as HTMLDivElement;
        
            setInitialPos(e.clientX);
            setInitialSize(resizable.offsetWidth);
        }
        else{
            let resizable = Array.from(document.getElementsByClassName(selector));
            setInitialPos(e.clientX);
            resizable.map((item:any)=>setInitialSize(item.offsetWidth));
        }    
    }


    const resize = (e:React.DragEvent<HTMLDivElement>) => {
        resizeSelector.map((resizeItem)=>{
            const {type, selector} = resizeItem;
            if(type === "id"){
                let resizable = document.getElementById(selector)  as HTMLDivElement;
                resizable.style.width = `${initialSize as number+ (e.clientX - initialPos! as number)}px`;
                return;
            }

            if(type === "class"){
                let resizable = Array.from(document.getElementsByClassName(selector));
                resizable.map((item: any)=>{
                    item.style.width = `${initialSize as number+ (e.clientX - initialPos! as number)}px`;
                })
            }
           
        })
    };

    const DragItem = ()=>{
        return(
            <div id = "draggable-item"
                draggable   = 'true'
                onDragStart = {initial} 
                onDrag      = {resize}
                style={{
                    width: "10px",
                    height : "100%",
                    backgroundColor : "transparent",
                    position:"absolute",
                    right: "0",
                    top: "0"
                }}
            ></div>
        )
    }
    
    return {
        initial,
        resize,
        DragItem : ()=>DragItem()
    }
}
