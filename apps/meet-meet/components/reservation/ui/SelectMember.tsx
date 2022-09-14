import { TitleLayout } from "./TitleLayout"
import classNames from "classnames"
import classes from './reservation.module.scss'
import { Select } from "@components/ui"
import { useGetAccountsByDepartment, useGetDepartments } from "@hooks/queries/meetroom/useGetQueries"
import { useState } from "react"

interface Props {
  
}


export const SelectMemeber = ({

}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const {data: departmentList } = useGetDepartments()
  const {data: accountList} = useGetAccountsByDepartment(selectedDepartment);
  const memeberList = new Array(4).fill(null).map((_, idx) => {
    return {
      id: `${idx + 1}`,
      name: `이대호${idx+1}`
    }
  })

  console.log(accountList)


  return(
    <TitleLayout title='참여자 초대'>
      <div className={classNames(classes['children-wrapper'], classes['space-between'])} >
          <div className={classes['team-select']} >
            <Select
              isSearch={false}
              defaultValue={''}
              onChange={(department) => setSelectedDepartment(parseInt(department.id))}
              style={{width: '100%'}}
              label="팀"
            >
              {departmentList?.departments.map((department, idx) => {
                return <Select.Option id={`${department.id}`} name={department.name} key={`department-selectOption-${idx}`} />
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
                {accountList?.accountByDepartment.map((member, idx) => {
                return <Select.Option id={`${member.id}`} name={member.name} key={`team-selectOption-${idx}`} />
              })}
            </Select>
          </div>
        </div>
      </TitleLayout>
  )
}