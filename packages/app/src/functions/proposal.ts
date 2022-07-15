import { ProposalState } from "hooks/useVote";
import { useCallback } from "react";
import { Proposal } from "types";

export const getProposalState = (proposal: Proposal) => {
    const endTime = new Date(proposal.endTime);
    const startTime = new Date(proposal.startTime);
    const now = new Date();

    if (startTime > now) {
        return ProposalState.PENDING;
    } else if (endTime < now) {
        return ProposalState.ENDED
    } else {
        return ProposalState.ONGOING
    }
};

export const filteredProposals = (proposals: Proposal[], type: number, state: string) => proposals.filter((proposal) => {
    console.log('proposal', proposal, getProposalState(proposal), state)
    const proposalPass = type === 3
        ? getProposalState(proposal) === state
        : getProposalState(proposal) === state &&
        proposal.proposalType === type
    return proposalPass
});

export const calcAmountToPay = (timesVoted: number) => {
    ///(n+1th)2 - (nth)2
    return ((timesVoted + 1) ** 2) - timesVoted ** 2;
}

