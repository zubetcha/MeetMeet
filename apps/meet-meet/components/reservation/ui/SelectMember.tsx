import { TitleLayout } from "./TitleLayout"
import classNames from "classnames"
import classes from './reservation.module.scss'
import { Select } from "@components/ui"



export const SelectMemeber = () => {

  const memeberList = new Array(4).fill(null).map((_, idx) => {
    return {
      id: `${idx + 1}`,
      name: `이대호${idx+1}`
    }
  })
  
  const teamList = new Array(4).fill(null).map((_, idx) => {
    return {
      id: `${idx + 1}`,
      name: `ICT${idx+1}팀`
    }
  })


  return(
    <TitleLayout title='참여자 초대'>
      <div className={classNames(classes['children-wrapper'], classes['space-between'])} >
          <div className={classes['team-select']} >
            <Select
              isSearch={false}
              defaultValue={''}
              onChange={() => {}}
              style={{width: '100%'}}
              label="팀"
            >
              {teamList.map((team, idx) => {
                return <Select.Option id={team.id} name={team.name} key={`team-selectOption-${idx}`} />
            })}
            </Select>
          </div>
          <div className={classes['member-select']} >
            <Select
                isSearch={false}
                defaultValue={''}
                onChange={() => {}}
                style={{width: '100%'}}
                label="참여자 이름"
              >
                {memeberList.map((member, idx) => {
                return <Select.Option id={member.id} name={member.name} key={`team-selectOption-${idx}`} />
              })}
            </Select>
          </div>
        </div>
      </TitleLayout>
  )
}