import { createReducer } from "@reduxjs/toolkit";
import { Proposal } from "types";
import Web3 from "web3";
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
  votingPower: null,
  voterAllowance: null,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(loading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(addProposals, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(getAllProposals, (state, action) => {
      state.proposals = action.payload;
    })
    .addCase(voteProposal, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(getVotingPower, (state, action) => {
      state.votingPower = Web3.utils.fromWei(action.payload, "ether");
    })
    .addCase(getVoterAllowance, (state, action) => {
      console.log("state.voterAllowance", action.payload);
      state.voterAllowance = action.payload;
    })
);
