export const getSortedData=(x:any, y:any, sortedBy:string)=>{
    if (x == y){
      return 0;
    }
    else if (x === null){
      return 1;
    }
    else if (y === null){
      return -1;
    }
    if(sortedBy == "asc"){
      return x>y ? 1 : -1;
    } 
    else{
      return x>y ? -1 : 1;
    }
}