import classNames from "classnames";
import { useRouter } from "next/router";
import React, {useEffect, useState, useRef} from "react";

import { Text, ButtonGroup, Button } from "../../elements";
import classes from './inquiry-layout.module.scss';
import { WorkingHourProps } from "../../../types/ui.types";

// 근무 시간 컴포넌트
export const WorkingHour = ({
    workingHourData,
    workingHourSelectedId,
    workingRotationData
}:WorkingHourProps) => {
    const router = useRouter();
    const [selectedId, setSelectedId]=useState<any>(workingHourSelectedId);
    const [workingHour, setWorkingHour] = useState<number|undefined>(workingHourData);
    const firstUpdate = useRef(true); 

    useEffect(() => {
        setSelectedId(workingHourSelectedId);
    },[workingHourSelectedId])

    useEffect(() => {
        if (firstUpdate.current){
            firstUpdate.current = false;
            return;
        }

        let hour = 0;


        switch(selectedId){
            case 0:
                hour = 0
                break;
            case 1:
                hour = 1
                break;
            case 2:
                hour = 2
                break;
            case 3:
                hour = 3
                break;
        }

        if(router.query.depth === "customer"){
            setWorkingHour(0);
            router.push(
                {query:{
                        ...router.query,
                        workingHour: 0,
                }},
                undefined,
                {shallow:true}
            )
        }
        
        if(workingHour !== hour){
            setWorkingHour(hour);
            router.push(
                {query:{
                        ...router.query,
                        workingHour: hour,
                }},
                undefined,
                {shallow:true}
            )
        }

    }, [selectedId, router.query.depth])

    return (
        <>
        {workingRotationData?.rotationList.length>1 &&
            <div className={classes.inquiryBox}>
                <div className={classes.description} >
                    <Text text="근무 시간" weight="regular" type="caption1"/>
                </div>
                
                    <ButtonGroup style="line" selectedId={selectedId} setSelectedId={setSelectedId} >
                        <Button text="전체" key={`ration-button-total`}></Button>
                        {workingRotationData?.rotationList && 
                            workingRotationData?.rotationList.map((rotation:any)=>
                                <Button text={rotation.name} key={`ration-button-${name}`}></Button>
                            )
                        }
                    </ButtonGroup>
            </div>
        }
        </>
    )
}
