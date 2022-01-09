import { useActiveWeb3React, useFaucet, useZooToken } from "hooks";
import { useCallback } from "react";
import { useAppDispatch } from "state/hooks";
import { Egg } from "types";
import { getEggs, getZooBalance } from "./actions";

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useZoobalance(): () => void {
  const { chainId, account } = useActiveWeb3React();
  const zooToken = useZooToken();

  const dispatch = useAppDispatch();

  return useCallback(async () => {
    if (!account) return;
    if (!chainId) return;

    const decimals = await zooToken.decimals();
    const rawBalance = await zooToken.balanceOf(account);
    const divisor = parseFloat(Math.pow(10, decimals).toString());
    const balance = rawBalance / divisor;
    dispatch(getZooBalance({ balance }));
  }, [dispatch, chainId, account]);
}
export function useBuyZoo(): () => void {
  const { chainId, account } = useActiveWeb3React();
  const faucet = useFaucet();

  const dispatch = useAppDispatch();
  const zooToken = useZooToken();
  const getZooBalance = useZoobalance();
  return useCallback(async () => {
    if (!account) return;
    if (!chainId) return;

    try {
      console.log(account);
      faucet
        .fund(account)
        .send({ from: account })
        .then(async () => {
          dispatch(getZooBalance());
          return 2;
        })
        .catch((e) => {
          console.error("ISSUE USING FAUCET \n", e);
        });
    } catch (e) {
      console.error("ISSUE USING FAUCET \n", e);
    }
  }, [dispatch, chainId, account]);
}
export function useGetEggs(): (eggs) => void {
  const dispatch = useAppDispatch();
  return useCallback(
    (eggs: Egg[]) => {
      for (let i = 0; i < eggs.length; i += 1) {
        const curr = eggs[i];
        if (curr.owner === "0x0770ACd6CF3Fc622148b1514066dD5A9147E08cb") {
          console.log("exists");
        }

        dispatch(getEggs({ curr }));
      }
    },
    [dispatch]
  );
}

// export function getZooBalance(account, zooToken) {
//   return async (dispatch) => {
//     if (!account) return
//     try {
//       const decimals = await zooToken.decimals()
//       const rawBalance = await zooToken.balanceOf(account)
//       const divisor = parseFloat(Math.pow(10, decimals).toString())
//       const balance = rawBalance / divisor
//       dispatch(updatZooBalnce(balance))
//     } catch (e) {
//       console.error('ISSUE LOADING ZOO BALANCE \n', e)
//     }
//   }
// }
