import { createAction } from "@reduxjs/toolkit";
import { AvailableEgg as Drop } from "types";

export const addDrops = createAction<Drop[]>("zoo/addDrops");
