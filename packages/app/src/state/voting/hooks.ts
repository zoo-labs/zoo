import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useActiveWeb3React from "hooks/useActiveWeb3React";
import { signMessage } from "hooks/webReact";
import {
  useAddPopup,
  useBlockNumber,
  useCastVoteModalToggle,
  useWalletModalToggle,
} from "state/application/hooks";
import { toast } from "react-toastify";

import { Proposal } from "types";
// import { useAddProposal, useHasVoted, useVoteProposal } from "hooks/useVote";
import {
  useApproveCallback,
  useVotingApproveCallback,
} from "hooks/useApproveCallback";
import { useRouter } from "next/router";
import { useAppDispatch } from "state/hooks";
import { useAddProposal, useVoteProposal } from "hooks/useVote";
import { useZooVoting } from "hooks";

const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY as string;
const pinataSecretApiKey = process.env
  .NEXT_PUBLIC_PINATA_SECRET_API_KEY as string;

export const pinJSONToIPFS = (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      //handle response here
      console.log("IPFS_res", response);
      return response.data.IpfsHash;
    })
    .catch(function (error) {
      //handle error here
      console.log("IPFS_err", error);
    });
};

export function useCreateProposals(): (
  data: Proposal,
  callback: () => void,
  successCallback: () => void
) => void {
  const { library, account, chainId } = useActiveWeb3React();
  const toggleWallet = useWalletModalToggle();
  const { votingPower } = useSelector((state: any) => state.voting);
  const blockNumber = useBlockNumber();
  const addProposal = useAddProposal();
  const addPopup = useAddPopup();
  console.log("creting proposals");

  return useCallback(
    async (data: Proposal, callback, successCallback) => {
      console.log("dataaaa", data);
      if (!account) return;
      if (!chainId) return;

      console.log("dd");
      const {
        title,
        description,
        endDate,
        endTime,
        startDate,
        startTime,
        choices,
        creator,
      } = data;

      if (!account) {
        toggleWallet();
        return;
      }
      if (
        !title ||
        !description ||
        !endDate ||
        !startDate ||
        !endTime ||
        !startTime
      ) {
        console.log("kindly complete the form");
        toast.error("kindly complete the form");
        addPopup({
          txn: {
            hash: null,
            summary: "kindly complete the form",
            success: false,
          },
        });
        callback();
        return;
      }

      console.log("votingPower", votingPower);
      const _startTime = new Date(
        new Date(startDate).getFullYear(),
        new Date(startDate).getMonth(),
        new Date(startDate).getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );

      const _endTime = new Date(
        new Date(endDate).getFullYear(),
        new Date(endDate).getMonth(),
        new Date(endDate).getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      );

      const startTimestamp = Math.floor(new Date(_startTime).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(_endTime).getTime() / 1000);

      try {
        const signature = await signMessage(`${blockNumber}`, account, library);
        console.log("signature oooo", signature);
        const payload = {
          title,
          description,
          choices,
          startDate: _startTime,
          endDate: _endTime,
          startTime: _startTime.getTime(),
          endTime: _endTime.getTime(),
          creator,
          blockNumber,
          signature,
          timestamp: Date.now(),
          token: "ZOO",
          type: "proposal",
          tokenDecimal: 18,
          // tokenAddress: contract.address,
        };

        const proposal = await pinJSONToIPFS(payload);
        console.log("proposal proposal", proposal);

        await addProposal(
          proposal,
          startTimestamp,
          endTimestamp,
          successCallback
        );
        successCallback();
        callback();
      } catch (error: any) {
        console.log("errror", error);
        callback();
      }
    },
    [
      account,
      chainId,
      votingPower,
      toggleWallet,
      addPopup,
      blockNumber,
      library,
      addProposal,
    ]
  );
}

export function useHandleVoteProposal(): (
  data: Proposal,
  vote: string,
  successCallback?: Function
) => void {
  const { library, account, chainId } = useActiveWeb3React();
  const toggleWallet = useWalletModalToggle();
  const voteProposal = useVoteProposal();
  const contract = useZooVoting();
  const [approvalState, approve] = useVotingApproveCallback(
    50,
    contract?.address
  );
  const toggleCastVoteModal = useCastVoteModalToggle();

  const router = useRouter();
  return useCallback(
    async (data, vote, successCallback) => {
      console.log("about_vote", account);
      if (!account) {
        toggleWallet();
        return;
      }
      if (!vote) {
        alert("Please select a vote");
        return;
      }

      // const voted = await hasVoted(
      //   account,
      //   data.proposalIpfs,
      //   () => {},
      //   () => {}
      // );
      // if (voted) {
      //   notify("You have already voted", "info", {
      //     position: "top-center",
      //   });
      //   return;
      // } else

      if (!approvalState) {
        const allowed = await approve();
        console.log("allowedsss", allowed);
      }
      const payload = {
        timestamp: new Date().getTime(),
        token: "ZOO",
        type: "Vote",
        proposalCid: data.proposalIpfs,
        choice: vote,
      };
      await voteProposal(
        data.proposalIpfs,
        vote === "approve" ? true : false,
        () => {
          console.log("_proposal", data);
          successCallback && successCallback();
          toggleCastVoteModal();
        },
        () => {}
      );
    },
    [
      account,
      approvalState,
      approve,
      toggleCastVoteModal,
      toggleWallet,
      voteProposal,
    ]
  );
}

export function useGetVotingAmount(): (
  address: string,
  proposal: string
) => Promise<{ approvedTimes: number; disapprovedTimes: number }> {
  const contract = useZooVoting();
  return useCallback(async (address, proposal) => {
    const votingAmount = await contract?.votingAmount(address, proposal);
    // const tx = await votingAmount.wait();
    const struct = {
      approvedTimes: Number(votingAmount?.approvedTimes),
      disapprovedTimes: Number(votingAmount?.dissaprovedTimes),
    };
    console.log("_votingDeet", struct, votingAmount);
    return struct;
  }, []);
}
