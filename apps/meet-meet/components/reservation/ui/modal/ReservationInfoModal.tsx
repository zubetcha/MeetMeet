import { useState } from "react";
import { formatReservationTime } from "@components/reservation/utils/formatReservationTime";
import { Button, Modal } from "@components/ui"
import { useRecoilState } from "recoil";
import userState from "recoil/user";
import { useGetReservationById } from "@hooks/queries/reservation/useGetQueries";
import classes from '../reservation.module.scss';
import { useDeleteReservation } from "@hooks/queries/reservation/useMutationQueries";
import { useRouter } from "next/router";
import Link from "next/link";
import { refetchState } from "recoil/reservation/atom";

interface Props {
  reservationId: number;
  setIsOpen: (st:boolean) => void;
}

export const ReservationInfoModal = ({
  reservationId,
  setIsOpen
}:Props) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [refetch, setRefetch] = useRecoilState(refetchState);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const {data:reservationInfo} = useGetReservationById(reservationId);
  const deleteReservationMutation = useDeleteReservation();
  const router = useRouter();

  console.log(reservationInfo);

  const getMeetRoomNames = () => {
    const names = reservationInfo?.reservationById.meetRoomList.map((room) => {
      return room.name
    })
    return names;
  }

  const getHostName = () => {
    const _account = reservationInfo?.reservationById.participantList.find(account => account.isHost);

    return _account?.account.name;
  }

  const getParticipantNames = () => {
    let names: string[] = [];

    reservationInfo?.reservationById.participantList.map((account) => {
      if(!account.isHost) {
        names.push(account.account.name);
      }
    })

    return names;
  }

  const getParticipantIdList = () => {
    const hostAccount = reservationInfo?.reservationById.participantList.filter(account => account.isHost)
    if(hostAccount) return [hostAccount[0].account.id];
    else return [];
  }

  const deleteReservation = () => {
    deleteReservationMutation.mutateAsync(reservationId, {
      onSuccess:((res) => {
        console.log(res);
        handleOnSuccess();
      }),
      onError: ((error) => {
        console.log(error);
      })
    })
  }

  const handleOnSuccess = () => {
    setIsConfirmModal(true);
    setRefetch({refetch:true});
    setTimeout(() => {
      setRefetch({refetch:false});
      setIsOpen(false);
    }, 1300)
  }

  const timeList = Array.from({length: 22}, (_, idx:number) => {
    const hour = Math.floor((idx + 16)/2);
    return `${hour < 10 ? '0' + hour : hour}:${idx%2*3}0`
  })

  const routeToUpdate = () => {
    const startTimeIdx = timeList.findIndex(time => time === reservationInfo?.reservationById.startTime);
    const endTimeIdx = timeList.findIndex(time => time === reservationInfo?.reservationById.endTime);

    router.push({
      pathname:`reservation/update/${reservationId}`,
      query: {
        roomId: reservationInfo?.reservationById.meetRoomList[0].id,
        date: reservationInfo?.reservationById.date,
        startTimeId: startTimeIdx,
        endTimeId: endTimeIdx -1,
        isChecked: reservationInfo?.reservationById.meetRoomList.length === 2 ? 1 : 0
      }
    })
  }

  return (
    <Modal setIsOpen={setIsOpen} >
      <Modal.Title type='title-large' weight='bold' >예약 정보</Modal.Title>
      <Modal.Description>
        {reservationInfo &&
          <div className={classes['infoModal-description-container']} >
            <div className={classes['description-section']} >
              <div className={classes['section-key']} >회의실</div>
              <div className={classes['section-value']} >{getMeetRoomNames()?.toString()}</div>
            </div>
            <div className={classes['description-section']} >
              <div className={classes['section-key']} >사용 시간</div>
              <div className={classes['section-value']} >{formatReservationTime(reservationInfo?.reservationById.date, reservationInfo?.reservationById.startTime, reservationInfo?.reservationById.endTime)}</div>
            </div>
            <div className={classes['description-section']} >
              <div className={classes['section-key']} >회의 제목</div>
              <div className={classes['section-value']} >{reservationInfo.reservationById.title}</div>
            </div>
            <div className={classes['description-section']} >
              <div className={classes['section-key']} >회의 안건</div>
              <div className={classes['section-value']} >{reservationInfo.reservationById.content}</div>
            </div>
            <div className={classes['description-section']} >
              <div className={classes['section-key']} >초대자</div>
              <div className={classes['section-value']} >{getHostName()}</div>
            </div>
            <div className={classes['description-section']} >
              <div className={classes['section-key']} >참여자</div>
              <div className={classes['section-value']} >{getParticipantNames()?.toString()}</div>
            </div>
          </div>
        }
      </Modal.Description>
      <Modal.Buttons>
        <Button
          label='취소'
          configuration='textGray'
          onClick={() => setIsOpen(false)}
        />
        {(userInfo.id && getParticipantIdList().includes(userInfo.id)) 
          ?
            <>
              <Button
                label='예약 취소하기'
                configuration='outlined'
                onClick={deleteReservation}
              />
                <Button
                  label='예약 수정하기'
                  configuration='filled'
                  onClick={routeToUpdate}
                />
            </>
          : 
            <>
            </>
        }
      </Modal.Buttons>
      {isConfirmModal &&
        <Modal>
          <Modal.Icon name='done' color='primary'/>
          <Modal.Title>회의 취소가 완료되었습니다.</Modal.Title>
        </Modal>
      }
    </Modal>
  )
}