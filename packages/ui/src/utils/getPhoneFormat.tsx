/**
 * @function getPhoneFormat - TextField에 입력한 숫자롤 xxx-xxxx-xxxx의 형태로 변환해주는 함수
 * @param {string} value - TextField에 입력한 값
 * @returns 
 */
export const getPhoneFormat = (value: string) => {
  return value.replace(/[^0-9]/g, "").replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}