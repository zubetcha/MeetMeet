import classes from './reservationPage.module.scss'
import { Reservation } from '@components/reservation/ui/Reservation';

const ReservationPage = () => {
  return (
    <div className={classes["pageContainer"]} >
      <Reservation/>
    </div>
  )
};

export default ReservationPage;
