import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';

import FactoroidImg from '../../../assets/img/factoroid.png'
import classes from './entire-layout.module.scss';
import classNames from 'classnames';
import { navBarProps } from '../../../types/ui.types';

import { Button, ExitBtn } from "../../elements";


/**
 * @param close navbar 닫혔는지 않닫혔는지 판단하는 상태 변수
 * @param setClose navbar close 상태관리 함수
 * @param customerInfo 현 페이지 고객사 정보 및 고객사 페이지 정보
 * @param shouldLogin 로그인이후에 접근이 가능한 페이지인지 아닌지 판단 로그아웃 버튼 & 유저정보를 조건부로 표시
 * @param userInfo 로그인 이후에 서버에서 보내준 유저 정보
 * @param setMyPageModal 마이 페이지 모달 상태 setter 함수
 * @param clickLogout 로그아웃 버튼 클릭시에 실행되는 함수
 */

// 고객 정보를 받아서 만든 Navbar 컴포넌트
export const Navbar = ({close, setClose, clickLogout, customerInfo, shouldLogin, userInfo, setMyPageModal}:navBarProps) => {
    const router = useRouter();
    const customer = customerInfo?.customer;
    const pages = customerInfo?.pages;

    useEffect(() => {
      if(shouldLogin){
        router.prefetch('/login');
      }
    }, [])

    return (
      <>
        <div
          className={classNames(
            classes.navbarContainer,
            close ? classes.close : ""
          )}
        >
          <div className={classes.exitBox}>
            <ExitBtn close={close} setClose={setClose} />
          </div>
          <div className={classes.headerContainer}>
              <div className={classes.logoutBox}>
                {shouldLogin
                  ? <Button
                      size="medium"
                      text="로그아웃"
                      style="textWhite"
                      onClick={clickLogout}
                    />
                  : <div className={classes.emptyBox} ></div>
                }
              </div>

            <div className={classes.imageBox}>
              <Image src={FactoroidImg}/>
            </div>
            <div className={classes.customerName}>{customer?.title}</div>
            <div className={classes.myPageBtn} onClick={()=>{setMyPageModal(true)}} >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433286 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 7.34783 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0ZM5.07 16.28C5.5 15.38 8.12 14.5 10 14.5C11.88 14.5 14.51 15.38 14.93 16.28C13.5282 17.3938 11.7905 18.0001 10 18.0001C8.20955 18.0001 6.47185 17.3938 5.07 16.28ZM16.36 14.8333C14.93 13.09 11.46 12.5 10 12.5C8.54 12.5 5.07 13.09 3.64 14.8333C2.73535 13.6477 2.18011 12.2329 2.03695 10.7484C1.89379 9.26397 2.16841 7.76907 2.82982 6.43243C3.49123 5.09579 4.51309 3.97064 5.78006 3.18398C7.04704 2.39732 8.50868 1.98046 10 1.98046C11.4913 1.98046 12.953 2.39732 14.2199 3.18398C15.4869 3.97064 16.5088 5.09579 17.1702 6.43243C17.8316 7.76907 18.1062 9.26397 17.9631 10.7484C17.8199 12.2329 17.2647 13.6477 16.36 14.8333ZM10 4C9.30777 4 8.63108 4.20527 8.05551 4.58986C7.47994 4.97444 7.03133 5.52107 6.76643 6.16061C6.50152 6.80015 6.43221 7.50388 6.56726 8.18282C6.7023 8.86175 7.03565 9.48539 7.52513 9.97487C8.01461 10.4644 8.63825 10.7977 9.31719 10.9327C9.99612 11.0678 10.6999 10.9985 11.3394 10.7336C11.9789 10.4687 12.5256 10.0201 12.9101 9.4445C13.2947 8.86892 13.5 8.19223 13.5 7.5C13.5012 7.04003 13.4115 6.58436 13.236 6.15918C13.0606 5.73399 12.8028 5.34768 12.4776 5.02243C12.1523 4.69718 11.766 4.43942 11.3408 4.26396C10.9156 4.08849 10.46 3.99879 10 4ZM10 9C9.70333 9 9.41332 8.91203 9.16665 8.7472C8.91998 8.58238 8.72772 8.34811 8.61419 8.07402C8.50065 7.79994 8.47095 7.49833 8.52883 7.20736C8.5867 6.91639 8.72957 6.64912 8.93934 6.43934C9.14912 6.22956 9.4164 6.0867 9.70737 6.02882C9.99834 5.97094 10.2999 6.00065 10.574 6.11418C10.8481 6.22771 11.0824 6.41997 11.2472 6.66664C11.412 6.91332 11.5 7.20333 11.5 7.5C11.5 7.89782 11.342 8.27935 11.0607 8.56066C10.7794 8.84196 10.3978 9 10 9Z" fill="white"/>
              </svg>
              <div className={classes.name} >{userInfo.isGEC ? '젠틀에너지' : userInfo.name}</div>
              {/* <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 0L0.589996 1.41L5.17 6L0.589996 10.59L2 12L8 6L2 0Z" fill="white"/>
              </svg> */}
            </div>

            <div className={classes.menuBox}>
              {pages?.map((page: any, idx: any) => {
                if(customer.path === "admin" || customer.path === "demo"){
                  router.prefetch(`/${customer.path}/${page.path}`);
                }else{
                  router.prefetch(`/${page.path}`);
                }
                
                // 버튼 클릭했을 때 페이지 변경
                const onRoutePage = () => {
                  if(customer.path === "admin" || customer.path === "demo"){
                    router.push(`/${customer.path}/${page.path}`);
                  }else{
                    router.push(`/${page.path}`);
                  }
                };

                const is_currentPage = router.asPath.includes(page.path);
                
                return (
                  <Button
                    key={`pages_${idx}`}
                    state={is_currentPage? "focused" : "default"}
                    justifyContent="default"
                    onClick={onRoutePage}
                    size="large"
                    text={page.title}
                    borderRadius="0px"
                    width="100%"
                    style="solid"
                    padding="8px 0px"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
}
