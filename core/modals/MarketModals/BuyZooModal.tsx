import React from "react";
import { ApplicationModal } from "state/application/actions";
import { useBuyZooModalToggle, useModalOpen } from "state/application/hooks";
import Modal from "components/Modal";

interface BuyZooModalProps {}

const BuyZooModal: React.FC<BuyZooModalProps> = ({}) => {
  const buyZooModal = useModalOpen(ApplicationModal.BUYZOO);
  const toggleBuyZooModal = useBuyZooModalToggle();

  return (
    <Modal
      isOpen={buyZooModal}
      onDismiss={() => null}
      isMax
      maxWidth={1200}
      maxHeight={80}
    >
      <div className="flex flex-col items-center" onClick={toggleBuyZooModal}>
        <h1>Buy Zoo Modal</h1>
      </div>
    </Modal>
  );
};

export default BuyZooModal;
