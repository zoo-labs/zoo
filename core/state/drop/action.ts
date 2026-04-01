import { createAction } from "@reduxjs/toolkit";
import { Drop } from "../../types";

export const addDrops = createAction<Drop[]>("zoo/addDrops");
