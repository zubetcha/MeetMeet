import { useSetRecoilState } from "recoil"
import successState from "recoil/success/atom"

export const useHandleSuccess = () => {
  const setSuccess = useSetRecoilState(successState);

  const handleSuccess = ({ title, setIsModal, setIsSecondModal }: handleSuccessParams) => {
    setSuccess({ isOpen: true, title });
    setTimeout(() => {
      setSuccess({ isOpen: false, title: "" });
      if (setIsModal) {
        setTimeout(() => setIsModal(false), 100);
        if (setIsSecondModal) setTimeout(() => setIsSecondModal(false), 100)
      }
    }, 1300)
  }

  return { handleSuccess };
}

interface handleSuccessParams {
  title: string;
  setIsModal?: (is: boolean) => void;
  setIsSecondModal?: (is: boolean) => void;
}