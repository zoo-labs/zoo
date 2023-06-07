import { addDrops } from "./action";
import { createReducer } from "@reduxjs/toolkit";
import type { AvailableEgg, Drop } from "../../types";

const initialState = {
  drops: [] as Drop[],
};

export default createReducer(initialState, (builder) =>
  builder.addCase(addDrops, (state, action) => {
    state.drops = action.payload as unknown as Drop[];
  })
);
