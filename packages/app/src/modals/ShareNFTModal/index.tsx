/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useModalOpen, useShareModal } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "../../components/ModalHeader";

export default function ShareNFTModal({
  nft,
  edit = false,
}: {
  nft: any;
  edit?: boolean;
}) {
  const modalOpen = useModalOpen(ApplicationModal.SHARE);
  const toggleModal = useShareModal();
  // important that these are destructed from the account-specific web3-react context

  function getModalContent() {
    return (
      <div className="flex flex-col space-y-4">
        <ModalHeader title="Share" onClose={toggleModal} />
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full">
            <input
              type="number"
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-800"
              placeholder="Twitter"
              disabled
            />
          </div>
          <div className="w-full">
            <input
              type="number"
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-800"
              placeholder="Discord"
            />
          </div>
          <div className="w-full">
            <input
              type="number"
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-800"
              placeholder="Slack"
            />
          </div>
          <div className="w-full">
            <input
              type="number"
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-800"
              placeholder="Gmail"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={modalOpen}
      onDismiss={toggleModal}
      minHeight={0}
      maxHeight={90}
    >
      {getModalContent()}
    </Modal>
  );
}
