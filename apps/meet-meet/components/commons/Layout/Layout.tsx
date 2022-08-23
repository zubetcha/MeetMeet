import { useState } from 'react';
import classes from './Layout.module.scss';
import classNames from 'classnames';
import { navInfo } from '@shared/pageInfo';
import MeetmeetLogo from '../../../public/svg/meetmeet_horizontal.svg'
import { Navbar } from '../../ui/index'


interface LayoutProps {
    children: JSX.Element[] | JSX.Element;
}


export const Layout = ({children}: LayoutProps) => {

    const [isClose, setIsClose] = useState<boolean>(false);

    return (
        <div className={classes.layoutContainer} >
            <Navbar isClose={isClose} setClose={setIsClose} navInfo={navInfo} Logo={MeetmeetLogo} />
            <div className={classNames(classes.pageBody, isClose ? classes.close: "" )}>{children}</div>
        </div>
    )
}