import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import {Button} from "../../elements";
import classes from './myPage-modal.module.scss';
import { MyPageModalProps } from "../../../types/ui.types";
import { SVG } from '../../elements';
import { colors } from '../../../shared/style';
import ButtonIcon from "../../../assets/img/icon-reset-40x40.png"


export const MyPageModal = ({
    userInfo, 
    setMyPageModal,
    setPasswordChangeModal
}:MyPageModalProps) => {

    const clickChangePasswordBtn = () => {
        setMyPageModal(false);
        setPasswordChangeModal(true);
    }

    return (
        <div className={classes.modalContainer} >
            <div className={classes.modalOuterBox} ></div>
            <div className={classes.modalInnerBox} >
                <div className={classes.header} >
                    <div className={classNames(classes.body1, classes.bold)} >{userInfo.name}</div>
                    <div className={classes.body2}>{`(ID: ${userInfo.username})`}</div>
                    <Button
                        text="비밀번호 변경"
                        size="small"
                        style="line"
                        icon={<SVG name="reset" width="16" height="16" color={colors.primary500} />}
                        onClick={clickChangePasswordBtn}
                    />
                </div>
                <div className={classes.body2}>{userInfo.isSuper? "관리자":"일반 사용자"}</div>
                <div className={classes.body2}>{userInfo.department}</div>
                <div className={classes.body2}>{userInfo.email}</div>
                <div className={classes.body2}>{userInfo.phone}</div>
                <Button
                    text="창 닫기"
                    size="large"
                    style="solid"
                    width="100%"
                    onClick={()=>{setMyPageModal(false)}}
                />
            </div>
        </div>
    )
}