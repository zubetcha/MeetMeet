import Select, { StylesConfig } from 'react-select';
import chroma from "chroma-js";

export const colourStyles: StylesConfig<any> = {
    control: (styles) => ({ ...styles, 
        width:200,
        backgroundColor: 'white' 
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return{
            ...styles,
        }
    //   return {
    //     ...styles,
    //     backgroundColor: isDisabled? '#fff'
    //     color: isDisabled
    //       ? '#ccc'
    //       : isSelected
    //       ? chroma.contrast(color, 'white') > 2
    //         ? 'white'
    //         : 'black'
    //       : data.color,
    //     cursor: isDisabled ? 'not-allowed' : 'default',
  
    //     ':active': {
    //       ...styles[':active'],
    //       backgroundColor: !isDisabled
    //         ? isSelected
    //           ? data.color
    //           : color.alpha(0.3).css()
    //         : undefined,
    //     },
    //   };
    // },
    // multiValue: (styles, { data }) => {
    //   const color = chroma(data.color);
    //   return {
    //     ...styles,
    //     backgroundColor: color.alpha(0.1).css(),
    //   };
    // },
    // multiValueLabel: (styles, { data }) => ({
    //   ...styles,
    //   color: data.color,
    // }),
    // multiValueRemove: (styles, { data }) => ({
    //   ...styles,
    //   color: data.color,
    //   ':hover': {
    //     backgroundColor: data.color,
    //     color: 'white',
    //   },
    // }),
  }}