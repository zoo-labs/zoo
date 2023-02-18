import {
  ARCHER_ROUTER_ADDRESS,
  Currency,
  CurrencyAmount,
  Percent,
  ROUTER_ADDRESS,
  TradeType,
  Trade as V2Trade,
} from "@zoolabs/sdk";
import { useCallback, useMemo } from "react";
import {
  useHasPendingApproval,
  useTransactionAdder,
} from "../state/transactions/hooks";

import { MaxUint256 } from "@ethersproject/constants";
import { TransactionResponse } from "@ethersproject/providers";
import { calculateGasMargin } from "../functions/trade";
import { useActiveWeb3React } from "./useActiveWeb3React";
import { useTokenAllowance } from "./useTokenAllowance";
import { useTokenContract, useZooToken } from "./useContract";
import { wait } from "../functions/zoo";
import { ChainId } from "@zoolabs/sdk";
import { useDispatch, useSelector } from "react-redux";
import addresses from "constants/addresses";
import { getVoterAllowance } from "state/voting/actions";

export enum ApprovalState {
  UNKNOWN = "UNKNOWN",
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount<Currency>,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const { account, chainId } = useActiveWeb3React();
  const token = amountToApprove?.currency?.isToken
    ? amountToApprove.currency
    : undefined;
  const currentAllowance = useTokenAllowance(
    token,
    account ?? undefined,
    spender
  );
  const pendingApproval = useHasPendingApproval(token?.address, spender);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED;
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, currentAllowance, pendingApproval, spender]);

  const tokenContract = useTokenContract(token?.address);
  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error("approve was called unnecessarily");
      return;
    }
    if (!token) {
      console.error("no token");
      return;
    }

    if (!tokenContract) {
      console.error("tokenContract is null");
      return;
    }

    if (!amountToApprove) {
      console.error("missing amount to approve");
      return;
    }

    if (!spender) {
      console.error("no spender");
      return;
    }

    let useExact = false;
    const estimatedGas = await tokenContract.estimateGas
      .approve(spender, MaxUint256)
      .catch(() => {
        // general fallback for tokens who restrict approval amounts
        useExact = true;
        return tokenContract.estimateGas.approve(
          spender,
          amountToApprove.quotient.toString()
        );
      });

    return tokenContract
      .approve(
        spender,
        useExact ? amountToApprove.quotient.toString() : MaxUint256,
        {
          gasLimit: calculateGasMargin(estimatedGas),
        }
      )
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: "Approve " + amountToApprove.currency.symbol,
          approval: { tokenAddress: token.address, spender: spender },
        });
        return response;
      })
      .catch((error: Error) => {
        console.debug("Failed to approve token", error);
        throw error;
      });
  }, [
    approvalState,
    token,
    tokenContract,
    amountToApprove,
    spender,
    addTransaction,
  ]);

  return [approvalState, approve];
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(
  trade: V2Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent,
  doArcher: boolean = false
) {
  const { chainId } = useActiveWeb3React();
  const amountToApprove = useMemo(
    () =>
      trade && trade.inputAmount.currency.isToken
        ? trade.maximumAmountIn(allowedSlippage)
        : undefined,
    [trade, allowedSlippage]
  );
  return useApproveCallback(
    amountToApprove,
    chainId
      ? trade instanceof V2Trade
        ? !doArcher
          ? ROUTER_ADDRESS[chainId]
          : ARCHER_ROUTER_ADDRESS[chainId]
        : undefined
      : undefined
  );
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useVotingApproveCallback(
  amountToApprove?: number,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const { account, chainId } = useActiveWeb3React();
  const { loading, voterAllowance } = useSelector((state: any) => state.voting);

  const dispatch = useDispatch();
  console.log("amountToApprove", amountToApprove, spender);
  const contract = useZooToken();

  const chainAddresses =
    (addresses[chainId] as any) || (addresses[ChainId.BSC] as any);

  // const currentAllowance = useTokenAllowance(account ?? undefined, spender)
  contract
    ?.allowance(account, spender, {
      gasLimit: 4000000,
    })
    .then((val) => {
      dispatch(getVoterAllowance(Number(val)));
    })
    .catch((err) => console.log("err", err));

  const pendingApproval = useHasPendingApproval(account, spender);
  // console.log('currentAllowance', currentAllowance)
  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {

    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    // if (amountToApprove.currency.isNative) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve

    if (voterAllowance == null) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    const state =
      voterAllowance < amountToApprove
        ? pendingApproval
          ? ApprovalState.PENDING
          : ApprovalState.NOT_APPROVED
        : ApprovalState.APPROVED;

    return state;
  }, [amountToApprove, voterAllowance, pendingApproval, spender]);

  const tokenContract = useZooToken();
  const addTransaction = useTransactionAdder();
  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error("approve was called unnecessarily", approvalState);
      return;
    }
    // if (!token) {
    //   console.error('no token')
    //   return
    // }

    if (!tokenContract) {
      console.error("tokenContract is null");
      return;
    }

    if (!amountToApprove) {
      console.error("missing amount to approve");
      return;
    }

    if (!spender) {
      console.error("no spender");
      return;
    }

    let useExact = false;
    // const estimatedGas = await tokenContract.approve(spender, MaxUint256).catch(() => {
    //   // general fallback for tokens who restrict approval amounts
    //   useExact = true
    //   return tokenContract.approve(spender, amountToApprove.toString())
    // })

    return tokenContract
      .approve(spender, useExact ? amountToApprove.toString() : MaxUint256, {
        gasLimit: 4000000,
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: "Approve " + amountToApprove,
          approval: {
            tokenAddress: chainAddresses?.ZOOVOTING,
            spender: spender,
          },
        });
      })
      .catch((error: Error) => {
        console.debug("Failed to approve token", error);
        throw error;
      });
  }, [
    approvalState,
    tokenContract,
    amountToApprove,
    spender,
    addTransaction,
    chainAddresses?.ZOOVOTING,
  ]);

  return [approvalState, approve];
}
