import { addDrops } from "./action";
import { createReducer } from "@reduxjs/toolkit";
import { AvailableEgg as Drop } from "types";

const initialState = {
  drops: [],
};

export default createReducer(initialState, (builder) =>
  builder.addCase(addDrops, (state, action) => {
    state.drops = action.payload;
  })
);
