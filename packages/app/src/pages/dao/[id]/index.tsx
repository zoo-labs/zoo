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
    backgroundColor: "#213036",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#15F195",
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
    <div className="dao-bg w-full Home flex flex-col justify-center items-center min-h-[70vh]">
      <div className="w-full px-4 pb-16 mx-auto mt-12 lg:max-w-6xl">
        <a
          onClick={goBack}
          className="flex items-center justify-star mb-10 text-left cursor-pointer"
        >
          <Image src="/icons/arrow-left.svg" alt="" height={12} width={16} />
          <span className="text-sm font-light ml-3">Back</span>
        </a>
        <div className="flex flex-col md:flex-row md:items-start gap-14">
          <div className="w-full md:w-3/5">
            <p className="mb-4 text-2xl font-normal md:text-2xl md:mb-8 max-w-[487px]">
              {/* {_proposal?.title} */}
              ARC: Extend the Safety Module Protection to Aave V2 Avalanche
            </p>
            <div className="flex items-center gap-3 mb-8">
              <button
                className={`rounded-full py-1.5 md:py-2.5 px-4 md:px-5 bg-activeGreen text-sm font-medium`}
              >
                {status}
              </button>

              {_proposal?.proposalType === 0 ? (
                <button className="rounded-full py-1.5 md:py-2.5 px-4 md:px-5  border border-zoo-green text-zoo-green text-sm font-medium">
                  Core
                </button>
              ) : (
                <button className="rounded-full py-1.5 md:py-2.5 px-4 md:px-5  border border-zoo-green text-zoo-green text-sm font-medium">
                  Community
                </button>
              )}
            </div>
            <p className="mb-1.5 text-sm font-light opacity-[0.45]">
              Proposal Description
            </p>
            <p
              className="mb-6 text-sm text-white md:text-sm md:mb-10"
              dangerouslySetInnerHTML={{
                // __html: sanitizeHtml(_proposal?.description),
                __html: sanitizeHtml(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius tincidunt egestas porta tincidunt in. Eros, venenatis et ullamcorper quis diam velit eu. Senectus luctus enim turpis urna. Iaculis a sagittis tincidunt id ac.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius tincidunt egestas porta tincidunt in. Eros, venenatis et ullamcorper quis diam velit eu. Senectus luctus enim turpis urna. Iaculis a sagittis tincidunt id ac."
                ),
              }}
            />
            <p className="flex items-center justify-between w-full text-sm font-light rounded-t-3xl mb-2.5">
              Cast your vote
            </p>
            <div className="w-full mb-6 border rounded-2xl border-white-10">
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <div
                    onClick={() => setVote("approve")}
                    className={`flex-1 py-4 px-5 mr-3 rounded-xl border border-white-10 flex items-center gap-4 cursor-pointer`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full border border-white-60 ${
                        vote === "approve" ? "bg-activeGreen" : "bg-white-20"
                      }`}
                    />
                    <p className="font-medium">Approve</p>
                  </div>

                  <div
                    onClick={() => setVote("disapprove")}
                    className={`flex-1 py-4 px-5 rounded-xl border border-white-10 flex items-center gap-4 cursor-pointer`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full border border-white-60 ${
                        vote === "disapprove" ? "bg-activeGreen" : "bg-white-20"
                      }`}
                    />
                    <p className="font-medium">Disapprove</p>
                  </div>
                </div>
                <button
                  disabled={account && !vote}
                  className="py-2.5 md:py-4 px-4 md:px-6 bg-bid-gradient rounded-full disabled:cursor-not-allowed"
                  onClick={handleVote}
                >
                  {account ? "Cast Vote" : "Connect to wallet"}
                </button>
              </div>
            </div>

            <div className="w-full border rounded-2xl border-white-10">
              <div className="flex items-center w-full p-5 text-sm font-light bg-white-5 rounded-t-2xl">
                Current Votes
                <span className="ml-3 text-12 text-center bg-activeGreen p-1 rounded-full min-w-[40px]">
                  {votes?.length}
                </span>
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
                        "border-b border-primary-500"
                      }`}
                    >
                      <a
                        href={`https://rinkeby.etherscan.io/address/${vote.voterAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 font-semibold text-activeGreen"
                      >
                        {vote.voterAddress && shortenAddress(vote.voterAddress)}
                        <Image
                          src="/icons/link.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </a>
                      <p className="font-semibold">
                        {vote?.vote ? "Approve" : "Disapprove"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5 pt-6">
            <div className="w-full mb-14 border rounded-2xl border-white-10">
              <p className="flex items-center justify-between w-full p-5 text-sm font-light bg-white-5 rounded-t-2xl">
                Information
              </p>
              <div className="p-5">
                <p className="mb-2.5 text-space-light-gray">
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
                <p className="mb-2.5 text-space-light-gray">
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
                <p className="mb-2.5 text-space-light-gray">
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
                <p className="mb-2.5 text-space-light-gray">
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
            <div className="w-full mb-6 border rounded-2xl border-white-10 bg-space-dark">
              <div className="flex items-center justify-between w-full p-5 text-sm font-light bg-white-5 rounded-t-2xl">
                Current Results
              </div>
              <div className="p-5">
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
