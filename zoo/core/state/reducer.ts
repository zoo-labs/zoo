import { combineReducers } from "@reduxjs/toolkit";
import application from "./application/reducer";
import burn from "./burn/reducer";
import create from "./create/reducer";
import inari from "./inari/reducer";
import limitOrder from "./limit-order/reducer";
import lists from "./lists/reducer";
import mint from "./mint/reducer";
import multicall from "./multicall/reducer";
import network from "./network/reducer";
import swap from "./swap/reducer";
import transactions from "./transactions/reducer";
import user from "./user/reducer";
import zoo from "./zoo/reducer";
import store from "./store/reducer";
import voting from "./voting/reducer";
import bridge from "./bridge/reducer";
import drop from "./drop/reducer";

const reducer = combineReducers({
  application,
  user,
  transactions,
  swap,
  mint,
  burn,
  multicall,
  network,
  lists,
  limitOrder,
  create,
  inari,
  zoo,
  store,
  voting,
  bridge,
  drop,
});

export default reducer;
