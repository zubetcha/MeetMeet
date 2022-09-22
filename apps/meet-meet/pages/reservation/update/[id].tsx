import classes from '../reservationPage.module.scss';
import { Reservation } from '@components/reservation/ui/Reservation';
import { useRouter } from 'next/router';
import { useGetReservationById } from '@hooks/queries/reservation/useGetQueries';

const ReservationUpdatePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: reservationInfo } = useGetReservationById(parseInt(id as string))

    return (
        <div className={classes["pageContainer"]} >
            <Reservation reservationInfo={reservationInfo?.reservationById} />
        </div>
    )
}

export default ReservationUpdatePage;