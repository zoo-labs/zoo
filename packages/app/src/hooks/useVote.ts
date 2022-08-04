import { notify } from "components/alertMessage";
import { formatError } from "functions";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAddPopup } from "state/application/hooks";
// import { useProposalLoaderToggle } from "state/application/hooks";
import {
  addProposals,
  getAllProposals,
  getVotingPower,
  voteProposal,
} from "state/voting/actions";
import { useZooVoting } from "./useContract";

export enum ProposalState {
  UNKNOWN = "UNKNOWN",
  ENDED = "ENDED",
  PENDING = "PENDING",
  ONGOING = "ONGOING",
}

export function useAddProposal() {
  const dispatch = useDispatch();
  const contract = useZooVoting();
  const addPopup = useAddPopup();

  return useCallback(
    async (value, startTimestamp, endTimestamp, successCallback) => {
      try {
        console.log(
          "add proposal",
          value,
          startTimestamp,
          endTimestamp,
          contract
        );

        const proposal = await contract?.addProposals(
          value,
          startTimestamp,
          endTimestamp,
          {
            gasLimit: 4000000,
          }
        );
        const tx = await proposal.wait();
        console.log("addProposals,value", tx);
        // startLoader()
        addPopup({
          txn: {
            hash: null,
            summary: "Sucessfully created proposal",
            success: true,
          },
        });
        notify("Sucessfully created proposal", "success");
        successCallback();
      } catch (error) {
        // startLoader()
        console.log("addProposals error ->", error);
        addPopup({
          txn: {
            hash: null,
            summary: formatError(error.message),
            success: false,
          },
        });
      }
    },
    [addPopup, contract]
  );
}

export function useGetAllProposals() {
  const dispatch = useDispatch();
  const contract = useZooVoting();
  return useCallback(async () => {
    const proposals = await contract?.getAllProposals();
    const structuredProposals: any = [];
    console.log("proposals proposals proposals", proposals);

    if (!proposals) {
      dispatch(getAllProposals([]));
      return;
    }

    for (let index = 0; index < proposals.length; index++) {
      const proposal = proposals[index];

      const proposalType = proposal.proposalType;
      const proposalStatus = proposal.proposalStatus;
      const startTime = proposal.startTime;
      const proposalIpfs = proposal.proposal;
      const votes = proposal.votes;
      const voteCount = proposal.voteCount;
      if (!proposalIpfs) continue;
      const newProposalUri = `https://gateway.ipfs.io/ipfs/${proposalIpfs}`;
      try {
        const data = await fetch(newProposalUri);
        let res = await data.json();

        const proposalItem: any = {
          id: proposalIpfs,
          proposalType,
          proposalStatus,
          startTime,
          proposalIpfs,
          votes,
          voteCount,
          ...res,
        };
        console.log("proposalItem", proposalItem);
        structuredProposals.push(proposalItem);
      } catch (error) {
        console.log("error here is proposalItem", error);
        continue;
      }
    }
    dispatch(getAllProposals(structuredProposals));
    try {
    } catch (error) {
      dispatch(addProposals(false));
    }
  }, [contract, dispatch]);
}

// export function useApproveAddress() {
//   const dispatch = useDispatch<AppDispatch>();
//   const contract = useSpjContract();
//   const chainAddresses =
//     (addresses[chainId] as any) || (addresses[ChainId.MAINNET] as any);
//   return useCallback(
//     async (value) => {
//       try {
//         console.log("approve address", account, value, contract);
//         const approveTx = await contract?.approve(chainAddresses.SPJ, value, {
//           gasLimit: 4000000,
//         });
//         const tx = await approveTx.wait();
//         console.log("approveAddress", tx);
//         return tx
//       } catch (error) {
//         console.log("approveAddress error ->", error);
//         return error
//       }
//     },
//     [contract, dispatch]
//   );
// }

export function useVoteProposal() {
  const dispatch = useDispatch();
  const contract = useZooVoting();
  const addPopup = useAddPopup();

  return useCallback(
    async (proposal, choice, successCallback, errorCallback) => {
      try {
        console.log("add proposal", proposal, choice, contract);
        dispatch(voteProposal(true));
        const vote = await contract?.voteProposal(proposal, choice, {
          gasLimit: 2000000,
        });
        const tx = await vote.wait();
        console.log("voteProposal passed", tx);
        dispatch(voteProposal(false));
        successCallback();
        addPopup({
          txn: {
            hash: null,
            summary: "Successfully placed vote",
            success: true,
          },
        });
      } catch (error) {
        console.log("vote proposla failed", error);
        dispatch(voteProposal(false));
        errorCallback();
      }
    },
    [contract, dispatch]
  );
}

export function useHasVoted() {
  const dispatch = useDispatch();
  const contract = useZooVoting();

  return useCallback(
    async (address, proposal, successCallback, errorCallback) => {
      try {
        const hasVoted = await contract?.voted(address, proposal);
        successCallback(hasVoted);
        return hasVoted;
      } catch (error) {
        errorCallback();
      }
    },
    [contract]
  );
}

// export function useGetVotingPower() {
//     const dispatch = useDispatch<AppDispatch>();
//     const contract = useZooVoting();

//     return useCallback(async () => {
//         const votingPower = await contract?.votingPower();
//         console.log('votingPowesssr', Number(votingPower))
//         dispatch(getVotingPower(votingPower?.toString()));
//     }, [contract, dispatch]);
// }

export function useGetAllVoters() {
  const dispatch = useDispatch();
  const contract = useZooVoting();

  return useCallback(async () => {
    try {
      const voters = await contract?.getAllVoters();
      return voters;
    } catch (error) {
      console.log("Error getting all voters -->", error);
    }
  }, [contract]);
}
