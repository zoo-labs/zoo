import { useActiveWeb3React, useFaucet, useZooToken } from "hooks";
import { useCallback } from "react";
import { useAppDispatch } from "state/hooks";
import { Egg } from "types";

import { useMoralisWeb3Api } from "react-moralis";
import {
  useMedia,
  useZooKeeper,
  useDrop,
  useBnbToken,
} from "hooks/useContract";
import { useDispatch } from "react-redux";
import {
  getZooBalance,
  getEggs,
  eggsCount,
  animalsCount,
  breedsCount,
  updateMyNfts,
  getAvailableEggs,
  loading,
} from "./actions";
import { useAddPopup } from "state/application/hooks";
import { MaxUint256 } from "@ethersproject/constants";
import { formatError } from "functions";

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
    console.log("rawBalance", balance);
    dispatch(getZooBalance({ balance }));
  }, [dispatch, chainId, account]);
}
export function useBuyZoo(): () => void {
  const { chainId, account } = useActiveWeb3React();
  console.log("buying zoo");
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

export function useFetchMyNFTs(): () => void {
  const Web3Api = useMoralisWeb3Api();
  const { account } = useActiveWeb3React();
  const media = useMedia();
  const zooKeeper = useZooKeeper();
  const dispatch = useDispatch();

  return useCallback(async () => {
    // get NFTs for current user on Mainnet
    // bsc nfts
    const bscNFTs = await Web3Api.account.getNFTsForContract({
      chain: "bsc",
      address: account,
      token_address: media?.address,
    });

    // bsc testnet nfts
    const bscTestnetNFTs = await Web3Api.account.getNFTsForContract({
      chain: "bsc testnet",
      address: account,
      token_address: media?.address,
    });

    const structuredNft = [...bscNFTs.result, ...bscTestnetNFTs.result];
    let newStruct = [];
    let _eggsCount = 0;
    let _animalsCount = 0;
    let _breedCount = 0;

    for (let i = 0; i < structuredNft.length; i++) {
      const id = structuredNft[i].token_id;
      const deet = await zooKeeper?.tokens(Number(id));

      if (deet?.kind === 0) _eggsCount++;
      else if (deet?.kind === 1) _animalsCount++;
      else if (deet?.kind === 2) _breedCount++;
      // console.log('d_deets', deet)
      const newNft = {
        customName: deet?.customName,
        name: deet?.name,
        kind: deet?.kind,
        id: Number(deet?.id),
        timestamp: Number(deet?.timestamp),
        birthday: Number(deet?.birthday),
        dropId: Number(deet?.meta?.dropID),
        eggId: Number(deet?.meta?.eggID),
        swapped: deet?.meta?.swapped,
        burned: deet?.meta?.burned,
        parents: {
          animalA: deet?.parents?.animalB,
          animalB: deet?.parents?.animalB,
          tokenA: Number(deet?.parents?.tokenA),
          tokenB: Number(deet?.parents?.tokenB),
        },
        data: deet?.data,
        breed: {
          count: Number(deet?.breed?.count),
          timestamp: Number(deet?.breed?.timestamp),
        },
      };

      newStruct.push(newNft);
    }
    dispatch(eggsCount(_eggsCount));
    dispatch(animalsCount(_animalsCount));
    dispatch(breedsCount(_breedCount));
    dispatch(updateMyNfts([...newStruct]));
  }, [Web3Api.account, account, media?.address, zooKeeper, dispatch]);
}

export function useGetAvailableEggs(): () => void {
  const dispatch = useAppDispatch();
  const dropContract = useDrop(true);

  return useCallback(async () => {
    const eggs = await dropContract?.getAllEggs();
    if (!eggs) return;
    const structuredEggs = eggs.map((egg) => {
      return {
        bidShares: {
          creator: Number(egg?.bidShares?.creator),
          owner: Number(egg?.bidShares?.owner),
          prevOwner: Number(egg?.bidShares?.prevOwner),
        },
        birthday: Number(egg.birthday),
        data: egg.data,
        exist: true,
        id: Number(egg.id),
        kind: egg.kind,
        minted: Number(egg.minted),
        name: egg.name,
        price: Number(egg.price) / 10 ** 18,
        supply: Number(egg.supply),
        timestamp: Number(egg.timestamp),
      };
    });
    console.log("structuredEggs", structuredEggs);
    dispatch(getAvailableEggs(structuredEggs));
  }, [dispatch, dropContract]);
}

export function useBuyEgg(): (
  eggId: string | number,
  quantity: number,
  success?: () => void
) => void {
  const addPopup = useAddPopup();
  const zooKeeper = useZooKeeper();
  const { account } = useActiveWeb3React();
  const zoo = useZooToken();
  const dropId = process.env.NEXT_PUBLIC_DROP_ID;
  const dispatch = useDispatch();
  return useCallback(
    async (eggId, quantity, success) => {
      console.log("buying_eggggg", { eggId, quantity, dropId, zooKeeper });
      if (!zooKeeper) return;
      try {
        dispatch(loading(true));
        const approval = await zoo?.allowance(account, zooKeeper.address);
        console.log("approval_buy_egg", Number(approval));
        if (Number(approval) <= 0) {
          console.log("approving_media");
          await zoo
            ?.approve(zooKeeper.address, MaxUint256, {
              gasLimit: 4000000,
            })
            .then((tx) => {
              console.log("approval", tx);
              tx.wait();
            });
        }
        const tx = await zooKeeper.buyEggs(eggId, dropId, quantity, {
          gasLimit: 4000000,
        });
        await tx.wait();
        console.log(tx);
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully bought ${quantity} egg${
              quantity !== 1 ? "s" : ""
            }`,
            success: true,
          },
        });
        dispatch(loading(false));
        success && success();
      } catch (e) {
        console.error("ISSUE BUYING EGG \n", e);
        dispatch(loading(false));
        addPopup({
          txn: {
            hash: null,
            summary: formatError(e),
            success: false,
          },
        });
      }
    },
    [account, addPopup, dispatch, dropId, zoo, zooKeeper]
  );
}

export function useBuyEggWithBnB(): (
  eggId: string | number,
  quantity: number,
  success?: () => void
) => void {
  const addPopup = useAddPopup();
  const { account } = useActiveWeb3React();
  const zoo = useZooToken();
  const bnb = useBnbToken();
  const zooKeeper = useZooKeeper();
  const dropId = process.env.NEXT_PUBLIC_DROP_ID;
  const dispatch = useDispatch();
  return useCallback(
    async (eggId, quantity, success) => {
      console.log("buying_eggggg", { eggId, quantity, dropId, zooKeeper });
      if (!zooKeeper) return;
      try {
        dispatch(loading(true));
        const approval = await bnb?.allowance(account, zooKeeper.address);
        console.log("approval_approving_media", Number(approval));
        if (Number(approval) <= 0) {
          console.log("approving_media");
          await bnb
            ?.approve(zooKeeper.address, MaxUint256, {
              gasLimit: 4000000,
            })
            .then((tx) => {
              console.log("approval", tx);
              tx.wait();
            });
        }
        const tx = await zooKeeper.buyEggsWithBNB(eggId, dropId, quantity, {
          gasLimit: 4000000,
        });
        await tx.wait();
        console.log(tx);
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully bought ${quantity} eggs`,
            success: true,
          },
        });
        dispatch(loading(false));
        success && success();
      } catch (e) {
        console.error("ISSUE BUYING EGG \n", e);
        dispatch(loading(false));
        addPopup({
          txn: {
            hash: null,
            summary: formatError(e),
            success: false,
          },
        });
      }
    },
    [addPopup, dispatch, dropId, zooKeeper]
  );
}

export function useTransferZoo(): (recipient: string, amount: number) => void {
  const addPopup = useAddPopup();
  const zoo = useZooToken();
  return useCallback(
    async (recipient, amount) => {
      if (!zoo) return;
      try {
        // const toWei = amount * Math.pow(10, 18)
        const tx = await zoo?.transfer(recipient, amount, {
          gasLimit: 4000000,
        });
        await tx.wait();
        console.log(tx);
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully transferred ${amount} $zoo to ${recipient}`,
            success: true,
          },
        });
      } catch (e) {
        console.error("ISSUE TRANSFERRING ZOO \n", e);
        addPopup({
          txn: {
            hash: null,
            summary: formatError(e),
            success: false,
          },
        });
      }
    },
    [addPopup, zoo]
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
