import { SUPPORTED_NETWORKS } from "config/networks";
import { ChainId } from "constants/chainIds";
import { addresses } from "constants/contracts";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useCallback } from "react";
//import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { Balance, Token, TokenSelect } from "./types";
import {
  fetchBalances,
  fetchTokens,
  updateCurrentAmount,
  updateCurrentBalances,
  updateCurrentTrade,
  updateError,
  updateActiveChains,
  loading,
} from "./action";
import { notify } from "components/alertMessage";
import { useRouter } from "next/router";
import Web3 from "web3";
import { AppState } from "state";

export function useAllTokens(): { [chainId in ChainId]?: Token[] } {
  return useSelector((state: AppState) => state.bridge.tokens);
}
export function useGetAvailableTokens(): (chain?: number) => void {
  const activeChain: number = useSelector(
    (state: AppState) => state.bridge.activeChain
  );

  const dispatch = useDispatch();
  //const { Moralis } = useMoralis();

  // console.log("activeChainToFetch", activeChain, aChain);
  return useCallback(async (chain) => {
    try {
      const chainAddresses: {
        LBTC: string
        LETH: string;
        LUSD: string
        TELEPORT: string;
        ZOO: string
      } =
        (addresses[chain] as any) || (addresses[ChainId.MAINNET] as any);
      const result: { tokens: { [address: string]: Token[] } } = { tokens: {} };
        // await Moralis.Plugins.oneInch.getSupportedTokens({
        //   chain:
        //     SUPPORTED_NETWORKS[chain].nativeCurrency.symbol.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
        // });
      const customTokens: any = {

        [chainAddresses.ZOO]: {
          decimals: 18,
          symbol: "ZOO",
          address: chainAddresses.ZOO,
          logoURI: "/img/egg.png",
          name: "ZOO",
          isNative: false,
        }, [chainAddresses.LETH]: {
          decimals: 18,
          symbol: "LETH",
          address: chainAddresses.LETH,
          logoURI: "/icons/lux-triangle.png",
          name: "LuxETH",
          isNative: false,
        }
      };
      const tokens = result.tokens

      const resultTokens = chain == 43113 ? customTokens : { ...customTokens, ...tokens, };
      dispatch(fetchTokens({ [chain]: resultTokens }));

    } catch (error) {
      console.log("error in useGetAvailableTokens", error);
    }
  }, [Moralis.Plugins.oneInch, dispatch]);
  // const supported_networks = SUPPORTED_NETWORKS;
  // const native = NATIVE;
  // console.log("chainId ==>", native, supported_networks);

  // return useCallback(
  //   async (chain) => {
  //     console.log("chainId ==>", native, supported_networks[chainId]);
  //     try {
  //       console.log("starting fetch ==>", chain);
  //       // const resultTokens: { [chainId in ChainId]?: Token[] } = {};

  //       const resultTokens: { [chainId in ChainId]?: Token[] } =
  //         await Moralis.Plugins.oneInch.getSupportedTokens({
  //           chain:
  //             SUPPORTED_NETWORKS[chainId].nativeCurrency.symbol.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
  //           limit: 10, // The number of tokens you want to get
  //           // native[chain ?? chainId].nativeCurrency.symbol.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
  //         });

  //       console.log("_resultTokens", resultTokens);
  //       dispatch(fetchTokens(resultTokens));

  //       const from = Object.values(resultTokens[1]).find(
  //         (val: any) => val.symbol === "ETH"
  //       );
  //       dispatch(
  //         updateCurrentTrade({
  //           to: {},
  //           from: { ...from, isNative: from.symbol === "ETH" },
  //         })
  //       );
  //     } catch (error) {
  //       console.log("error in useGetAvailableTokens", error);
  //     }
  //   },
  //   [native, supported_networks, chainId, Moralis.Plugins.oneInch, dispatch]
  // );
}

export function useUpdateActiveChains(): (chain: ChainId, side: 'from' | 'to') => void {
  const router = useRouter();
  const dispatch = useDispatch();
  const aChains = useSelector((state: AppState) => state.bridge.activeChains);
  return useCallback(
    (chain: number, side: string) => {
      // console.log('useUpdateActiveChains sidee', side)
      // console.log('useUpdateActiveChains chainnnnn', chain)
      const chainSide = side === 'to' ? 'toChain' : 'fromChain'
      router.query[chainSide] = String(chain);
      router.push(router);
      // dispatch(updateCurrentTrade({}));
      // dispatch(updateCurrentAmount({}));
      // dispatch(updateCurrentBalances({}));
      // dispatch(fetchBalances({}));
      // dispatch(updateError({}));
      // dispatch(loading({}));
      // dispatch(fetchTokens({}));
      dispatch(updateActiveChains({
        ...aChains, [side]: chain
      }));
    },
    [dispatch, router, aChains]
  );
}

export function useFetchUserBalances(): () => void {

  const { chainId, account } = useActiveWeb3React();
  const dispatch = useDispatch();
  //const Web3Api = useMoralisWeb3Api();
  // const getCurrentBalances = useGetCurrentBalances();
  const { activeChains } = useAppSelector((state) => state.bridge);

  return useCallback(async () => {
    try {
      let balances: { [chain in ChainId]?: Balance[] } = {};
      // await Object.values(activeChains).forEach(async (chain: number, index) => {
      //   console.log('useFetchUserBalances chain', chain)
      //   //GET NONE SUPPORTED CHAIN ID BALANCE (LUX)
      //   const options: { chain?: any; address: string } = {
      //     chain: SUPPORTED_NETWORKS[chain].chainId,
      //     address: account,
      //   };
      //   const nativeBalance = await Web3Api.account.getNativeBalance(options);
      //   const balanc = await Web3Api.account.getTokenBalances(options);

      //   const newbalances = [
      //     ...balanc,
      //     {
      //       name: SUPPORTED_NETWORKS[chain].chainName,
      //       symbol: SUPPORTED_NETWORKS[chain].nativeCurrency.symbol,
      //       decimals: SUPPORTED_NETWORKS[chain].nativeCurrency.decimals,
      //       balance: nativeBalance.balance
      //     }
      //   ];
      //   balances = { ...balances, [chain]: newbalances }
      //   console.log("balanceeee useFetchUserBalances", balances);

      // })

      for (const chain of Object.values(activeChains)) {
        //GET NONE SUPPORTED CHAIN ID BALANCE (LUX)
        const options: { chain?: any; address: string } = {
          chain: SUPPORTED_NETWORKS[chain as string].chainId,
          address: account,
        };
        const nativeBalance = await Web3Api.account.getNativeBalance(options);
        const balanc = await Web3Api.account.getTokenBalances(options);

        const newbalances = [
          ...balanc,
          {
            name: SUPPORTED_NETWORKS[chain as number].chainName,
            symbol: SUPPORTED_NETWORKS[chain as number].nativeCurrency.symbol,
            decimals: SUPPORTED_NETWORKS[chain as number].nativeCurrency.decimals,
            balance: nativeBalance.balance
          }
        ];
        balances = { ...balances, [chain as number]: newbalances }

      }

      dispatch(fetchBalances(balances));
      // getCurrentBalances();
    } catch (error) {
      console.log("error in useFetchUserBalances", error);
    }
  }, [dispatch, chainId, account]);
}

// export function useGetCurrentBalances(): () => void {
//   const dispatch = useDispatch();

//   const { currentTrade, balances, activeChains } = useAppSelector((state) => state.bridge);
//   const { Moralis } = useMoralis();
//   const { account, library } = useActiveWeb3React()
//   // const getQuote = useGetQuote();

//   console.log("useGetCurrentBalances", currentTrade);
//   return useCallback(async () => {
//     try {
//       if (currentTrade) {
//         const tokenBalances: { to: number; from: number } = {
//           to: 0,
//           from: 0,
//         };
//         console.log(
//           "useGetCurrentBalances in tokenBalances",
//           tokenBalances,
//           currentTrade,
//           balances
//         );

//         Object.keys(currentTrade).forEach((trade) => {
//           if (activeChains[trade] !== 4) {
//             const lBTCContract = altContract('LBTC', activeChains[trade], account, library)
//             console.log('lBTCContract', activeChains[trade], lBTCContract)
//             if (lBTCContract) {
//               customChainFunc(lBTCContract, account)

//             }
//           }
//           const tradeBalance = balances.find(
//             (balance) => balance.symbol === currentTrade[trade].symbol
//           );
//           tokenBalances[trade] =
//             balances.length > 0 && tradeBalance
//               ? Moralis.Units.FromWei(tradeBalance.balance)
//               : "0";
//         });
//         console.log("tokenBalances", tokenBalances);
//         dispatch(updateCurrentBalances(tokenBalances));
//         // getQuote(currentAmount)
//       }
//     } catch (error) {
//       console.log("error in useFetchUserBalances", error);
//     }
//   }, [dispatch, currentTrade, balances]);
// }
const customChainFunc = async (lBTCContract, account) => {

  const value = await Web3.utils.fromWei(
    (await lBTCContract?.balanceOf(account)).toString(),
    "ether"
  );
  return value;
}
// Object.keys(currentTrade).forEach(async (trade) => {

//   const lBTCContract = altContract('LBTC', activeChains[trade], account, library)
//   console.log('useGetCurrentBalances, lBTCContract', lBTCContract)
//   const tradeBalance = await Web3.utils.fromWei(
//     (await lBTCContract.balanceOf(account)).toString(),
//     "ether"
//   );
//   console.log('useGetCurrentBalances', tradeBalance)
//   tokenBalances[trade] = tradeBalance
// });
export function useGetQuote(): (
  currentAmount: TokenSelect,
  side?: "from" | "to"
) => void {
  const dispatch = useDispatch();
  //const { Moralis } = useMoralis();
  const { currentTrade, currentSelectSide } = useAppSelector(
    (state: AppState) => state.bridge
  );
  return useCallback(
    async (currentAmount, side) => {
      const newSide = side || currentSelectSide;

      try {
        if (!currentTrade.from || !currentTrade.to || !currentAmount[newSide])
          return;
        // const amount = Number(toAmount * 10 ** currentTrade.from.decimals);
        // const amount = Moralis.Units.Token(
        //   currentAmount[newSide],
        //   currentTrade[newSide].decimals
        // ).toString();

        // const quote = await Moralis.Plugins.oneInch.quote({
        //   chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
        //   fromTokenAddress: currentTrade[newSide].address, // The token you want to swap
        //   toTokenAddress:
        //     currentTrade[newSide === "from" ? "to" : "from"].address, // The token you want to receive
        //   amount,
        // });
        // dispatch(
        //   updateCurrentAmount({
        //     ...currentAmount,
        //     [newSide === "from" ? "to" : "from"]: (
        //       quote.toTokenAmount /
        //       10 ** quote.toToken.decimals
        //     ).toFixed(8),
        //   })
        // );

      } catch (error) {
        console.log("error useGetQuote,", error);
        // console.log(
        //   "errror in useGetQuote quote",
        //   JSON.parse(error.message.text)
        // );
        dispatch(updateError(JSON.parse(error.message.text).data));
      }
    },
    [dispatch, currentSelectSide, currentTrade]
  );
}

export function useSwap(): () => void {
  //const { Moralis } = useMoralis();
  const { account } = useActiveWeb3React();
  const { currentTrade, currentAmount } = useAppSelector(
    (state: AppState) => state.bridge
  );
  const dispatch = useAppDispatch();
  return useCallback(async () => {
    // let amount = Number(fromAmount * 10 ** currentTrade.from.decimals);
    dispatch(loading(true));
    const amount = Moralis.Units.Token(
      currentAmount["from"],
      currentTrade.from.decimals
    ).toString();

    if (currentTrade.from.symbol !== "ETH") {
      const allowance = await Moralis.Plugins.oneInch.hasAllowance({
        chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: currentTrade.from.address, // The token you want to swap
        fromAddress: account, // Your wallet address
        amount: amount,
      });
      if (!allowance) {
        await Moralis.Plugins.oneInch.approve({
          chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
          tokenAddress: currentTrade.from.address, // The token you want to swap
          fromAddress: account, // Your wallet address
        });
      }
    }
    try {
      let receipt = await Moralis.Plugins.oneInch.swap({
        chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: currentTrade.from.address, // The token you want to swap
        toTokenAddress: currentTrade.to.address, // The token you want to receive
        amount: amount,
        fromAddress: account, // Your wallet address
        slippage: 1,
      });
      //   alert("Swap Complete");
      notify("Swap Complete", "success");

      dispatch(loading(false));
    } catch (error) {
      console.error("error in try swappp", error);
      //   notify("Something went wrong. Try again later", "error");
      dispatch(loading(false));
      if (!!error.message) {
        if (error.message.text) {
          notify(
            JSON.parse(JSON.parse(error.message.text)?.data)?.message,
            "error"
          );
        } else {
          notify(error.message, "error");
        }
        return;
      } else if (!!error.error) {
        notify(error.error, "error");
        console.log("err_err");

        return;
      } else if (typeof error === "string") {
        notify(error, "error");
        console.log("err_str");

        return;
      }
      notify("Something went wrong. Try again later", "error");
    }
  }, [currentTrade, currentAmount, dispatch]);
}

export function useGetTokenFiatValue(): (address) => Promise<number> {
  //const Web3Api = useMoralisWeb3Api();
  const { chainId } = useActiveWeb3React();

  return useCallback(
    async (address) => {
      try {
        const options: { chain?: any; address: string; exchange?: string } = {
          chain: SUPPORTED_NETWORKS[chainId].chainId,
          address,
        };
        const price = await Web3Api.token.getTokenPrice(options);

        return price.usdPrice;
      } catch (error) {
        // console.log("valll here error in useGetTokenFiatValue", error);
      }
    },
    [chainId]
  );
}

export const useTokenBalance = (token) => {
  //const { Moralis } = useMoralis();
  const { balances } = useAppSelector((state: AppState) => state.bridge);
  const tokenBalance = balances.find(
    (balance) => balance.symbol === token.symbol
  );
  return balances.length > 0 && tokenBalance
    ? Moralis.Units.FromWei(tokenBalance.balance)
    : "0";
};

export const useAllTokenBalances = () => {
  const { balances } = useAppSelector((state: AppState) => state.bridge);

  return balances.length > 0 ? balances : [];
};

export const useToken = (address) => {
  const { tokens } = useAppSelector((state: AppState) => state.bridge);

  return tokens.length > 0
    ? tokens.find((token) => token.address === address)
    : null;
};

export function useBridge(): () => void {

  return useCallback(async () => {
    // let amount = Number(fromAmount * 10 ** currentTrade.from.decimals);

  }, []);
}
