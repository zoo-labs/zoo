/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useModalOpen, useShareModal } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "../../components/ModalHeader";

export default function AuctionModal({
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
        <ModalHeader title="Put animal on auction" onClose={toggleModal} />
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full">
            <label className="mb-3.5">Duration</label>
            <input
              type="number"
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-400"
              placeholder="Duration (days)"
              disabled={edit}
            />
          </div>
          <div className="w-full">
            <label className="mb-3.5">Reserve Price</label>
            <input
              type="number"
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-400"
              placeholder="Reserve Price ($ZOO)"
            />
          </div>
          <div className="w-full">
            <label className="mb-3.5">Curator fee</label>
            <input
              type="number"
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-400"
              placeholder="max 10%"
              disabled={edit}
            />
          </div>
          <button
            className={`py-4 w-52 bg-bid-gradient rounded-xl mb-7 outline-none focus:outline-none`}
          >
            {"Share"}
          </button>
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
