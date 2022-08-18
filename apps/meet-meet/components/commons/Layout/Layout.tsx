import { useState } from 'react';
import classes from './Layout.module.scss';
import classNames from 'classnames';
import { Navbar } from '../../ui/index'


interface LayoutProps {
    children: JSX.Element[] | JSX.Element;
}


export const Layout = ({children}: LayoutProps) => {

    const [close, setClose] = useState<boolean>(false);

    return (
        <div className={classes.layoutContainer} >
            <Navbar close={close} setClose={setClose} />
            <div className={classNames(classes.pageBody, close ? classes.close: "" )}>{children}</div>
        </div>
    )
}