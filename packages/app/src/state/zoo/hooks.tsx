import { useActiveWeb3React, useFaucet, useZooToken } from "hooks";
import { useCallback } from "react";
import { useAppDispatch } from "state/hooks";
import { Auction, Egg } from "types";

import { useMoralisWeb3Api } from "react-moralis";
import {
  useMedia,
  useZooKeeper,
  useDrop,
  useBnbToken,
  useAuction,
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
  getAllAuctions,
  createBid,
  getBNBBalance,
  addNftTTransfers,
} from "./actions";
import { useAddPopup } from "state/application/hooks";
import { MaxUint256 } from "@ethersproject/constants";
import { formatError } from "functions";
import { useTransactionAdder } from "state/transactions/hooks";
import { addresses } from "../../constants";
import { ChainId } from "constants/chainIds";
import { addDays, differenceInSeconds } from "date-fns";

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useZoobalance(): () => void {
  const { chainId, account } = useActiveWeb3React();
  const zooToken = useZooToken();

  const dispatch = useAppDispatch();

  return useCallback(async () => {
    try {
      if (!account) return;
      if (!chainId) return;
      console.log("zooToken", zooToken);
      const decimals = await zooToken.decimals();
      const rawBalance = await zooToken.balanceOf(account);
      console.log("rawBalance", rawBalance);

      const divisor = parseFloat(Math.pow(10, decimals).toString());
      const balance = rawBalance / divisor;
      console.log("rawBalance", balance);
      dispatch(getZooBalance({ balance }));
    } catch (error) {
      console.log("error in get zoo balance", error);
    }
  }, [dispatch, chainId, account]);
}

export function useBuyZoo(): () => void {
  const { chainId, account } = useActiveWeb3React();
  const faucet = useFaucet();
  console.log("buying zoo");

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
export function useHatch(): (
  dropEggId: number,
  eggId: number,
  success?: () => void
) => void {
  const addPopup = useAddPopup();
  const zooKeeper = useZooKeeper();
  const { account } = useActiveWeb3React();
  const zoo = useZooToken();
  const dropId = process.env.NEXT_PUBLIC_DROP_ID;
  const dispatch = useAppDispatch();
  return useCallback(
    async (dropEggId, eggId, success) => {
      if (!zooKeeper) return;
      console.log("zooKeeper_usehatch", {
        dropEggid: Number(dropEggId),
        dropId: Number(dropId),
        eggId: Number(eggId),
        zooKeeper: zooKeeper.address,
      });
      try {
        dispatch(loading(true));
        const approval = await zoo?.allowance(account, zooKeeper.address);
        console.log("approval_", Number(approval));

        if (Number(approval) <= 0) {
          console.log("approving_media");
          await zoo
            ?.approve(zooKeeper.address, MaxUint256, {
              gasLimit: 4000000,
            })
            .then((tx) => {
              console.log("approval", tx);
              tx.wait();
            })
            .catch((err) => {
              console.error("ISSUE APPROVING MEDIA \n", err);
              dispatch(loading(false));
              addPopup({
                txn: {
                  hash: null,
                  summary: formatError(err),
                  success: false,
                },
              });
              return;
            });
        }
        const tx = await zooKeeper?.hatchEgg(Number(dropId), Number(eggId), {
          gasLimit: 4000000,
        });
        await tx.wait();
        dispatch(loading(false));
        success && success();
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully hatched egg ${eggId}`,
            success: true,
          },
        });
      } catch (error) {
        console.error("error hatching egg", error);
        dispatch(loading(false));
        addPopup({
          txn: {
            hash: null,
            summary: formatError(error),
            success: false,
          },
        });
      }
    },
    [account, addPopup, dispatch, dropId, zoo, zooKeeper]
  );
}
export function useFetchMyNFTs(): () => void {
  const Web3Api = useMoralisWeb3Api();
  console.log("structuredNft fetching nfts", Web3Api);

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
    console.log("structuredNft bscTestnetNFTs", bscTestnetNFTs);
    const structuredNft = [...bscNFTs.result, ...bscTestnetNFTs.result];
    let newStruct = [];
    let _eggsCount = 0;
    let _animalsCount = 0;
    let _breedCount = 0;
    console.log("structuredNft", structuredNft);
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

export function useGetNftTransfers(): () => void {
  const Web3Api = useMoralisWeb3Api();
  const { account } = useActiveWeb3React();
  const media = useMedia();
  const dispatch = useDispatch();
  return useCallback(async () => {
    // get NFTs for current user on Mainnet
    // bsc nfts
    const option: { chain: "0x61"; address: string; token_address: string } = {
      chain: "0x61",
      address: account,
      token_address: media?.address,
    };
    const bscNFTs = await Web3Api.account.getNFTTransfers(option);
    console.log("bscNFTs", bscNFTs);
    dispatch(addNftTTransfers(bscNFTs.result));
  }, [Web3Api.account, account, media?.address, dispatch]);
}
export function useGetAvailableEggs(): () => void {
  const dispatch = useAppDispatch();
  const dropContract = useDrop();
  const { account } = useActiveWeb3React();
  return useCallback(async () => {
    console.log("useGetAvailableEggs  contract", dropContract);
    try {
      const eggs = await dropContract?.getAllEggs();
      console.log("useGetAvailableEggs", eggs);
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
    } catch (error) {
      console.log("errir in useGetAvailableEggs", error);
    }
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
  const dropId = process.env.NEXT_PUBLIC_DROP_ID || 1;
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
        console.log("eggId, dropId, quantity", eggId, dropId, quantity);
        const tx = await zooKeeper.buyEggs(eggId, dropId, quantity, {
          gasLimit: 4000000,
        });
        await tx.wait();
        await tx.wait();
        console.log("tx in buy egg", tx);
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

export function useGetAllAuctions(): () => void {
  const auctionContract = useAuction();
  const dispatch = useDispatch();
  return useCallback(async () => {
    console.log("auction ytfrtdtrsd", auctionContract);

    const auctions = await auctionContract?.getAllAuctions();
    console.log("auctions await", auctions);
    const structuredAuctions = auctions?.map((auction: Auction) => {
      const {
        tokenID,
        tokenOwner,
        reservePrice,
        firstBidTime,
        duration,
        curatorFeePercentage,
        curator,
        auctionCurrency,
        amount,
      } = auction;
      return {
        tokenID: Number(tokenID),
        tokenOwner,
        reservePrice: Number(reservePrice),
        firstBidTime: Number(firstBidTime),
        duration: Number(duration),
        curatorFeePercentage,
        curator,
        auctionCurrency,
        amount: Number(amount),
      };
    });
    console.log("structuredAuctionss", structuredAuctions);
    dispatch(getAllAuctions(structuredAuctions || []));
  }, [dispatch, auctionContract]);
}

export function useApproveTokenWithMedia(): (
  tokenId?: number,
  spender?: string
) => Promise<any> {
  const { chainId } = useActiveWeb3React();
  const media = useMedia();
  const dispatch = useAppDispatch();
  const addTransaction = useTransactionAdder();
  return useCallback(
    async (tokenId?: number, spender?: string) => {
      const chainAddresses =
        (addresses[chainId] as any) || (addresses[ChainId.BSC] as any);
      if (!chainId) return;
      if (!media) return;

      // console.log('form_usdjndks', {
      //   tokenId,
      //   spender,
      //   media,
      // })
      console.log("form_usdjndks", {
        media: media.address,
        spender: spender,
        same: media.address === spender,
      });

      try {
        console.log("about to approve token", tokenId, spender);
        const trx = await media?.setApprovalForAll(spender, true, {
          gasLimit: 4000000,
        });

        console.log("I'm approving");
        await trx.wait();
        console.log("approved");

        addTransaction(trx, {
          summary: "Approve " + tokenId,
          approval: { tokenAddress: chainAddresses.media, spender: spender },
        });

        return trx;
      } catch (error) {
        console.error("error approving token", error);
      }
    },
    [chainId, media, addTransaction]
  );
}

// Putting animal on market (Creating Auction)
export function useCreateAuction(): (
  tokenID: number,
  duration: number,
  reservePrice: number,
  curatorFeePercentage: number,
  success?: () => void
) => void {
  const addPopup = useAddPopup();
  const auction = useAuction();
  const zoo = useZooToken();
  const { account } = useActiveWeb3React();
  const tokenContract = useMedia();
  const approveTokenWithMedia = useApproveTokenWithMedia();
  const auctionCurrency = zoo?.address;
  const dispatch = useDispatch();
  return useCallback(
    async (tokenID, duration, reservePrice, curatorFeePercentage, success) => {
      if (!auction) return;
      dispatch(loading(true));
      console.log("auction", auction, auctionCurrency);
      try {
        const isApproved = await tokenContract?.isApprovedForAll(
          account,
          auction?.address
        );
        if (!isApproved) {
          console.log("not approved");
          const approval = await approveTokenWithMedia(
            Number(tokenID),
            auction?.address
          );
          console.log("approval", approval);
          if (!approval) {
            dispatch(loading(false));
            return;
          }
        }

        const now = new Date();
        const auctionEndDate = addDays(now, duration);

        const duration_ = differenceInSeconds(new Date(auctionEndDate), now);

        const tx = await auction?.createAuction(
          tokenID,
          tokenContract.address,
          duration_,
          reservePrice,
          account,
          curatorFeePercentage,
          auctionCurrency,
          { gasLimit: 4000000 }
        );
        await tx.wait();
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully listed item ${tokenID}`,
            success: true,
          },
        });
        dispatch(loading(false));
        success && success();
      } catch (error) {
        console.error("error creating auction", error);
        dispatch(loading(false));
        addPopup({
          txn: {
            hash: null,
            summary: formatError(error),
            success: false,
          },
        });
      }
    },
    [
      auction,
      dispatch,
      auctionCurrency,
      tokenContract,
      account,
      addPopup,
      approveTokenWithMedia,
    ]
  );
}

// export function useCreateAuction(): (
//   tokenId,
//   tokenContract,
//   duration,
//   reservedPrice,
//   curatorFeePercentage,
//   auctionCurrency
// ) => void {
//   const auction = useAuction();
//   const dispatch = useDispatch();
//   const account = useActiveWeb3React();

//   return useCallback(
//     async (
//       tokenId,
//       tokenContract,
//       duration,
//       reservedPrice,
//       curatorFeePercentage,
//       auctionCurrency
//     ) => {
//       try {
//         const auctionId = await auction.createAuction(
//           tokenId,
//           tokenContract,
//           duration,
//           account.account,
//           reservedPrice,
//           curatorFeePercentage,
//           auctionCurrency
//         );

//         console.log("ACUTION ID", auctionId);
//       } catch (error) {
//         console.log("CREATE AUCTION", error);
//       }
//     },
//     [auction]
//   );
// }

export function useCreateBid(): (id: any) => void {
  const auction = useAuction();
  const dispatch = useDispatch();

  return useCallback(async (id) => {
    try {
      dispatch(createBid(id));
    } catch (error) {
      console.log("CREATE BID", error);
    }
  }, []);
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
