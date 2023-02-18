/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useModalOpen, useShareModal } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "../../components/ModalHeader";

// Social media icons
import { FaDiscord, FaSlack, FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

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
  // Get absolute url of page
  const url = window.location.href;

  // Share via discord
  const shareDiscord = () => {
    window.open(
      `https://discordapp.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&scope=bot&permissions=8&redirect_uri=${url}&response_type=code&state=${nft.id}`,
      "_blank"
    );
  };

  function getModalContent() {
    return (
      <div className="flex flex-col space-y-4">
        <ModalHeader title="Share" onClose={toggleModal} />
        <div className="flex flex-col items-center space-y-6">
          <a
            href={`http://twitter.com/share?text=Hi guys, check this out!&url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-5 py-4 text-[#626471] rounded-lg bg-dark-800"
          >
            <p>Twitter</p>
            <FaTwitter />
          </a>
          <a
            href="https://discord.gg/8K3cfV6b"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-5 py-4 text-[#626471] rounded-lg bg-dark-800"
          >
            <p>Discord</p>
            <FaDiscord />
          </a>
          <a
            href={`mailto:?subject=Check this out!&body=Hey, check this out!%0A%0A${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-5 py-4 text-[#626471] rounded-lg bg-dark-800"
          >
            <p>Gmail</p>
            <SiGmail />
          </a>
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
