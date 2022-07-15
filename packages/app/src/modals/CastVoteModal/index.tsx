import React, { useCallback, useEffect, useState } from "react";
import { useModalOpen, useCastVoteModalToggle } from "state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Link from "next/link";
import { useSelector } from "react-redux";
import Modal from "components/Modal";
import { numberWithCommas } from "functions/format";
import { useTokenAllowance } from "hooks/useTokenAllowance";
import { ApprovalState, useApproveCallback } from "hooks/useApproveCallback";
import { calcAmountToPay } from "functions/proposal";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import ModalHeader from "components/ModalHeader";

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
  const voteModalOpen = useModalOpen(ApplicationModal.CAST_VOTE);
  const toggleCastVoteModal = useCastVoteModalToggle();

  // const [approvalState, approve] = useApproveCallback(50, contract?.address);

  const { loading, voterAllowance } = useSelector((state: any) => state.voting);
  console.log("votingPower", votingPower);

  function getModalContent() {
    return (
      <div className="flex flex-col space-y-5 text-black">
        <ModalHeader
          title="Confirm vote"
          className="px-6 py-5 bg-space-grey"
          onClose={toggleCastVoteModal}
        />
        <div className="flex flex-col px-6 pb-8">
          <p className="mb-3 font-medium text-space-blue-dark">VOTING FOR</p>
          <p className="mb-3 text-2xl font-semibold text-white">
            {vote === "approve" ? "Approve" : "Disapprove"}
          </p>
          <p className="mb-3 font-medium text-space-blue-dark">
            YOUR VOTING POWER
          </p>
          <p
            className={`w-full bg-space-grey rounded-xl p-5 focus:outline-none ${
              votingPower ? "mb-3" : "mb-5"
            } font-medium text-lg text-white no-increment`}
          ></p>
          <p className="py-2 font-semibold text-white">
            Count:{" "}
            {vote === "approve"
              ? Number(approvedCount)
              : Number(disapprovedCount)}
          </p>
          <p className="py-3 font-semibold text-white">
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
          {/* {approvalState === ApprovalState.APPROVED ? (
            <button
              className={`py-4 bg-vote-button text-white rounded-full mb-3`}
      
            >
              {loading ? (
                <i className="text-white fas fa-circle-notch animate-spin" />
              ) : (
                "Confirm vote"
              )}
            </button>
          ) : ( */}
          <button
            className={`py-4 ${
              votingPower
                ? "bg-vote-button text-white"
                : "bg-space-grey text-space-gray-600"
            } rounded-full mb-3`}
            onClick={async () => {
              console.log("allowedsss");

              // const allowed = await approve();
              // console.log("allowedsss", allowed);
              // console.log("approvalState", approvalState);
            }}
            disabled={votingPower < 1 || loading}
          >
            {loading ? (
              <i className="text-white fas fa-circle-notch animate-spin" />
            ) : (
              "Approve"
            )}
          </button>
          {/* )} */}
          <button
            className="py-4 mb-3 bg-transparent border rounded-full border-space-blue-dark text-space-blue-dark"
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
