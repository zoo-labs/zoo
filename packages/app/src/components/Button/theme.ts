import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    height: "48px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    padding: "0 16px",
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: "primaryPop",
    color: "white",
  },
  [variants.SECONDARY]: {
    backgroundColor: "transparent",
    border: "2px solid",
    borderColor: "white",
    boxShadow: "none",
    color: "white",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: "tertiary",
    boxShadow: "none",
    color: "primaryBright",
  },
  [variants.SUBTLE]: {
    backgroundColor: "textSubtle",
    color: "tertiary",
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "white",
  },
  [variants.DISABLED]: {
    backgroundColor: "disabledBubblegum",
    color: "white",
  },
  [variants.SUCCESS]: {
    backgroundColor: "success",
    color: "white",
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    color: "white",
    boxShadow: "none",
  },
  [variants.BUBBLEGUM]: {
    background: "transparent",
    color: "primaryPop",
    ":disabled": {
      backgroundColor: "disabledBubblegum",
      color: "textDisabled"
    },
  },
  [variants.BUTTONGUM]: {
    background: "primaryPop",
    color: "black",
  },
  [variants.MARBLE]: {
    background: "linear-gradient(129deg,#6287bf 3.22%,#0DD8CE 96.22%)",
    color: "white",
  },
  [variants.OPACITY]: {
    background: "linear-gradient(137deg,#c5dcff8c 2.22%,#12f5ea59 98.22%)",
    color: "teriary",
  }
};// #01255f
