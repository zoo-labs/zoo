import React, { useCallback, useEffect, useState } from "react";
import { useModalOpen, useCastVoteModalToggle } from "state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Link from "next/link";
import { useSelector } from "react-redux";
import Modal from "components/Modal";
import { numberWithCommas } from "functions/format";
import { useTokenAllowance } from "hooks/useTokenAllowance";
import {
  ApprovalState,
  useVotingApproveCallback,
} from "hooks/useApproveCallback";
import { calcAmountToPay } from "functions/proposal";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import ModalHeader from "components/ModalHeader";
import { useZooVoting } from "hooks";

export default function CastVoteModal({
  vote,
  voteProposal,
  votingPower,
  approvedCount,
  disapprovedCount,
}: // fetchVoteCounts,
{
  vote: string;
  voteProposal: () => void;
  votingPower: number;
  approvedCount: number;
  disapprovedCount: number;
  // fetchVoteCounts: any;
}) {
  const { account } = useActiveWeb3React();
  const { zooBalance } = useSelector((state: any) => state.zoo);
  const voteModalOpen = useModalOpen(ApplicationModal.CAST_VOTE);
  const toggleCastVoteModal = useCastVoteModalToggle();
  const zooVoting = useZooVoting();
  const [approvalState, approve] = useVotingApproveCallback(
    50,
    zooVoting?.address
  );

  const { loading, voterAllowance } = useSelector((state: any) => state.voting);
  console.log("votingPower", votingPower);

  function getModalContent() {
    return (
      <div className="flex flex-col space-y-5 text-black">
        <ModalHeader
          title="Confirm vote"
          className="pt-5 py-2.5 bg-space-grey text-white"
          onClose={toggleCastVoteModal}
        />
        <div className="flex flex-col pb-8">
          <p className="mb- font-medium text-white text-sm">VOTING FOR</p>
          <p className="mb-5 text-2xl font-semibold text-white">
            {vote === "approve" ? "Approve" : "Disapprove"}
          </p>
          <p className="mb-1 font-medium text-white text-sm">
            YOUR VOTING POWER
          </p>
          <p
            className={`w-full bg-grey rounded-xl px-5 py-3 focus:outline-none ${
              votingPower ? "mb-3" : "mb-4"
            } font-medium text-lg text-white no-increment`}
          >
            {zooBalance.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="py-1 font-semibold text-white">
            Count:{" "}
            {vote === "approve"
              ? Number(approvedCount)
              : Number(disapprovedCount)}
          </p>
          <p className="py-1 mb-2 font-semibold text-white">
            Amount to pay:{" "}
            {vote === "approve"
              ? calcAmountToPay(approvedCount)
              : calcAmountToPay(disapprovedCount)}{" "}
            ZOO
          </p>
          {votingPower > 0 ? (
            <p className="mb-5 text-space-gray-500">
              Are you sure you want to vote for the above choice? This action
              cannot be reversed.
            </p>
          ) : (
            ""
          )}
          {approvalState === ApprovalState.APPROVED ? (
            <button
              onClick={voteProposal}
              className={`py-4 bg-zoo-green font-medium text-white rounded-full mb-3`}
            >
              {loading ? (
                <i className="text-white fas fa-circle-notch animate-spin" />
              ) : (
                "Confirm vote"
              )}
            </button>
          ) : (
            <button
              className={`py-4 ${
                votingPower
                  ? "bg-vote-button text-white"
                  : "bg-space-grey text-space-gray-600"
              } rounded-full mb-3`}
              onClick={async () => {
                console.log("allowedsss");

                const allowed = await approve();
                console.log("allowedsss", allowed);
                console.log("approvalState", approvalState);
              }}
              disabled={votingPower < 1 || loading}
            >
              {loading ? (
                <i className="text-white fas fa-circle-notch animate-spin" />
              ) : (
                "Approve"
              )}
            </button>
          )}
          <button
            className="py-4 mb-3 bg-transparent border rounded-full border-space-blue-dark text-grey100"
            onClick={toggleCastVoteModal}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={voteModalOpen}
      onDismiss={toggleCastVoteModal}
      minHeight={0}
      maxHeight={90}
    >
      {getModalContent()}
    </Modal>
  );
}
