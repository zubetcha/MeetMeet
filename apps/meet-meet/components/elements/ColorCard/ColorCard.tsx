import classes from './ColorCard.module.scss'
import classNames from 'classnames'


export const ColorCard = () => {
  
  const colorTypes = [
    'primary', 
    'onPrimary', 
    'primaryContainer', 
    'onPrimaryContainer',
    'secondary',
    'onSecondary',
    'secondaryContainer',
    'onSecondaryContainer',
    'tertiary',
    'onTertiary',
    'tertiaryContainer',
    'onTertiaryContainer',
    'error',
    'onError',
    'errorContainer',
    'onErrorContainer',
    'background',
    'onBackground',
    'surface',
    'onSurface',
    'surfaceVariant',
    'onSurfaceVariant',
    'outline',
    'warning',
    'onWarning',
    'warningContainer',
    'onWarningContainer'
  ]
  
  return (
    <div className={classes.colorLayout} >
      {colorTypes.map((color, idx) => {
        return (
          <div className={classNames(classes[color], classes.card)} key={`colorCard-${idx}`} >
            <span>{color}</span>
          </div>
        )
      })}
    </div>
  )
}