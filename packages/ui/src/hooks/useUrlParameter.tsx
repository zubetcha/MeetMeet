import { useRouter } from "next/router";

export const useUrlParameter = (name: string) => {
  const router = useRouter();

  const _name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
  const regexp = new RegExp('[\\?&]' + _name + '=([^&#]*)');
  const results = regexp.exec(router.asPath);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}