import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  useCastVoteModalToggle,
  useWalletModalToggle,
} from "state/application/hooks";
import dynamic from "next/dynamic";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { shortenAddress } from "functions/format";
import sanitizeHtml from "sanitize-html";

// Progress bar
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { format, isDate, differenceInSeconds } from "date-fns";
import CastVoteModal from "modals/CastVoteModal";
import { ApprovalState, useApproveCallback } from "hooks/useApproveCallback";
import { Proposal } from "types";
import { ProposalState } from "hooks/useVote";

import { getProposalState } from "functions/proposal";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#282646",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#3A6EE7",
  },
}));

const SingleVote = () => {
  const {
    proposals,
    votingPower,
  }: { proposals: Proposal[]; votingPower: number } = useSelector(
    (state: any) => state.voting
  );
  const router = useRouter();
  const { id } = router.query;
  const goBack = () => router.back();
  const { push } = router;
  const { account } = useActiveWeb3React();
  const toggleWallet = useWalletModalToggle();
  const [vote, setVote] = useState(null);
  const [votes, setVotes] = useState([]);
  const [approvedVotes, setApprovedVotes] = useState(0);
  const [disapprovedVotes, setDisapprovedVotes] = useState(0);
  const [_proposal, setProposal] = useState<typeof proposals[0]>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState(ProposalState.UNKNOWN);

  const toggleCastVoteModal = useCastVoteModalToggle();

  const [approvedCount, setApprovedCount] = useState(0);
  const [disapprovedCount, setDisapprovedCount] = useState(0);

  useEffect(() => {
    const proposal = proposals.find((p) => p.id === id);
    setProposal(proposal);
  }, [id, proposals]);

  // useEffect(() => {
  //   getVotingAmount(account, `${id}`).then((voteCounts) => {
  //     const { approvedTimes, disapprovedTimes } = voteCounts;
  //     setApprovedCount(approvedTimes);
  //     setDisapprovedCount(disapprovedTimes);
  //   });
  // }, [account, getVotingAmount, id]);

  // const fetchVoteCounts = useCallback(() => {
  //   getVotingAmount(account, `${id}`).then((voteCounts) => {
  //     const { approvedTimes, disapprovedTimes } = voteCounts;
  //     setApprovedCount(approvedTimes);
  //     setDisapprovedCount(disapprovedTimes);
  //   });
  // }, [account, getVotingAmount, id]);

  // useEffect(() => {
  //   // getVotingPower();
  //   getAllVoters().then((voters) => {
  //     const votes = voters?.filter((v) => v.proposal === id);
  //     setVotes(votes);
  //   });
  // }, [account, getAllVoters, id]);

  useEffect(() => {
    const _approvedVotes = votes?.filter((v) => v.vote === true).length;
    const _disapprovedVotes = votes?.filter((v) => v.vote === false).length;

    console.log("votes", votes);
    console.log("_approvedVotes", _approvedVotes);
    console.log("_disapprovedVotes", _disapprovedVotes);
    setApprovedVotes(_approvedVotes);
    setDisapprovedVotes(_disapprovedVotes);
  }, [votes]);
  useEffect(() => {
    if (_proposal && Object.keys(_proposal).length > 0) {
      setStartTime(formatDate(new Date(_proposal?.startTime)));
      setEndTime(formatDate(new Date(_proposal?.endTime)));
      setStatus(getProposalState(_proposal));
    }
  }, [_proposal]);

  console.log("proposals", proposals, _proposal);

  const handleVote = () => {
    if (!account) {
      toggleWallet();
      return;
    } else {
      toggleCastVoteModal();
      return;
    }
  };

  const formatDate = (date: Date | string) => {
    if (isDate(date)) {
      const _date = new Date(date);
      return format(_date, "yyyy-MM-dd hh:mm");
    }
  };

  return (
    <div className="Home flex flex-col justify-center items-center min-h-[70vh]">
      <div className="w-full px-4 py-16 mx-auto mt-24 lg:max-w-7xl">
        <a
          onClick={goBack}
          className="flex items-center justify-start gap-4 mb-10 text-left"
        >
          <Image src="/icons/arrow-left.svg" alt="" height={30} width={30} />
          <span className="text-lg font-semibold">Back to vote overview</span>
        </a>
        <div className="flex flex-col md:flex-row md:items-start gap-7">
          <div className="w-full md:w-3/5">
            <div className="flex items-center gap-3 mb-4">
              <button
                className={`rounded-full py-2 md:py-3.5 px-4 md:px-5 ${
                  status === ProposalState.ENDED
                    ? "bg-space-gray-500"
                    : status === ProposalState.PENDING
                    ? "bg-space-yellow"
                    : "bg-space-green"
                } text-sm font-medium`}
              >
                {status}
              </button>

              {_proposal?.proposalType === 0 ? (
                <button className="rounded-full py-2.5 md:py-3.5 px-4 md:px-5 border border-space-purple text-space-purple text-sm font-medium">
                  Core
                </button>
              ) : (
                <button className="rounded-full py-2.5 md:py-3.5 px-4 md:px-5 border border-space-pink text-space-pink text-sm font-medium">
                  Community
                </button>
              )}
            </div>
            <p className="mb-4 text-2xl font-semibold md:text-4xl md:mb-8">
              {_proposal?.title}
            </p>
            <p
              className="mb-6 text-sm text-white md:text-xl md:mb-10"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(_proposal?.description),
              }}
            />
            {/* {_proposal?.description} */}
            {_proposal && new Date(_proposal.endTime) > new Date() ? (
              <div className="w-full mb-6 border rounded-3xl border-space-grey bg-space-dark">
                <div className="flex items-center justify-between w-full px-6 py-6 text-2xl font-semibold bg-space-grey md:px-12 rounded-t-3xl">
                  Cast your vote
                </div>
                <div className="px-6 py-6 md:px-12">
                  <div
                    onClick={() => setVote("approve")}
                    className={`w-full py-4 px-5 mb-6 rounded-xl border ${
                      vote === "approve"
                        ? "border-space-blue"
                        : "border-space-gray-300"
                    } flex items-center gap-4 cursor-pointer`}
                  >
                    <div
                      className={`h-6 w-6 bg-space-grey rounded-full ${
                        vote === "approve" && "border-4 border-space-blue"
                      }`}
                    />
                    <p className="font-medium">Approve</p>
                  </div>

                  <div
                    onClick={() => setVote("disapprove")}
                    className={`w-full py-4 px-5 mb-6 rounded-xl border ${
                      vote === "disapprove"
                        ? "border-space-blue"
                        : "border-space-gray-300"
                    } flex items-center gap-4 cursor-pointer`}
                  >
                    <div
                      className={`h-6 w-6 bg-space-grey rounded-full ${
                        vote === "disapprove" && "border-4 border-space-blue"
                      }`}
                    />
                    <p className="font-medium">Disapprove</p>
                  </div>
                  {/* {[ApprovalState.NOT_APPROVED, ApprovalState.UNKNOWN].includes(
                    approvalState
                  ) ? (
                    <button
                      type="button"
                      className="px-12 py-3 text-lg text-center text-white transition duration-200 ease-in rounded-full shadow-md bg-space-gray-100 hover:bg-indigo-700 focus:ring-offset-indigo-200 focus:outline-none focus:ring-offset-2"
                      onClick={approve}
                    >
                      Approve
                    </button>
                  ) : ( */}
                  <button
                    disabled={account && !vote}
                    className="py-2.5 md:py-4 px-4 md:px-6 bg-proposal-button rounded-full disabled:cursor-not-allowed"
                    onClick={handleVote}
                  >
                    {account ? "Cast Vote" : "Connect to wallet"}
                  </button>
                  {/* )} */}
                </div>
              </div>
            ) : (
              <div className="p-4 my-4 italic font-semibold rounded-3xl bg-space-grey">
                Proposal End Date reached
              </div>
            )}
            <div className="w-full border rounded-3xl border-space-grey bg-space-dark">
              <div className="flex items-center justify-between w-full px-6 py-6 text-2xl font-semibold bg-space-grey md:px-12 rounded-t-3xl">
                Votes ({votes?.length})
              </div>
              <div className="">
                {votes?.length === 0 ? (
                  <p className="py-10 text-xl font-semibold text-center">
                    No votes yet
                  </p>
                ) : (
                  votes?.map((vote, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center py-5 px-6 md:px-12 ${
                        index !== votes.length - 1 &&
                        "border-b border-space-gray-100"
                      }`}
                    >
                      <a
                        href={`https://rinkeby.etherscan.io/address/${vote.voterAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 font-medium text-space-blue-dark"
                      >
                        {vote.voterAddress && shortenAddress(vote.voterAddress)}
                        <Image
                          src="/icons/link.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </a>
                      <p className="font-medium">
                        {vote?.vote ? "Approve" : "Disapprove"}
                      </p>
                      {/* <a className="flex items-center gap-3 font-medium">
                      19,180.831
                      <Image
                        src="/icons/link.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                    </a> */}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <div className="w-full mb-6 border rounded-3xl border-space-grey bg-space-dark">
              <div className="flex items-center justify-between w-full py-6 text-2xl font-semibold bg-space-grey px-7 rounded-t-3xl">
                Details
              </div>
              <div className="py-6 px-7">
                <p className="mb-6 text-space-light-gray">
                  Identifier:{" "}
                  <a
                    href={`https://gateway.ipfs.io/ipfs/${_proposal?.proposalIpfs}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-semibold text-space-blue-dark"
                  >
                    {_proposal?.proposalIpfs?.substring(0, 8)}
                    <Image
                      src="/icons/link.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </a>
                </p>
                <p className="mb-6 text-space-light-gray">
                  Creator:{" "}
                  <a
                    href={`https://rinkeby.etherscan.io/address/${_proposal?.creator}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-semibold text-space-blue-dark"
                  >
                    {account &&
                      _proposal?.creator &&
                      shortenAddress(_proposal?.creator)}
                    <Image
                      src="/icons/link.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </a>
                </p>
                <p className="mb-6 text-space-light-gray">
                  Snapshot:{" "}
                  <a
                    href={`https://etherscan.io/block/${_proposal?.blockNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-semibold text-space-blue-dark"
                  >
                    {_proposal?.blockNumber}
                    <Image
                      src="/icons/link.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </a>
                </p>
                <div className="px-5 py-5 bg-space-grey rounded-xl">
                  <button
                    className={`rounded-full py-2.5 px-5 ${
                      status === ProposalState.PENDING
                        ? "bg-space-yellow"
                        : status === ProposalState.ONGOING
                        ? "bg-space-green"
                        : "bg-space-gray-500"
                    }  text-sm font-medium mb-3.5`}
                  >
                    {status === ProposalState.PENDING
                      ? "Starting Soon"
                      : status === ProposalState.ONGOING
                      ? "Vote Now"
                      : "Vote Closed"}
                  </button>

                  <p className="mb-3 text-space-light-gray">
                    Start Date:{" "}
                    <a className="inline-flex items-center gap-3 font-semibold text-white">
                      {startTime}
                    </a>
                  </p>
                  <p className="text-space-light-gray">
                    End Date:{" "}
                    <a className="inline-flex items-center gap-3 font-semibold text-white">
                      {endTime}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full mb-6 border rounded-3xl border-space-grey bg-space-dark">
              <div className="flex items-center justify-between w-full py-6 text-2xl font-semibold bg-space-grey px-7 rounded-t-3xl">
                Current results
              </div>
              <div className="py-6 px-7">
                <div className="mb-4">
                  <p className="mb-2 text-lg font-medium">Approve</p>
                  <BorderLinearProgress
                    variant="determinate"
                    value={
                      votes?.length
                        ? (approvedVotes / (approvedVotes + disapprovedVotes)) *
                          100
                        : 0
                    }
                    className="mb-3"
                  />
                  <div className="flex items-center justify-between text-sm font-normal">
                    <p className="text-space-gray-500">
                      {approvedVotes} Vote{approvedVotes === 1 ? "" : "s"}
                    </p>
                    <p>
                      {votes?.length
                        ? (
                            (approvedVotes /
                              (approvedVotes + disapprovedVotes)) *
                            100
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })
                        : 0}
                      %
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-lg font-medium">Disapprove</p>
                  <BorderLinearProgress
                    variant="determinate"
                    value={
                      votes?.length
                        ? (disapprovedVotes /
                            (approvedVotes + disapprovedVotes)) *
                          100
                        : 0
                    }
                    className="mb-3"
                  />
                  <div className="flex items-center justify-between text-sm font-normal">
                    <p className="text-space-gray-500">
                      {disapprovedVotes} Vote{disapprovedVotes === 1 ? "" : "s"}
                    </p>
                    <p>
                      {votes?.length
                        ? (
                            (disapprovedVotes /
                              (approvedVotes + disapprovedVotes)) *
                            100
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CastVoteModal
        vote={vote}
        voteProposal={
          () => console.log("done")
          // handleVoteProposal(_proposal, vote, () => {
          //   setVote(null);
          //   getAllVoters().then((voters) => {
          //     toggleCastVoteModal();
          //     const votes = voters?.filter((v) => v.proposal === id);
          //     setVotes(votes);
          //   });
          //   getVotingAmount(account, `${id}`).then((voteCounts) => {
          //     const { approvedTimes, disapprovedTimes } = voteCounts;
          //     setApprovedCount(approvedTimes);
          //     setDisapprovedCount(disapprovedTimes);
          //   });
          // })
        }
        votingPower={votingPower}
        approvedCount={approvedCount}
        disapprovedCount={disapprovedCount}
      />
    </div>
  );
};

export default SingleVote;
