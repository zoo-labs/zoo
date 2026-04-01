/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useExpandNFTModal, useModalOpen } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "components/ModalHeader";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

export default function NFTExpandedModal({ nft, isAuction = true }) {
  const modalOpen = useModalOpen(ApplicationModal.EXPAND_NFT);
  const toggleModal = useExpandNFTModal();

  function getModalContent() {
    return (
      <div className="flex flex-col h-screen space-y-4 bg-black">
        <div className="absolute px-10 py-5" style={{ zIndex: 9999 }}>
          <ModalHeader
            title={``}
            onClose={toggleModal}
            className="absolute m-4"
          />
        </div>
        <div className="flex items-center justify-center h-full space-y-6">
          <div
            className="relative flex items-center justify-center w-full h-full mb-"
            style={{}}
          >
            {nft?.kind === 0 || nft?.kind === 2 ? (
              // <video
              //   width="10%"
              //   height="100%"
              //   autoPlay
              //   muted
              //   loop
              //   // className="absolute max-h-screen w-full h-full md:-top-2.5 lg:-top-2.5 -ilnset-y-2.5"
              //   className="showcase min-h-[564px] flex items-center justify-center relative"
              //   // style={{
              //   //   zoom: 50,
              //   // }}
              // >
              //   <source src={nft?.animation_url} type="video/mp4" />
              // </video>
              <video
                autoPlay
                loop
                src={isAuction ? nft.animation_url : nft.token_uri}
                width={300}
                height={350}
              />
            ) : (
              <div className="w-full h-full">
                <ModelViewer
                  // zoom="35deg"
                  glb={nft?.glb_animation_url}
                  usdz={nft?.usdz_animation_url}
                ></ModelViewer>
              </div>
            )}
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
      // maxHeight={90}
      isMax
    >
      {getModalContent()}
    </Modal>
  );
}
