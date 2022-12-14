import { TitleLayout } from "./TitleLayout"
import classNames from "classnames"
import classes from './reservation.module.scss'
import { Button, Checkbox, Select } from "@components/ui"
import { useGetAccountsByDepartment, useGetDepartments } from "@hooks/queries/user/useGetQueries"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import userState from "recoil/user"
import { SelectItemType } from "ui/src/components/elements/Select/@types/select.types"

interface Props {
  selectedMembers: any
  setSelectedMembers: (st:any) => void
}

type selectedMemberType = {
  id: number;
  name: string;
  noticeTime?:number;
  role: string;
  __typename: string;
  department: {
    __typename: string;
    id: number;
    name: string;
  }
}

type memberType = SelectItemType


export const SelectMemeber = ({
  selectedMembers,
  setSelectedMembers
}:Props) => {
  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [members, setMemebers] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [isChecked, setIsChecked] = useState(false)
  const {data: departmentList } = useGetDepartments()
  const {data: accountList} = useGetAccountsByDepartment(selectedDepartment);

  useEffect(() => {
    if (accountList?.accountByDepartment) {
      setMemebers(accountList?.accountByDepartment.filter(account => account.id !== userInfo.id));
      setIsChecked(false);
    }
    else setMemebers([]);
  }, [accountList])

  useEffect(() => {
    if(isChecked) addAllMemebers();
    else deleteAllMembers();
  }, [isChecked])

  const getDepartmentName = () => {
    if(accountList?.accountByDepartment){
      const name = departmentList?.departments.filter(team => team.id === selectedDepartment)[0].name;
      return name;
    }
  }

  const addMembers = (member:memberType) => {
    const _member = accountList?.accountByDepartment.find(account => account.id === parseInt(member.id));
    const _selectedMembers =  [...selectedMembers, _member].filter((value, index, self) => {
      return index === self.findIndex((m) => ( m.id === value.id ))
    })

    setSelectedMembers(_selectedMembers);
  }
  
  const deleteMemeber = (member:selectedMemberType) => {
    const _selectedMemeber = selectedMembers.filter((value:selectedMemberType, index:number) => {
      return value.id !== member.id;
    })

    setSelectedMembers(_selectedMemeber);
  }

  const addAllMemebers = () => {
    if(accountList) {
      const _allMembers = accountList.accountByDepartment;
      const _selectedMembers = [...selectedMembers, ..._allMembers].filter((value, index, self) => {
        return (index === self.findIndex((m) => ( m.id === value.id ))) && value.id !== userInfo.id;
      })

      setSelectedMembers(_selectedMembers);
    }
  }

  const deleteAllMembers = () => {
    if(departmentList?.departments.length !== 0 && selectedMembers){

      const _selectedMembers = selectedMembers.filter((value:selectedMemberType, index:number) => {
        return value.department.id !== selectedDepartment
      })
      setSelectedMembers(_selectedMembers);
    }

  }


  return(
    <TitleLayout title='????????? ??????'>
      <div className={classNames(classes['children-wrapper'], classes['flex-column'])} >
          <div className={classes['team-select-box']} >
            <div className={classes['team-select']} >
              <Select
                isSearch={false}
                defaultValue={''}
                onChange={(department) => setSelectedDepartment(parseInt(department.id))}
                style={{width: '100%'}}
                label="???"
              >
                {departmentList?.departments.map((department, idx) => {
                  return <Select.Option id={`${department.id}`} name={department.name} key={`department-selectOption-${idx}`} />
              })}
              </Select>
            </div>
            {accountList?.accountByDepartment.length !== 0 &&
              <div className={classes['selectAll-checkbox']} >
                <Checkbox
                  name="?????? ????????? ?????????"
                  id='meetingRoomMerged-checkbox'
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  forceClick={true}
                >
                  <Checkbox.Label>{`${getDepartmentName()} ?????? ?????? ${isChecked ? '??????' : ''}`}</Checkbox.Label>
                </Checkbox>
              </div>
            }
          </div>
          <div className={classes['member-select']} >
            <Select
                isSearch={false}
                defaultValue={''}
                onChange={(member) => addMembers(member)}
                style={{width: '100%'}}
                label="????????? ??????"
              >
                {members.map((member, idx) => {
                return <Select.Option id={`${member.id}`} name={member.name} key={`team-selectOption-${idx}`} />
              })}
            </Select>
            <div className={classes['selected-member-list']} >
              {selectedMembers.map((member:selectedMemberType, idx:number) => {
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