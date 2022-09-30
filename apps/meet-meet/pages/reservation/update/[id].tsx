import classes from '../reservationPage.module.scss';
import { Reservation } from '@components/reservation/ui/Reservation';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import userState from 'recoil/user';
import { useGetReservationById } from '@hooks/queries/reservation/useGetQueries';
import { useEffect } from 'react';

const ReservationUpdatePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: reservationInfo, error } = useGetReservationById(parseInt(id as string))
    const [ userInfo ] = useRecoilState(userState);

    useEffect(() => {
        
        if(error?.message) router.push('/home');

        if(reservationInfo && userInfo) {
            const hostId = reservationInfo.reservationById.participantList.filter(participant => participant.isHost)[0].account.id;
            if(hostId !== userInfo.id){
                router.push('/home');
            }
        }
    }, [reservationInfo, userInfo, error])

    return (
        <div className={classes["pageContainer"]} >
            <Reservation reservationId={parseInt(id as string)} />
        </div>
    )
}

export default ReservationUpdatePage;