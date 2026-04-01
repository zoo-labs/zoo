import React from "react";
import { ApplicationModal } from "state/application/actions";
import { useCountdownToggle, useModalOpen } from "state/application/hooks";
import Modal from "components/Modal";
import BidModalHeader from "components/ModalHeader/BidModalHeader";
import { MyNFT } from "state/zoo/types";
import ModalHeader from "components/ModalHeader";
import Image from "next/image";

interface NftModalProps {
  nftItem: MyNFT;
  hatchEgg: () => void;
  feed: (id: number) => void;
  breed: () => void;
  auction: () => void;
}

const CooldownModal: React.FC<{}> = ({}) => {
  const myNftModal = useModalOpen(ApplicationModal.COUNTDOWN);
  const toggleNftModal = useCountdownToggle();

  return (
    <>
      <Modal
        isOpen={myNftModal}
        onDismiss={toggleNftModal}
        maxWidth={440}
        minHeight={50}
      >
        <ModalHeader className="absolute right-7" onClose={toggleNftModal} />
        <div className="flex flex-col px-5 mx-auto mt-10 max-w-7xl">
          <Image src="/img/snowing.svg" alt="" width={110} height={110} />
          <p className="font-semibold text-lg text-center mb-1">
            Cooldown Time is 24 Hours
          </p>
          <p className="text-xs text-center font-light text-[#BDBDBD] mb-5">
            You can breed again after your timer has ended, cool down helps
            protect your animals from Lorem.
          </p>
          <div className="flex items-center justify-between w-3/4 mx-auto  mb-3 text-lg font-medium">
            <p className="text-lg font-bold">
              <span className="px-2.5 py-1 border border-[#353535] mr-1">
                2
              </span>
              <span className="px-2.5 py-1 border border-[#353535]">3</span>
            </p>
            <p>:</p>
            <p className="text-lg font-bold">
              <span className="px-2.5 py-1 border border-[#353535] mr-1">
                0
              </span>
              <span className="px-2.5 py-1 border border-[#353535]">4</span>
            </p>
            <p>:</p>
            <p className="text-lg font-bold">
              <span className="px-2.5 py-1 border border-[#353535] mr-1">
                3
              </span>
              <span className="px-2.5 py-1 border border-[#353535]">0</span>
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/icons/notification.svg"
              alt=""
              width={16}
              height={16}
            />
            <p className="ml-1.5 text-xs text-[#BDBDBD] font-light">
              Next breed time 12:20 PM
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CooldownModal;
