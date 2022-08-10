import React, {useState, useEffect} from 'react'
import { onInputChange } from '../utils/onInputChange';


interface useFormProps{
    initialValues: any;
    initialInputStatus:any;
    initialHelperText:any;
}

/**
 * 
 * @param values : Form values 값 객체
 * @param setValues : Form 변경 함수
 * @param sendSubmit : 반영 submit 함수 (mutate or promise)
 * @returns 
 */
export default function useForm({initialValues , initialInputStatus, initialHelperText} : useFormProps) {

    // Form submit 버튼 state
    const [values, setValues]= useState(initialValues);

    const [helperText, setHelperText]=useState(initialHelperText);

    const [inputStatus, setInputStatus]=useState(initialInputStatus);

    const [btnState, setBtnState]=useState("default");


    // unMount 될 때 상태값 정리.
    useEffect(()=>{
        return()=>{

        }   
    })

    // Form 버튼 비활성화
     useEffect(()=>{
        let flag=true;
        for (const [key, value] of Object.entries(values)){
            if(["email"].includes(key)){ continue }
            if(typeof value == 'string' && value.length==0){
                flag=false
            }
        }
        if(Object.keys(values).includes('isSuper') && values.isSuper==-1){
            flag=false
        }

  
        flag
        ? setBtnState("default")
        : setBtnState("disable")
    },[values])

    // Input onChange 함수
    const onChange=(e:React.ChangeEvent<any>)=>{
        const {name, value}=e.target;
        setValues({
            ...values,
            [name]:value
        })
        handleValidation(name, value);
    }

    // Input value 유효성 검사 함수
    const handleValidation=(name:string, value:string)=>{
        const _status= inputStatus[name]
        const _name =
            name =="phone" 
            ? "phoneNumber" 
            : name;
        const result= onInputChange(_name, value, _status)
        console.log(result);
        if(result.is_change){
            setInputStatus({...inputStatus, [name]:result.changeStatus});
            setHelperText({...helperText, [name]:result.changeHelperText})
        }
    }


    return {
        values,
        inputStatus,
        helperText,
        setValues,
        setInputStatus,
        setHelperText,
        onChange,
        btnState,
        setBtnState
    }
}
