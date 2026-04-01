import { createAction } from "@reduxjs/toolkit";

export const loading = createAction("voting/loading");
export const addProposals = createAction<any>("voting/addProposals");
export const getAllProposals = createAction<any>("voting/getAllProposals");
export const voteProposal = createAction<any>("voting/voteProposal");
export const getVotingPower = createAction<any>("voting/getVotingPower");
export const getVoterAllowance = createAction<any>("voting/getVoterAllowance");
