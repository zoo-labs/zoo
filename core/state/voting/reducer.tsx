import { createReducer } from "@reduxjs/toolkit";
import { Proposal } from "../../types";
import { utils } from 'ethers';

import {
  loading,
  addProposals,
  getAllProposals,
  voteProposal,
  getVotingPower,
  getVoterAllowance,
} from "./actions";

interface VotingState {
  loading: boolean;
  proposals: Proposal[];
  votingPower: string;
  voterAllowance: number;
}
const initialState: VotingState = {
  loading: false,
  proposals: [],
  votingPower: '',
  voterAllowance: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(loading, (state, action) => {
      console.log("voting.loading", action);
      if (!action || !action.payload) return
      state.loading = action.payload;
    })
    .addCase(addProposals, (state, action) => {
      console.log("addProposals", action);
      if (!action || !action.payload) return
      state.loading = action.payload;
    })
    .addCase(getAllProposals, (state, action) => {
      console.log("getAllProposals", action);
      if (!action || !action.payload) return
      state.proposals = action.payload;
    })
    .addCase(voteProposal, (state, action) => {
      console.log("voterProposal", action);
      if (!action || !action.payload) return
      state.loading = action.payload;
    })
    .addCase(getVotingPower, (state, action) => {
      console.log("getVotingPower", action);
      if (!action || !action.payload) return
      state.votingPower = action.payload;
    })
    .addCase(getVoterAllowance, (state, action) => {
      console.log("getVoterAllowance", action);
      if (!action || !action.payload) return
      state.voterAllowance = action.payload;
    })
);
