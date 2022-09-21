import { AtomEffect } from "recoil";
import { NoticeDataState } from "./notice";
import localforage from "localforage";

// DESCRIBE: recoil 상태 업데이트 로그 
export const loggingEffect = (state: string): AtomEffect<any> => ({ onSet }) => {
    onSet(state => {
      console.log(`[Recoil] Current ${state} state:`, state);
  });
};

// DESCRIBE: recoil - localForage 상태 동기화 
export const localForageEffect = (key: string): AtomEffect<NoticeDataState> => ({
  setSelf,
  trigger,
  onSet,
 }) => {
  // localForage에 보존되어 있는 상태가 있는 경우 불러와서 recoil에 저장하는 함수 
  const loadPersisted = async () => {
    const savedValue = await localforage.getItem(key);

    if (savedValue) {
      setSelf(JSON.parse(savedValue as string));
    }
  };

  // recoil 상태 구독 -> 보존되어 있는 상태 동기화 
  if (trigger === 'get') {
    loadPersisted();
  };

  // 상태 업데이트가 일어났을 때 localForage에 새로운 상태 저장 
  onSet((newValue, _, isReset) => {
    isReset
      ? localforage.removeItem(key)
      : localforage.setItem(key, JSON.stringify(newValue));
  });

}