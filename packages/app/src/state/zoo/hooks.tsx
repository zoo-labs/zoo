import { useActiveWeb3React, useFaucet, useZooToken } from "hooks";
import { useCallback } from "react";
import { useAppDispatch } from "state/hooks";
import { Auction, AvailableEgg, Egg } from "types";

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
  loading,
  addAuctionNft,
  createBid,
  getBNBBalance,
  addNftTTransfers,
  addEgg,
} from "./actions";
import { useAddPopup } from "state/application/hooks";
import { MaxUint256 } from "@ethersproject/constants";
import { formatError } from "functions";
import { useTransactionAdder } from "state/transactions/hooks";
import { addresses } from "../../constants";
import { ChainId } from "constants/chainIds";
import { addDays, differenceInSeconds } from "date-fns";
import { SUPPORTED_NETWORKS } from "config/networks";
import { MyNFT } from "./types";
import axios from "axios";

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
export function useFetchMyNFTs(): () => Promise<void> {
  const Web3Api = useMoralisWeb3Api();
  console.log("structuredNft fetching nfts", Web3Api);

  const { account, chainId } = useActiveWeb3React();
  const media = useMedia();
  const zooKeeper = useZooKeeper();
  const dispatch = useDispatch();

  return useCallback(async () => {
    // get NFTs for current user on Mainnet
    // bsc nfts
    try {
      // bsc testnet nfts
      const options: { chain?: any; address: string; token_address: string } = {
        chain: SUPPORTED_NETWORKS[chainId]?.chainId,
        address: account,
        token_address: media?.address,
      };

      console.log("GETTING_USERS_NFTS->", {
        chain: SUPPORTED_NETWORKS[chainId]?.chainId,
        address: account,
        token_address: media?.address,
      });

      const nfts = await Web3Api.account.getNFTsForContract(options);
      const structuredNft = nfts.result;
      let newStruct = [];
      let _eggsCount = 0;
      let _animalsCount = 0;
      let _breedCount = 0;
      console.log("structuredNft_useFetchMyNFTs", structuredNft);
      structuredNft.forEach(async (nft, index) => {
        const id = nft.token_id;

        const deet = await zooKeeper?.tokens(Number(id));
        console.log("d_deets", deet);

        const data = (await axios.get(deet.data.metadataURI)).data;
        console.log("dataa useFetchMyNFTs", data);
        const {
          name,
          attributes,
          image,
          animation_url,
          glb_animation_url,
          usdz_animation_url,
        } = data;
        if (deet?.kind === 0) _eggsCount++;
        else if (deet?.kind === 1) _animalsCount++;
        else if (deet?.kind === 2) _breedCount++;
        const newNft: MyNFT = {
          index,
          customName: deet?.customName,
          name: deet?.name,
          kind: deet?.kind,
          id: Number(deet?.id),
          timestamp: Number(deet?.birthValues?.timestamp),
          birthday: Number(deet?.birthValues?.birthday),
          dropId: Number(deet?.meta?.dropID),
          eggId: Number(deet?.meta?.eggID),
          swapped: deet?.meta?.swapped,
          burned: deet?.meta?.burned,
          parents: {
            animalA: deet?.birthValues?.parents?.animalB,
            animalB: deet?.birthValues?.parents?.animalB,
            tokenA: Number(deet?.birthValues?.parents?.tokenA),
            tokenB: Number(deet?.birthValues?.parents?.tokenB),
          },
          // data: deet?.data,
          breed: {
            count: Number(deet?.breed?.count),
            timestamp: Number(deet?.breed?.timestamp),
          },
          stage: deet?.stage,
          meta: {
            eggID: Number(deet?.meta?.eggID),
            dropID: Number(deet?.meta?.dropID),
            swapped: deet?.meta?.swapped,
            burned: deet?.meta?.burned,
          },
          rarity: deet?.rarity?.name,
          bidShares: deet?.bidShares,
          token_uri: nft.token_uri,
          attributes: attributes || "",
          image: image || "",
          animation_url: animation_url || "",
          glb_animation_url: glb_animation_url
            ? `https://zoolabs.mypinata.cloud/ipfs/${glb_animation_url.slice(
                7
              )}`
            : "",
          usdz_animation_url: usdz_animation_url
            ? `https://zoolabs.mypinata.cloud/ipfs/${usdz_animation_url.slice(
                7
              )}`
            : "",
        };

        console.log("updateMyNfts updating my nfts here with", newNft);
        dispatch(updateMyNfts(newNft));
      });

      dispatch(eggsCount(_eggsCount));
      dispatch(animalsCount(_animalsCount));
      dispatch(breedsCount(_breedCount));
    } catch (error) {
      console.error("error_in_fetch_nfts_func", error);
    }
  }, [chainId, account, media?.address, Web3Api.account, dispatch, zooKeeper]);
}

export function useGetNftTransfers(): () => void {
  const Web3Api = useMoralisWeb3Api();
  const { account, chainId } = useActiveWeb3React();
  const media = useMedia();
  const dispatch = useDispatch();
  return useCallback(async () => {
    // get NFTs for current user on Mainnet
    // bsc nfts
    const options: { chain?: any; address: string; token_address: string } = {
      chain: SUPPORTED_NETWORKS[chainId].chainId,
      address: account,
      token_address: media?.address,
    };

    const bscNFTs = await Web3Api.account.getNFTTransfers(options);
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
      console.log("useGetAvailableEggs eggs", eggs);
      if (!eggs) return;
      await eggs.map(async (egg) => {
        const { name, attributes, image, animation_url } = (
          await axios.get(egg.data[1])
        ).data;
        const finalEgg: AvailableEgg = {
          bidShares: {
            creator: Number(egg?.bidShares?.creator),
            owner: Number(egg?.bidShares?.owner),
            prevOwner: Number(egg?.bidShares?.prevOwner),
          },
          birthday: Number(egg.birthday),
          exist: true,
          id: Number(egg.id),
          kind: egg.kind,
          minted: Number(egg.minted),
          name: egg.name,
          price: Number(egg.price),
          supply: Number(egg.supply),
          timestamp: Number(egg.timestamp),
          image: `https://zoolabs.mypinata.cloud/ipfs/${image.slice(7)}`,
          animation_url: `https://zoolabs.mypinata.cloud/ipfs/${animation_url.slice(
            7
          )}`,
          attributes,
        };
        console.log("finalEgg", finalEgg);
        dispatch(addEgg(finalEgg));
      });
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
  const dropId = process.env.NEXT_PUBLIC_DROP_ID || 1;
  const dispatch = useDispatch();
  return useCallback(
    async (eggId, quantity, success) => {
      console.log("buying_eggggg_w_bnb", {
        eggId,
        quantity,
        dropId,
        zooKeeper,
        bnb,
      });
      if (!zooKeeper) return;
      try {
        dispatch(loading(true));
        const approval = await bnb?.allowance(account, zooKeeper.address);
        console.log("approval_approving_media", Number(approval));
        if (Number(approval) <= 0 || isNaN(Number(approval))) {
          console.log("approving_media");
          const approving = await bnb?.approve(zooKeeper.address, MaxUint256, {
            gasLimit: 4000000,
          });
          approving?.wait();
          console.log("approval_approved", approving);
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
    [account, addPopup, bnb, dispatch, dropId, zooKeeper]
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

export function useGetAllAuctions(): () => Promise<void> {
  const auctionContract = useAuction();
  const dispatch = useDispatch();
  const media = useMedia();
  const zooKeeper = useZooKeeper();
  return useCallback(async () => {
    console.log("auction ytfrtdtrsd", auctionContract);
    const na = +new Date();
    try {
      const auctions = await auctionContract?.getAllAuctions();
      console.log("auctions__await", auctions);
      await auctions?.map(async (auction, index: number) => {
        if (Number(auction.reservePrice) === 0) return false;
        const tokenUri = await media?.tokenURI(Number(auction.tokenID));
        const tokenMetadataURI = await media?.tokenMetadataURI(
          Number(auction.tokenID)
        );
        const deet = await zooKeeper?.tokens(Number(auction.tokenID));

        const {
          name,
          attributes,
          image,
          animation_url,
          glb_animation_url,
          usdz_animation_url,
        } = (await axios.get(tokenMetadataURI)).data;
        const {
          tokenID,
          auctionId,
          addresses,
          reservePrice,
          firstBidTime,
          duration,
          curatorFeePercentage,
          amount,
          kind,
        } = auction;
        const finalNft = {
          index,
          kind: deet?.kind,
          tokenID: Number(tokenID),
          tokenOwner: addresses.tokenOwner,
          reservePrice: Number(reservePrice),
          firstBidTime: Number(firstBidTime),
          duration: Number(duration),
          curatorFeePercentage,
          // curator,
          // auctionCurrency,
          amount: Number(amount),
          tokenUri,
          name,
          attributes,
          auctionId,
          image: image
            ? `https://zoolabs.mypinata.cloud/ipfs/${image.slice(7)}`
            : usdz_animation_url
            ? `https://zoolabs.mypinata.cloud/ipfs/${usdz_animation_url.slice(
                7
              )}`
            : "",
          animation_url: animation_url
            ? `https://zoolabs.mypinata.cloud/ipfs/${animation_url.slice(7)}`
            : usdz_animation_url
            ? `https://zoolabs.mypinata.cloud/ipfs/${usdz_animation_url.slice(
                7
              )}`
            : "",
          glb_animation_url: glb_animation_url
            ? `https://zoolabs.mypinata.cloud/ipfs/${glb_animation_url.slice(
                7
              )}`
            : "",
          usdz_animation_url: usdz_animation_url
            ? `https://zoolabs.mypinata.cloud/ipfs/${usdz_animation_url.slice(
                7
              )}`
            : "",
        };

        console.log("finalNft", finalNft, auction);
        dispatch(addAuctionNft(finalNft as any));
      });
    } catch (error) {
      console.error("error_In_UseGetAllAuctions", error);
    }
  }, [auctionContract, media, zooKeeper, dispatch]);
}

export function useRemoveAuction(): (
  id: string | number,
  success?: () => void
) => void {
  const auctionContract = useAuction();
  const getAllAuctions = useGetAllAuctions();
  const addPopup = useAddPopup();
  return useCallback(
    async (id, success) => {
      try {
        const tx = await auctionContract?.cancelAuction(id, {
          gasLimit: 4000000,
        });
        await tx.wait();
        console.log(tx);
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully cancelled auction ${id}`,
            success: true,
          },
        });
        getAllAuctions().then(() => {
          success && success();
        });
      } catch (e) {
        console.error("ISSUE REMOVING AUCTION \n", e);
        addPopup({
          txn: {
            hash: null,
            summary: formatError(e),
            success: false,
          },
        });
      }
    },
    [addPopup, auctionContract, getAllAuctions]
  );
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

export function useCreateBid(): (
  id: string | number,
  amount: number,
  success?: () => void
) => void {
  const auction = useAuction();
  const dispatch = useDispatch();
  const addPopup = useAddPopup();
  const zoo = useZooToken();
  const { account } = useActiveWeb3React();
  return useCallback(
    async (id, amount, success) => {
      try {
        dispatch(loading(true));
        const approved = await zoo?.allowance(account, auction?.address);
        console.log("AUCTION_APPROVED", Number(approved));
        if (!approved || Number(approved) <= 0) {
          const approval = await zoo?.approve(auction?.address, MaxUint256, {
            gasLimit: 4000000,
          });
          await approval.wait();
          console.log("APPROVAL", approval);
        }

        const tx = await auction?.createBid(id, amount, {
          gasLimit: 4000000,
        });
        await tx.wait();
        dispatch(createBid(id));
        dispatch(loading(false));
        success && success();
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully bid ${amount} on ${id}`,
            success: true,
          },
        });
      } catch (error) {
        console.log("CREATE_BID_ERROR", error);
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
    [auction, dispatch]
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

export function useFeed(): (animalID: number) => void {
  const dropId = process.env.NEXT_PUBLIC_DROP_ID || 1;
  const addPopup = useAddPopup();
  const zoo = useZooToken();
  const zooKeeper = useZooKeeper();
  const media = useMedia();
  const { account } = useActiveWeb3React();
  const dispatch = useDispatch();
  const fetchMyNfts = useFetchMyNFTs();
  return useCallback(
    async (animalId) => {
      console.log("feeding_animal", { animalId, dropId });
      if (!zooKeeper) return;
      dispatch(loading(true));
      try {
        const approval = await zoo?.allowance(account, zooKeeper.address);
        console.log("approval_approving_media", Number(approval));
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
        const mediaApproval = await zoo?.allowance(account, media.address);
        console.log("approval_approving_media", Number(mediaApproval));
        if (Number(mediaApproval) <= 0) {
          console.log("approving_media");
          await media
            ?.setApprovalForAll(zooKeeper.address, true, {
              gasLimit: 4000000,
            })
            .then((tx) => {
              console.log("mediaApproval", tx);
              tx.wait();
            });
        }
        const tx = await zooKeeper?.feedAnimal(animalId, dropId, {
          gasLimit: 4000000,
        });
        await tx.wait();
        console.log(tx);
        dispatch(loading(false));
        fetchMyNfts();
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully fed animal`,
            success: true,
          },
        });
      } catch (e) {
        console.error("ISSUE FEEDING EGG \n", e);
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
export function useEditAuction(): (
  auctionId: number | string,
  reservePrice: number,
  success?: () => void
) => void {
  const auction = useAuction();
  const getAllAuctions = useGetAllAuctions();
  const addPopup = useAddPopup();
  return useCallback(
    async (auctionId, reservePrice, success) => {
      try {
        const tx = await auction?.setAuctionReservePrice(
          auctionId,
          reservePrice
        );
        await tx?.wait();
        await getAllAuctions();
        success?.();
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully edited auction`,
            success: true,
          },
        });
        console.log("EDITED AUCTION", tx);
      } catch (error) {
        console.log("EDIT_AUCTION_ERROR", error);
        addPopup({
          txn: {
            hash: null,
            summary: formatError(error),
            success: false,
          },
        });
      }
    },
    [addPopup, auction, getAllAuctions]
  );
}
