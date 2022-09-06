import React, {useRef, forwardRef, useEffect} from 'react';
import Image from 'next/image';
import { SVG } from '../../../elements';
import classes from './indeterminateCheckbox.module.scss';
import { colors } from '../../../../shared/style';

// eslint-disable-next-line react/display-name
export const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }:any, ref:any)=> {
      const defaultRef =useRef()
      const resolvedRef = ref || defaultRef
  
  useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
      <label>
          <span className={classes.checkbox}>
            {indeterminate
                 ? <SVG 
                    name="checkIndeterminated"
                    width={"20px"}
                    height={"20px"}
                    color={colors.primary500}
                  ></SVG>
                 : rest.checked 
                    ? <SVG
                        name="checked"
                        width={"20px"}
                        height={"20px"}
                        color={"#076D36"}
                    ></SVG>
                    : <SVG
                        name="unchecked"
                        width={"20px"}
                        height={"20px"}
                    ></SVG>
            }
        </span>
          <input type="checkbox" ref={resolvedRef} {...rest} style={{display:"none"}}/>
      </label>
      </>
    )
  }
)
  