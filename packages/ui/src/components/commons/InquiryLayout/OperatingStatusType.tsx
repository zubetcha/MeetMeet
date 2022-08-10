import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from "next/router";

import { Text, ButtonGroup, Button, Checkbox, SVG } from "../../elements";
import { colors } from '../../../shared/style';
import classes from './inquiry-layout.module.scss';
import { OperatingStatusTypeProps } from '../../../types/ui.types';


export const OperatingStatusType = ({
  mainStatus,
  mainStatusSelectedId,
  onlyMain
}:OperatingStatusTypeProps) => {
  const router = useRouter();
  const [selectedId, setSelectedId]=useState<any>(mainStatusSelectedId);
  const firstUpdate = useRef(true);
  const [isChecked, setIsChecked] = useState(onlyMain);

  useEffect(()=>{
    setSelectedId(mainStatusSelectedId);
  },[mainStatusSelectedId])

  useEffect(() => {
    setIsChecked(onlyMain);
  },[onlyMain])

  useEffect(() => {
    if (firstUpdate.current){
      firstUpdate.current = false;
      return;
    }

    let _mainStatus = '';

    switch(selectedId){
      case 0:
        _mainStatus = 'activePercent'
        break;
      case 1:
        _mainStatus = 'idlePercent'
        break;
      case 2:
        _mainStatus = 'offPercent'
        break;
    }

    router.push(
      {query: {
        ...router.query,
        mainStatus: _mainStatus,
      }},
      undefined,
      {shallow: true}
    )

  },[selectedId])

  const clickCheckedButton = () => {
    router.push(
      {query: {
        ...router.query,
        onlyMain: isChecked? false:true,
      }},
      undefined,
      {shallow: true}
    )

    setIsChecked(isChecked? false : true);
  }

  const statusList = ["가동", "유휴", "정지"]
  const colorList = [colors.primary500, colors.warningMedium, colors.dangerMedium]
  const buttonList = new Array(statusList.length).fill(0).map((_, idx) => {
    return { text: statusList[idx], color: colorList[idx] };
  })

  return(
    <div className={classes.inquiryBox} >
      <div className={classes.description} >
        <Text text="표시 기준 상태" weight="regular" type="caption1" />
      </div>
      <div className={classes.buttonBox} >
        <div>
          <ButtonGroup style="line" selectedId={selectedId} setSelectedId={setSelectedId} >
            <Button 
              text="가동" 
              icon={<SVG name="ellipse" color={colors.primary500} />} 
              iconLocation="left"
            />
            <Button 
              text="유휴"
              icon={<SVG name="ellipse" color={colors.warningMedium} />} 
              iconLocation="left"
            />
            <Button 
              text="정지"
              icon={<SVG name="ellipse" color={colors.dangerMedium} />} 
              iconLocation="left"
            />
          </ButtonGroup>
        </div>
        <Checkbox name="operatingStatus" id="operatingStatus" checked={isChecked} onChange={clickCheckedButton} 
          label="선택 상태만 표시" status="default"
        />
      </div>
    </div>
  )
}

export default OperatingStatusType;