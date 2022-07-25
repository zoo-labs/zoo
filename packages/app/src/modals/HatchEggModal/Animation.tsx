/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useHatchEggAnimationModal,
  useModalOpen,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";

export default function HatchEggAnimationModal({ nft }) {
  const hatchEggModalOpen = useModalOpen(ApplicationModal.HATCH_EGG_ANIMATION);
  const toggleModal = useHatchEggAnimationModal();
  const { push } = useRouter();
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    switch (nft?.name?.toUppercase()) {
      case "NUBIAN GIRAFFE".toUpperCase():
        setAnimation(
          "https://drive.google.com/file/d/1OPLyvsFnuaGmrxGfbJ-dK_n6mXvFsNaX/view"
        );
      case "Pygmy Hippopotamus".toUpperCase():
        setAnimation(
          "https://drive.google.com/file/d/1wlt8QxpEJueD4blTN_0DaZYsoj0NeiIU/view"
        );
      case "Javan Rhinoceros".toUpperCase():
        setAnimation(
          "https://drive.google.com/file/d/1L9AKtGJ3msc1LRxi8Yv21U4miicvy1ca/view"
        );
      default:
        setAnimation("/videoes/StealthEggHatch.mp4");
    }
  }, [nft]);

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
              <source src={animation} type="video/mp4" />
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
