import { Text } from '@components/ui';
import classes from './reservation.module.scss';

interface Props {
  title: string;
  subTitle?: string;
  children: JSX.Element | JSX.Element[]
}


export const TitleLayout = ({
  title,
  subTitle,
  children
}:Props) => { 
  return (
    <div className={classes["title-container"]} >
      <div className={classes['title-layout']} >
        <div className={classes['title-box']} >
          <Text type={'title-medium'} >{title}</Text>
          {subTitle && 
            <Text 
              type={'title-small'} 
              style={{color:'var(--color-primary)'}} 
            >
              {subTitle}
            </Text>
          }
        </div>
        <div className={classes['title-divider']} />
      </div>

      {children}
    
    </div>
  )
}