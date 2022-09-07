import { useRecoilValue } from "recoil";
import successState from "recoil/success/atom";
import { Modal } from "ui/src/pages"

export const SuccessModal = () => {
  const { isOpen, title } = useRecoilValue(successState);

  if (isOpen) {
    return (
      <Modal>
        <Modal.Icon name="done" color="primary" />
        <Modal.Contents>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Contents>
      </Modal>
    )
  }

  return null;
}

