/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import {
  useModalOpen,
  useWalletModalToggle,
  useAuctionModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "../../components/ModalHeader";
import { useSelector } from "react-redux";
import { useCreateAuction, useEditAuction } from "state/zoo/hooks";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useRouter } from "next/router";

export default function AuctionModal({
  nft,
  edit = false,
}: {
  nft: any;
  edit?: boolean;
}) {
  const auctionModalOpen = useModalOpen(ApplicationModal.AUCTION);
  const toggleModal = useAuctionModal();
  // important that these are destructed from the account-specific web3-react context
  const { account } = useActiveWeb3React();
  const { push } = useRouter();
  const { loading } = useSelector((state: any) => state.zoo);
  const auction = useCreateAuction();
  const editAuction = useEditAuction();
  const toggleWallet = useWalletModalToggle();
  const [duration, setDuration] = useState(null);
  const [reservePrice, setReservePrice] = useState(null);
  const [curatorFee, setCuratorFee] = useState(null);

  useEffect(() => {
    if (edit && nft) {
      setDuration(nft.duration);
      setReservePrice(nft.reservePrice);
      setCuratorFee(nft.curatorFeePercentage);
    }
  }, [edit, nft]);

  const successCallback = useCallback(() => {
    console.log("success");
    auctionModalOpen && toggleModal();
    push("/market");
  }, [auctionModalOpen, push, toggleModal]);

  const handleAuction = useCallback(
    (duration_, reservePrice_, curatorFee_) => {
      if (account) {
        if (edit) {
          editAuction(nft?.auctionId, reservePrice, () => {
            successCallback();
          });
        } else {
          auction(
            Number(nft?.id),
            duration_,
            reservePrice_,
            curatorFee_,
            successCallback
          );
        }
      } else {
        toggleWallet();
      }
    },
    [account, auction, edit, nft?.id, successCallback, toggleWallet]
  );

  function getModalContent() {
    return (
      <div className="flex flex-col space-y-4">
        <ModalHeader title="Put animal on auction" onClose={toggleModal} />
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full">
            <label className="mb-3.5">Duration</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-400"
              placeholder="Duration (days)"
              disabled={edit}
            />
          </div>
          <div className="w-full">
            <label className="mb-3.5">Reserve Price</label>
            <input
              type="number"
              value={reservePrice}
              onChange={(e) => setReservePrice(e.target.value)}
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-400"
              placeholder="Reserve Price ($ZOO)"
            />
          </div>
          <div className="w-full">
            <label className="mb-3.5">Curator fee</label>
            <input
              type="number"
              value={curatorFee}
              onChange={(e) => setCuratorFee(e.target.value)}
              className="w-full px-5 py-4 text-black rounded-lg bg-dark-400"
              placeholder="max 10%"
              disabled={edit}
            />
          </div>
          <button
            onClick={() => handleAuction(duration, reservePrice, curatorFee)}
            disabled={loading}
            className={`py-4 w-52 bg-bid-gradient rounded-xl mb-7 outline-none focus:outline-none ${
              loading && "opacity-30 disabled:cursor-not-allowed"
            }`}
          >
            {loading ? "Loading..." : edit ? "Edit Auction" : "Auction"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={auctionModalOpen}
      onDismiss={toggleModal}
      minHeight={0}
      maxHeight={90}
    >
      {getModalContent()}
    </Modal>
  );
}
