import React, {useState, useEffect, useRef} from "react";
import { Router, useRouter } from "next/router";

import {TimePicker, WorkingHour, EquipmentType, OperatingStatusType} from "../index";
import classes from "./inquiry-layout.module.scss";
import { InquiryLayoutProps } from "../../../types/ui.types";

// 공통 조회 레이아웃 
// 모든 종류의 조회 컴포넌트를 조건에 따라서 렌더링할 수 있도록

/**
 * 
 * @param timePicker  조회 기간 
 * @param workingHour 근무 시간
 * @param equipmentType 크기별 설비 그룹
 * @param setDate 조회 기간 설정 함수 
 * @param date 조회 기간 {startDate, endDate}
 * @param workingHourData
 * @param workingRotationData 근무 교대 시간 데이터 {currentRation, rotationList}
 * @param mainStatus
 * @returns 
 */

export const InquiryLayout = ({
    timePicker=false, 
    workingHour=false, 
    equipmentType=false,
    operatingStatusType=false,
    equipmentTypeData,
    workingHourData,
    workingRotationData,
    mainStatus,
    date,
    startTime
}:InquiryLayoutProps) => {

    console.debug('[InquiryLayout] renders');

    const [workingHourSelectedId, setWorkingHourSelectedId] = useState(0);
    const [equipTypeSelectedId, setEquipTypeSelectedId] = useState('0');
    const [mainStatusSelectedId, setMainStatusSelectedId] = useState(0);
    const [onlyMain, setOnlyMain] = useState(false);
    const router = useRouter();

    
    useEffect(() => {
        const _onlyMain = router.query.onlyMain as string;

        if(_onlyMain === "true"){
            setOnlyMain(true);
        }else{
            setOnlyMain(false);
        }

    },[router.query.onlyMain])


    useEffect(()=>{
        let _workingHourSelectedId = 0;

        switch(workingHourData){
            case 0:
                _workingHourSelectedId = 0;
                break;
            case 1:
                _workingHourSelectedId = 1;
                break;
            case 2:
                _workingHourSelectedId = 2;
                break;
            case 3:
                _workingHourSelectedId = 3;
                break;
        }

        setWorkingHourSelectedId(_workingHourSelectedId);
    },[workingHourData])


    useEffect(() => {

        let _equipTypeSelectedId = '0';

    switch(equipmentTypeData){
            case 'all':
                _equipTypeSelectedId = '0';
                break;
            case 'large':
                _equipTypeSelectedId = '1';
                break;
            case 'medium':
                _equipTypeSelectedId = '2';
                break;
            case 'small':
                _equipTypeSelectedId = '3';
                break;
        }

        setEquipTypeSelectedId(_equipTypeSelectedId)

    },[equipmentTypeData])

    useEffect(() => {
        let _mainStatusSelectedId = 0

        switch(mainStatus){
            case 'activePercent':
                _mainStatusSelectedId = 0;
                break;
            case 'idlePercent':
                _mainStatusSelectedId = 1;
                break;
            case 'offPercent':
                _mainStatusSelectedId = 2;
                break;
        }

        setMainStatusSelectedId(_mainStatusSelectedId)


    },[mainStatus])
    

    return (
        <div className={classes.inquiryLayout} >
            {timePicker &&
                <TimePicker 
                    start={date.startDate} 
                    end={date.endDate} 
                    startTime={startTime}
                />
            }
            {workingHour && workingRotationData?.rotationList?.length >0 && 
                <WorkingHour 
                    workingHourData={workingHourData}
                    workingHourSelectedId={workingHourSelectedId}
                    workingRotationData={workingRotationData}
                /> 
            }
            {equipmentType &&
                <EquipmentType
                    equipmentTypeData={equipmentTypeData}
                    equipTypeSelectedId={equipTypeSelectedId}
                />
            }
            {operatingStatusType &&
                <OperatingStatusType
                    mainStatus={mainStatus}
                    mainStatusSelectedId={mainStatusSelectedId}
                    onlyMain={onlyMain}
                />
            }
        </div>
    )
}
