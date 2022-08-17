


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

    case 'textGary':
      return 'onSurfaceVariant'
  }

}