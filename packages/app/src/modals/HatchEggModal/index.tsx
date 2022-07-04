/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  useHatchEggModal,
  useModalOpen,
  useWalletModalToggle,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "../../components/ModalHeader";
import { useSelector } from "react-redux";
import { useHatch } from "state/zoo/hooks";

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
};

export default function HatchEggModal({ nftItem, success }) {
  // important that these are destructed from the account-specific web3-react context
  const { account } = useWeb3React();
  const { loading } = useSelector((state: any) => state.zoo);

  const hatchEggModalOpen = useModalOpen(ApplicationModal.HATCH_EGG);

  const toggleModal = useHatchEggModal();
  const hatchEgg = useHatch();
  const toggleWallet = useWalletModalToggle();
  const { eggId, dropId, name } = nftItem;
  const handleHatchEgg = useCallback(() => {
    console.log("Clicked");
    if (account) {
      console.log("Hatching", {
        dropId,
        eggId,
      });
      hatchEgg(dropId, eggId, () => success());
    } else {
      toggleWallet();
    }
  }, [account, dropId, eggId, hatchEgg, success, toggleWallet]);

  function getModalContent() {
    return (
      <div className="flex flex-col space-y-4">
        <ModalHeader title={`Ready to Hatch ${name}`} onClose={toggleModal} />
        <div className="flex flex-col items-center space-y-6">
          <div className="relative mb-" style={{ width: 258 }}>
            <img
              src="/img/egg.png"
              alt=""
              style={{
                width: "100%",
                height: 307,
              }}
            />
            <img
              src="/videoes/StealthEggHatch.mp4"
              alt=""
              className="absolute top-10 inset-x-[35%]"
              style={{ height: 219 }}
            />
          </div>
          <button
            className={`py-4 w-52 bg-bid-gradient rounded-xl mb-7 disabled:cursor-not-allowed ${
              loading && "opacity-60"
            }`}
            disabled={loading}
            onClick={handleHatchEgg}
          >
            {loading ? "Hatching..." : "Hatch Egg"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={hatchEggModalOpen}
      onDismiss={toggleModal}
      minHeight={0}
      maxHeight={90}
    >
      {getModalContent()}
    </Modal>
  );
}
