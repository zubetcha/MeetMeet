export const formatDate = (date: Date) => {
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const handleConvertDiff = (duration: number) => {
  let HH = 0;
  let MM = 0;
  let SS = 0;

  if (duration < 1000 * 60) {
    SS = Math.round(duration / 1000);

    return `${SS}초`;
  } else if (duration < 1000 * 60 * 60) {
    MM = Math.floor(duration / 1000 / 60);
    SS = Math.round((duration / 1000) % 60);

    return `${MM}분 ${SS}초`;
  } else if (duration < 1000 * 60 * 60 * 24) {
    HH = Math.floor(duration / 1000 / 60 / 60);
    MM = Math.round((duration / 1000 / 60) % 60);
    SS = Math.round((duration / 1000 / 60 / 60) % 24);

    return `${HH}시간 ${MM}분 ${SS}초`;
  }
};

// DESCRIBE: 날짜 형식을 YYYY-MM-DD HH:00 형식으로 포매팅해주는 함수
export const formatDateHour = (newDate: Date): string => {
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString();
  const date = newDate.getDate().toString();
  const hour = newDate.getHours();

  const _month = month.length > 1 ? month : `0${month}`;
  const _date = date.length > 1 ? date : `0${date}`;

  return `${year}-${_month}-${_date} ${hour}:00`;
};

export const formatTime = (time: Date) => {

  const hour = time.getHours();
  const minute = time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`;
  const secont = time.getSeconds() >= 10 ? time.getSeconds() : `0${time.getSeconds()}`;
  
  return `${hour}:${minute}:${secont}`
}
