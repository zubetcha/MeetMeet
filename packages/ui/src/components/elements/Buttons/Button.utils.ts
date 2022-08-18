


export const getSVGColorsByButtonStatus = (configuration:string, isNegative:boolean, isDisable:boolean) => {

  if(isDisable) return 'onSurface';

  switch(configuration){
    case 'filled':
      if(isNegative) return 'onError';
      else return 'onPrimary';
    
    case 'tonal':
      if(isNegative) return 'onErrorContainer'
      else return 'onSecondaryContainer';

    case 'outlined':
    case 'text':
      if(isNegative) return 'error'
      else return 'primary';

    case 'textGray':
      return 'onSurfaceVariant'
  }

}

export const getSVGSizeByButtonSize = (size:string) => {
  
  switch(size){
    case 'large':
      return {
        width: '24px',
        height: '24px'
      }
    
    case 'medium':
      return {
        width: '20px',
        height: '20px'
      }
    
    case 'small':
      return {
        width: '16px',
        height: '16px'
      }
    
    default: 
      return {
        width: '24px',
        height: '24px'
      }
  }
}