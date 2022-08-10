import { useEffect , useState} from 'react';
import classes from './container.module.scss';
interface ParamProps{
    children:any;

}
export function Container({children}:ParamProps){
    
    const handleClassProps=()=>{

    }

    useEffect(()=>{
        handleClassProps();
    },[]);

    return(
        <div className={classes.container}>{children}</div>
    )
}
