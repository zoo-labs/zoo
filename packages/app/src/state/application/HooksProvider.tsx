// HooksProvider.tsx
import { getPriorityConnector } from "@web3-react/core";
import { FC, ReactElement, useEffect, useState } from "react";
import { hooks as metaMaskHooks, metaMask } from "connectors/metaMask";
import { hooks as networkHooks, network } from "connectors/network";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "connectors/walletConnect";
import { hooks as walletLinkHooks, walletLink } from "connectors/walletLink";
import { setPriorityConnector } from "./actions";
import { useAppDispatch } from "state/hooks";

const HooksProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isReady, setReady] = useState<boolean>(false);

  const priorityConnector = getPriorityConnector(
    [metaMask, metaMaskHooks],
    [walletConnect, walletConnectHooks],
    [walletLink, walletLinkHooks],
    [network, networkHooks]
  );

  useEffect(() => {
    dispatch(setPriorityConnector(priorityConnector));
    setReady(true);
  }, [dispatch, priorityConnector]);

  return isReady ? (children as ReactElement) : null;
};

export default HooksProvider;
