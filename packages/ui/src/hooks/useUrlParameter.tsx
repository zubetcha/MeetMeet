import { useRouter } from "next/router";

/**
 * @function useUrlParameter - url 쿼리스트링에서 특정 값을 추출하는 함수
 * @param {string} name - 파싱할 값의 키 이름
 * @returns {string} - url에서 파싱한 값
 */
export const useUrlParameter = (name: string) => {
  const router = useRouter();

  const _name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
  const regexp = new RegExp('[\\?&]' + _name + '=([^&#]*)');
  const results = regexp.exec(router.asPath);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}