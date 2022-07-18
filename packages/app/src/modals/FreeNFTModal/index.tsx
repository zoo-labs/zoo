/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import {
  useModalOpen,
  useWalletModalToggle,
  useFreeNftModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "../../components/ModalHeader";
import { useSelector } from "react-redux";
import { useFreeNFT } from "state/zoo/hooks";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

export default function FreeNFTModal({ nft }: { nft: any }) {
  const freeNftModalOpen = useModalOpen(ApplicationModal.FREE_NFT);
  const toggleModal = useFreeNftModal();
  // important that these are destructed from the account-specific web3-react context
  const { account } = useActiveWeb3React();
  const { push } = useRouter();
  const { loading } = useSelector((state: any) => state.zoo);
  const toggleWallet = useWalletModalToggle();
  const freeNftF = useFreeNFT();

  const successCallback = useCallback(() => {
    console.log("success");
    push("/wallet");
    freeNftModalOpen && toggleModal();
  }, [freeNftModalOpen, push, toggleModal]);

  const freeNft = useCallback(() => {
    if (account) {
      freeNftF(nft?.id, successCallback);
    } else {
      toggleWallet();
    }
  }, [account, freeNftF, nft?.id, successCallback, toggleWallet]);

  function getModalContent() {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 bg-black rounded-xl">
        <div className="absolute right-8 top-7">
          <ModalHeader onClose={toggleModal} />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 max-w-[486px]">
          <div className="bg-black rounded-xl h-[310px] w-full flex flex-col justify-center items-center">
            {nft?.kind === 0 || nft?.kind === 2 ? (
              <video
                autoPlay
                loop
                src={nft?.token_uri}
                width={"340px"}
                height={"340px"}
                className="rounded overflow-hidden object-cover max-h-[310px]"
                style={{
                  zoom: "0.7",
                }}
              />
            ) : (
              <div className="w-full h-full">
                <ModelViewer
                  glb={nft?.glb_animation_url}
                  usdz={nft?.usdz_animation_url}
                ></ModelViewer>
              </div>
            )}
          </div>
          <p className="mb-4 text-xl font-semibold">
            Are you sure you want to set your Animal free?
          </p>
          <p className="text-sm font-normal text-[#BDBDBD] text-center">
            By freeing your animal, your collateral is returned, but your NFT is
            lost forever. Are you sure you want to continue? A 20% fee goes back
            to the Zoo DAO.
          </p>
          <button
            onClick={freeNft}
            disabled={loading}
            className={`py-4 w-52 bg-bid-leader-board rounded-xl mb-7 outline-none focus:outline-none ${
              loading && "opacity-30 disabled:cursor-not-allowed"
            }`}
          >
            {loading ? "Setting free..." : "Set Free"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={freeNftModalOpen}
      onDismiss={toggleModal}
      minHeight={0}
      maxHeight={90}
      padding={0}
      maxWidth={659}
      // backgroundColor="transparent"
    >
      {getModalContent()}
    </Modal>
  );
}
