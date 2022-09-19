export interface Alarm {
  notification: {
    title: string;
    description: string;
  };
  data: {
    reservationId: string | number;
    createdAt: string;
  }
}