/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import {
  useHatchEggAnimationModal,
  useModalOpen,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
};

export default function HatchEggAnimationModal({}) {
  const hatchEggModalOpen = useModalOpen(ApplicationModal.HATCH_EGG_ANIMATION);
  const toggleModal = useHatchEggAnimationModal();
  const { push } = useRouter();

  function getModalContent() {
    return (
      <div className="flex flex-col space-y-4">
        {/* <ModalHeader title={``} onClose={toggleModal} /> */}
        <div className="flex justify-start items-center space-y-6">
          <div className="relative mb- w-full h-full" style={{}}>
            <video
              width="10%"
              height="100%"
              autoPlay
              muted
              className="absolute max-h-screen w-full h-full md:-top-2.5 lg:-top-2.5 -ilnset-y-2.5"
              onEnded={() => {
                if (hatchEggModalOpen) toggleModal();
                push("/wallet");
              }}
              style={{
                zoom: 50,
              }}
            >
              <source src="/videoes/StealthEggHatch.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={hatchEggModalOpen}
      onDismiss={toggleModal}
      minHeight={0}
      // maxHeight={90}
      isMax
    >
      {getModalContent()}
    </Modal>
  );
}
