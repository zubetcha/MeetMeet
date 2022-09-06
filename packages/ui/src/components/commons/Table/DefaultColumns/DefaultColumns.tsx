import { IndeterminateCheckbox } from "../IndeterminateCheckbox/IndeterminateCheckbox"

export const CheckboxColumn=()=>{
  return{
    id: 'selection',
    // The header can use the table's getToggleAllRowsSelectedProps method
    // to render a checkbox
    Header: ({ getToggleAllRowsSelectedProps }:any) => (
      <div>
        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
      </div>
    ),
    // The cell can use the individual row's getToggleRowSelectedProps method
    // to the render a checkbox
    Cell: ({ row }:any) => (
      <div>
        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
      </div>
    ),
    width:50,
    minWidth:50,
    maxWidth: 50,
    canResize: false,
    canSort:false,
    canFilter:false
  }
}

export const RadioColumn =(headerName:string)=>{
  return{
    id: 'radio',
    // The header can use the table's getToggleAllRowsSelectedProps method
    // to render a checkbox
    Header: ({ getToggleAllRowsSelectedProps }:any) => (
      <div>
        {headerName}
      </div>
    ),
    width:150,
    minWidth:150,
    maxWidth: 150,
    canSort:false,
    canFilter:false,
  }
}
