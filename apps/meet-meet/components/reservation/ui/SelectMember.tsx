import { TitleLayout } from "./TitleLayout"
import classNames from "classnames"
import classes from './reservation.module.scss'
import { Button, Select } from "@components/ui"
import { useGetAccountsByDepartment, useGetDepartments } from "@hooks/queries/meetroom/useGetQueries"
import { useEffect, useState } from "react"

interface Props {
  selectedMembers: any
  setSelectedMembers: (st:any) => void
}

type memberType = {
  id: number;
  name: string;
}

export const SelectMemeber = ({
  selectedMembers,
  setSelectedMembers
}:Props) => {
  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [members, setMemebers] = useState<any[]>([]);
  const {data: departmentList } = useGetDepartments()
  const {data: accountList} = useGetAccountsByDepartment(selectedDepartment);

  useEffect(() => {
    if (accountList?.accountByDepartment) setMemebers(accountList?.accountByDepartment);
    else setMemebers([]);
  }, [accountList])

  const addMembers = (member:memberType) => {
    const _selectedMembers =  [...selectedMembers, member].filter((value, index, self) => {
      return index === self.findIndex((m) => ( m.id === value.id ))
    })

    setSelectedMembers(_selectedMembers);
  }

  const deleteMemeber = (member:memberType) => {
    const _selectedMemeber = selectedMembers.filter((value:memberType, index:number) => {
      return value.id !== member.id;
    })

    setSelectedMembers(_selectedMemeber);
  }

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
                onChange={(member) => addMembers(member)}
                style={{width: '100%'}}
                label="참여자 이름"
              >
                {members.map((member, idx) => {
                return <Select.Option id={`${member.id}`} name={member.name} key={`team-selectOption-${idx}`} />
              })}
            </Select>
            <div className={classes['selected-member-list']} >
              {selectedMembers.map((member:memberType, idx:number) => {
                return (
                  <Button 
                    key={`selectedMember-${idx}`}
                    label={member.name}
                    size="medium"
                    configuration="textGray"
                    onClick={() => deleteMemeber(member)}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </TitleLayout>
  )
}