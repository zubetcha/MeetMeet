import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef} from "react";

import { Text, ButtonGroup, Button } from "../../elements";
import classes from './inquiry-layout.module.scss';
import { EquipmentTypeProps } from "../../../types/ui.types";


// 크기별 설비 그룹
export const EquipmentType = ({
    equipmentTypeData,
    equipTypeSelectedId
}:EquipmentTypeProps) => {
    const router = useRouter();
    const [selectedId, setSelectedId]=useState<any>(equipTypeSelectedId);
    const [type, setType] = useState<string|undefined>(equipmentTypeData);
    const firstUpdate = useRef(true); 

    useEffect(()=>{
        setSelectedId(equipTypeSelectedId);
    },[equipTypeSelectedId])

    useEffect(() => {
        if (firstUpdate.current){
            firstUpdate.current = false;
            return;
        }

        let equipmentType = '';

        switch(selectedId){
            case '0':
                equipmentType = 'all'
                break;
            case '1':
                equipmentType = 'large'
                break;
            case '2':
                equipmentType = 'medium'
                break;
            case '3':
                equipmentType = 'small'
                break;
        }

        if(type !== equipmentType){
            setType(equipmentType);
            router.push(
                {query:{
                    ...router.query,
                    equipmentType: equipmentType,
                }},
                undefined,
                {shallow: true}
            )
        }
    },[selectedId])

    return(
        <div className={classes.inquiryBox}>
            <div className={classes.description} >
                <Text text="크기별 설비 그룹" weight="regular" type="caption1" />
            </div>
            <ButtonGroup style="line" selectedId={selectedId} setSelectedId={setSelectedId} >
                <Button text="전체" />
                <Button text="대형 장비" />
                <Button text="중형 장비"/>
                <Button text="소형 장비"/>
            </ButtonGroup>
        </div>
    )
}