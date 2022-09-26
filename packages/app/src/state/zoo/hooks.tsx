import { useActiveWeb3React, useFaucet, useZooToken } from "hooks";
import { useCallback } from "react";
import { useAppDispatch } from "state/hooks";
import { Auction, AuctionHistory, AvailableEgg, Egg } from "types";

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
import { ethers } from "ethers";

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
      const divisor = parseFloat(Math.pow(10, decimals).toString());
      const balance = rawBalance / divisor;
      dispatch(getZooBalance({ balance }));
    } catch (error) {
      console.log("error in get zoo balance", error);
    }
  }, [account, chainId, zooToken, dispatch]);
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
          getZooBalance();
          return 2;
        })
        .catch((e) => {
          console.error("ISSUE USING FAUCET \n", e);
        });
    } catch (e) {
      console.error("ISSUE USING FAUCET \n", e);
    }
  }, [account, chainId, faucet, getZooBalance]);
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
  const media = useMedia();
  const { account } = useActiveWeb3React();
  const zoo = useZooToken();
  const dropId = process.env.NEXT_PUBLIC_DROP_ID;
  const dispatch = useAppDispatch();
  const getZooBalance = useZoobalance();
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
        // // const
        // const mA = await media.approve(zooKeeper.address, Number(eggId));
        // mA.wait();
        // const aA = await media.isApprovedForAll(account, zooKeeper.address);
        // console.log("isApprovedForAllInHatch", aA);
        const tx = await zooKeeper?.hatchEgg(Number(dropId), Number(eggId), {
          gasLimit: 4000000,
        });
        await tx.wait();
        getZooBalance();
        success && success();
        dispatch(loading(false));
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
        getZooBalance();
        addPopup({
          txn: {
            hash: null,
            summary: formatError(error),
            success: false,
          },
        });
      }
    },
    [account, addPopup, dispatch, dropId, getZooBalance, zoo, zooKeeper]
  );
}

export function useFetchMyNFTs(): () => Promise<any> {
  const dispatch = useDispatch();

  const Web3Api = useMoralisWeb3Api();
  console.log("structuredNft fetching nfts", Web3Api);

  const { account, chainId } = useActiveWeb3React();
  const media = useMedia();
  const zooKeeper = useZooKeeper();

  return useCallback(async () => {
    // get NFTs for current user on Mainnet
    // bsc nfts
    console.log("useFetchMyNFTs", chainId);
    try {
      // bsc testnet nfts
      const options: { chain?: any; address: string; token_address: string } = {
        chain: "bsc testnet",
        address: account,
        token_address: media?.address,
      };

      let returnNFTs = [];

      console.log("GETTING_USERS_NFTS->", {
        chain: SUPPORTED_NETWORKS[chainId]?.chainId,
        address: account,
        token_address: media?.address,
        chainId,
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
        console.log("d_deets", { deet });

        const data = (await axios.get(deet.data.metadataURI)).data;
        console.log("dataa_IN__useFetchMyNFTs", data);
        const {
          name,
          attributes,
          image,
          animation_url,
          glb_animation_url,
          usdz_animation_url,
          description,
        } = data;
        if (deet?.kind === 0) _eggsCount++;
        else if (deet?.kind === 1) _animalsCount++;
        else if (deet?.kind === 2) _eggsCount++;
        else if (deet?.kind === 3) _animalsCount++;
        console.log("countINDJJW", deet?.kind, _eggsCount);
        dispatch(eggsCount(_eggsCount));
        dispatch(animalsCount(_animalsCount));
        dispatch(breedsCount(_breedCount));
        const newNft: MyNFT = {
          index,
          description,
          customName: deet?.customName,
          name,
          kind: deet?.kind,
          id: Number(deet?.id),
          timestamp: Number(deet?.birthValues?.timestamp),
          birthday: Number(deet?.birthValues?.birthday),
          dropId: Number(deet?.meta?.dropID),
          eggId: Number(deet?.meta?.eggID),
          dropEgg: Number(deet?.dropEgg),
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
            metaUri: deet?.data.metadataURI,
          },
          rarity: deet?.rarity?.name,
          token_uri: animation_url
            ? `https://zoolabs.mypinata.cloud/ipfs/${animation_url.slice(7)}`
            : "",
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
        returnNFTs = [newNft, ...returnNFTs];
      });

      console.log("count_of_thigns", {
        _eggsCount,
        _animalsCount,
        _breedCount,
      });

      return returnNFTs;
    } catch (error) {
      console.error("error_in_fetch_nfts_func", error);
    }
  }, [chainId, dispatch]);
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
    console.log("bscNFTs", bscNFTs.result);
    dispatch(addNftTTransfers(bscNFTs.result.slice(0, 10)));
  }, [chainId, account, media?.address, Web3Api.account, dispatch]);
}

export function useGetAvailableEggs(): () => void {
  const dispatch = useAppDispatch();
  const dropContract = useDrop(true);
  const { account } = useActiveWeb3React();
  const getData = async (uri) => {
    const res = await axios.get(uri);
    return res.data;
  };
  return useCallback(async () => {
    try {
      const eggs: Array<any> = await dropContract?.getAllEggs();
      if (!eggs) return;
      // eggs.forEach(async (egg, i) => {
      //   // console.log("eggsuseGetAvailableEggs__mi_egg", egg, eggs.length);
      //   // const data = await (await axios.get(egg.data.metadataURI)).data;
      //   // const res = await axios.get(egg.data.metadataURI);
      //   // const data = await res.data;
      //   const data = await getData(egg.data.metadataURI);
      //   const { name, description, attributes, image, animation_url } = data;
      //   console.log("eggsuseGetAvailableEggs__", {
      //     data,
      //     egg,
      //     len: eggs.length,
      //     index: i,
      //   });

      //   const finalEgg: AvailableEgg = {
      //     bidShares: {
      //       creator: Number(egg?.bidShares?.creator),
      //       owner: Number(egg?.bidShares?.owner),
      //       prevOwner: Number(egg?.bidShares?.prevOwner),
      //     },
      //     birthday: Number(egg.birthday),
      //     exist: true,
      //     id: Number(egg.id),
      //     kind: egg.kind,
      //     minted: Number(egg.minted),
      //     name: egg.name,
      //     description,
      //     price: Number(egg.price) / Math.pow(10, 18),
      //     supply: Number(egg.supply),
      //     timestamp: Number(egg.timestamp),
      //     image: `https://zoolabs.mypinata.cloud/ipfs/${image?.slice(7)}`,
      //     animation_url: `https://zoolabs.mypinata.cloud/ipfs/${animation_url?.slice(
      //       7
      //     )}`,
      //     attributes,
      //   };
      //   console.log("finalEgg", finalEgg);
      //   dispatch(addEgg(finalEgg));
      // });

      const structureEgg = async (egg: any) => {
        return getData(
          egg.data.metadataURI.substring(0, 7) === "ipfs://"
            ? ` https://ipfs.io/ipfs/${egg.data.metadataURI.substring(7)}`
            : egg.data.metadataURI
        ).then(({ name, description, attributes, image, animation_url }) => {
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
            description,
            price: Number(egg.price),
            supply: Number(egg.supply),
            timestamp: Number(egg.timestamp),
            image: `https://zoolabs.mypinata.cloud/ipfs/${image?.slice(7)}`,
            animation_url: `https://zoolabs.mypinata.cloud/ipfs/${animation_url?.slice(
              7
            )}`,
            attributes,
          };
          dispatch(addEgg(finalEgg));
        });
      };
      console.log("all eggs", eggs);
      const eggsPromise = eggs.map((egg) => {
        return structureEgg(egg);
      });

      Promise.all(eggsPromise)
        .then(() => {})
        .catch((err) => console.error("mi_egg_promiseerror", err));
    } catch (error) {
      console.log("error_in_useGetAvailableEggs", error);
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
  const getZooBalance = useZoobalance();
  return useCallback(
    async (eggId, quantity, success) => {
      console.log("buying_eggggg", { eggId, quantity, dropId, zooKeeper });
      if (!zooKeeper) return;
      try {
        dispatch(loading(true));
        const approval = await zoo?.allowance(account, zooKeeper.address);
        console.log("approval_buy_egg", Number(approval));
        if (Number(approval) <= 0) {
          console.log("approving_zoo_keeper");
          await zoo
            ?.approve(zooKeeper.address, MaxUint256, {
              gasLimit: 4000000,
            })
            .then((tx) => {
              console.log("approval", tx);
              tx.wait();
            });
        }
        console.log("eggId_dropId_quantity", {
          eggId,
          dropId,
          quantity,
          approval,
        });
        const tx = await zooKeeper.buyEggs(eggId, dropId, quantity, {
          gasLimit: 4000000,
        });
        await tx.wait();
        getZooBalance();
        console.log("tx_in_buy_egg", tx);
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
        getZooBalance();
        addPopup({
          txn: {
            hash: null,
            summary: formatError(e),
            success: false,
          },
        });
      }
    },
    [account, addPopup, dispatch, dropId, getZooBalance, zoo, zooKeeper]
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
  const getZooBalance = useZoobalance();
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
        console.log(
          "approval_approving_media",
          Number(approval),
          isNaN(Number(approval))
        );
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
        getZooBalance();
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
        getZooBalance();
        addPopup({
          txn: {
            hash: null,
            summary: formatError(e),
            success: false,
          },
        });
      }
    },
    [account, addPopup, bnb, dispatch, dropId, getZooBalance, zooKeeper]
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
  const auctionContract = useAuction(true);
  const dispatch = useDispatch();
  const media = useMedia(true);
  const zooKeeper = useZooKeeper(true);
  const { library } = useActiveWeb3React();
  return useCallback(async () => {
    console.log("auction ytfrtdtrsd", auctionContract);
    const na = +new Date();
    try {
      const auctions = await auctionContract?.getAllAuctions();
      console.log("auctions__await", auctions);
      await auctions?.map(async (auction, index: number) => {
        if (Number(auction.reservePrice) === 0) return false;
        const tokenUri = await media?.tokenURI(Number(auction.tokenID));
        const tokenMetadataURI = await media?.tokenURI(Number(auction.tokenID));
        const deet = await zooKeeper?.tokens(Number(auction.tokenID));

        const data = (await axios.get(tokenMetadataURI)).data;
        const {
          name,
          attributes,
          description,
          image,
          animation_url,
          glb_animation_url,
          usdz_animation_url,
        } = data;

        console.log("auction nft data", auction);
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
          auctionHistory,
        } = auction;
        const auctionHistoryMap = await auctionHistory.map(async (history) => {
          const hash = await library.getBlock(history.blockNumber);
          console.log("historyHaash", hash);
          return {
            value: Number(history.amount),
            from_address: history.bidder,
            blockNumber: history.blockNumber,
            block_timestamp: new Date(history.time * 1000),
            transaction_hash: hash.hash,
          };
        });
        const auctionHistoryPromise = await Promise.all(auctionHistoryMap)
          .then((auctionHistory: AuctionHistory[]) => {
            return auctionHistory;
          })
          .catch((err) => console.error("mi_egg_promiseerror", err));
        const finalAuction: Auction = {
          index,
          description,
          kind: deet?.kind,
          tokenID: Number(tokenID),
          auctionHistory: auctionHistoryPromise || [],
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

        console.log("finaAuction", finalAuction, auction);
        dispatch(addAuctionNft(finalAuction as any));
      });
    } catch (error) {
      console.error("error_In_UseGetAllAuctions", error);
    }
  }, [auctionContract, media, zooKeeper, dispatch, library]);
}

export function useRemoveAuction(): (
  id: string | number,
  success?: () => void
) => void {
  const auctionContract = useAuction();
  const getAllAuctions = useGetAllAuctions();
  const addPopup = useAddPopup();
  const getZooBalance = useZoobalance();
  return useCallback(
    async (id, success) => {
      try {
        const tx = await auctionContract?.cancelAuction(id, {
          gasLimit: 4000000,
        });
        await tx.wait();
        console.log(tx);
        getZooBalance();
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
        getZooBalance();
        addPopup({
          txn: {
            hash: null,
            summary: formatError(e),
            success: false,
          },
        });
      }
    },
    [addPopup, auctionContract, getAllAuctions, getZooBalance]
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
  const getZooBalance = useZoobalance();
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
        getZooBalance();
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
        getZooBalance();
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
      getZooBalance,
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
  const getZooBalance = useZoobalance();
  return useCallback(
    async (id, amount, success) => {
      console.log("AMOUNT_TO_BID", Number(amount));
      const weiAmount = ethers.utils.formatUnits(amount, "wei");
      // console.log("WEI_AMOUNT", weiAmount);
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
        const tx = await auction?.createBid(id, weiAmount, {
          gasLimit: 4000000,
        });
        await tx.wait();
        getZooBalance();
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
        getZooBalance();
        addPopup({
          txn: {
            hash: null,
            summary: formatError(error),
            success: false,
          },
        });
      }
    },
    [account, addPopup, auction, dispatch, getZooBalance, zoo]
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
  const getZooBalance = useZoobalance();
  return useCallback(
    async (animalId) => {
      console.log("feeding_animal", zooKeeper, { animalId, dropId });
      if (!zooKeeper) return;
      try {
        dispatch(loading(true));
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
        getZooBalance();
        console.log(tx);
        fetchMyNfts()
          .then(() => {
            dispatch(loading(false));
            addPopup({
              txn: {
                hash: null,
                summary: `Successfully fed animal`,
                success: true,
              },
            });
          })
          .catch((e) => {
            dispatch(loading(false));
            addPopup({
              txn: {
                hash: null,
                summary: formatError(e),
                success: false,
              },
            });
          });
      } catch (e) {
        console.error("ISSUE FEEDING EGG \n", e);
        dispatch(loading(false));
        getZooBalance();
        addPopup({
          txn: {
            hash: null,
            summary: formatError(e),
            success: false,
          },
        });
      }
    },
    [
      account,
      addPopup,
      dispatch,
      dropId,
      fetchMyNfts,
      getZooBalance,
      media,
      zoo,
      zooKeeper,
    ]
  );
}

export function useFeedCount(): (
  animalID: number
) => Promise<{ count: number; lastTimeFed: number }> {
  const zooKeeper = useZooKeeper();
  const getZooBalance = useZoobalance();

  return useCallback(
    async (animalId) => {
      console.log("feeding_animal", zooKeeper, { animalId });
      if (!zooKeeper) return;
      try {
        const tx = await zooKeeper?.feededTimes(animalId);
        getZooBalance();
        return {
          count: Number(tx.count),
          lastTimeFed: tx.lastTimeFed,
        };
      } catch (e) {
        console.error("ISSUE GET FEED COUNT \n", e);
        getZooBalance();
      }
    },
    [getZooBalance, zooKeeper]
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
  const getZooBalance = useZoobalance();
  return useCallback(
    async (auctionId, reservePrice, success) => {
      try {
        const tx = await auction?.setAuctionReservePrice(
          auctionId,
          reservePrice
        );
        await tx?.wait();
        getZooBalance();
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
        getZooBalance();
        addPopup({
          txn: {
            hash: null,
            summary: formatError(error),
            success: false,
          },
        });
      }
    },
    [addPopup, auction, getAllAuctions, getZooBalance]
  );
}

export function useGetTokenOwner(): (
  tokenId: number | string
) => Promise<string> {
  const media = useMedia();

  return useCallback(
    async (id) => {
      const owner: string = await media.tokenCreators(id);
      console.log("OWNER OF THE TOKEN", owner);
      return owner;
    },
    [media]
  );
}

// Bread animals   // // Breed two animals and create a hybrid egg
export function useBreed(): (
  tokenA: number,
  tokenB: number,
  successCallback?: () => void
) => void {
  const addPopup = useAddPopup();
  const zooKeeper = useZooKeeper();
  const dropId = process.env.NEXT_PUBLIC_DROP_ID;
  const dispatch = useDispatch();
  const getZooBalance = useZoobalance();
  const fetchNFTs = useFetchMyNFTs();
  return useCallback(
    async (tokenA, tokenB, successCallback) => {
      console.log("breeding_eggggg", { dropId, tokenA, tokenB, zooKeeper });
      if (!zooKeeper) return;
      try {
        dispatch(loading(true));
        const tx = await zooKeeper?.breedAnimals(
          Number(dropId),
          Number(tokenA),
          Number(tokenB),
          {
            gasLimit: 4000000,
          }
        );
        await tx.wait();
        console.log(tx);
        fetchNFTs()
          .then(() => {
            dispatch(loading(false));
            getZooBalance();
            addPopup({
              txn: {
                hash: null,
                summary: `Successfully bred ${tokenA} and ${tokenB}`,
                success: true,
              },
            });
            successCallback && successCallback();
          })
          .catch((e) => {
            dispatch(loading(false));
            getZooBalance();
            addPopup({
              txn: {
                hash: null,
                summary: formatError(e),
                success: false,
              },
            });
          });
      } catch (e) {
        console.error("ISSUE BREEDING EGG \n", e);
        dispatch(loading(false));
        getZooBalance();
        addPopup({
          txn: {
            hash: null,
            summary: formatError(e),
            success: false,
          },
        });
      }
    },
    [addPopup, dispatch, dropId, fetchNFTs, getZooBalance, zooKeeper]
  );
}

export function useFreeNFT(): (tokenId: number, success?: () => void) => void {
  const addPopup = useAddPopup();
  const zooKeeper = useZooKeeper();
  const fetchMyNfts = useFetchMyNFTs();
  const dispatch = useDispatch();
  const getZooBalance = useZoobalance();
  return useCallback(
    async (id, success) => {
      try {
        dispatch(loading(true));
        const tx = await zooKeeper?.freeAnimal(id);
        await tx.wait();
        getZooBalance();
        console.log("SUCCESSFULLY FREED THE ITEM e", id);
        await fetchMyNfts()
          .then(() => {
            dispatch(loading(false));
            success && success();
            addPopup({
              txn: {
                hash: null,
                summary: `SUCCESSFULLY FREED THE ITEM ${id}`,
                success: true,
              },
            });
          })
          .catch((e) => {
            dispatch(loading(false));
          });
      } catch (error) {
        console.log("ERROR FREEING THE ITEM e", id);
        dispatch(loading(false));
        getZooBalance();
        addPopup({
          txn: {
            hash: null,
            summary: formatError(error),
            success: false,
          },
        });
      }
    },
    [addPopup, dispatch, fetchMyNfts, getZooBalance, zooKeeper]
  );
}

export function useRefreshMetadata(): (
  tokenId: number,
  tokenUri: string,
  metadataURI: string
) => void {
  const dropId = process.env.NEXT_PUBLIC_DROP_ID;
  const media = useMedia();
  const zooKeeper = useZooKeeper();
  const addPopup = useAddPopup();
  const fetchMyNfts = useFetchMyNFTs();
  const dispatch = useDispatch();
  return useCallback(
    async (tokenId, tokenUri, metadataURI) => {
      console.log("the_nft_to_fetch", {
        tokenId,
        tokenUri,
        metadataURI,
        media,
        zooKeeper,
      });
      try {
        dispatch(loading(true));
        // await media?.setApprovalForAll(zooKeeper.address, true, {
        //   gasLimit: 4000000,
        // });
        // const tx = await zooKeeper?.updateTokenUris(tokenId, dropId);
        // await tx.wait();
        await media?.setApprovalForAll(zooKeeper.address, true, {
          gasLimit: 4000000,
        });
        const updateMetadata = await media.updateTokenMetadataURI(
          tokenId,
          metadataURI,
          { gasLimit: 400000 }
        );
        await updateMetadata.wait();
        const updateTokenUri = await media.updateTokenURI(tokenId, tokenUri, {
          gasLimit: 400000,
        });
        await updateTokenUri.wait();
        fetchMyNfts();
        addPopup({
          txn: {
            hash: null,
            summary: `Successfully refreshed metadata`,
            success: true,
          },
        });
        dispatch(loading(false));
      } catch (error) {
        console.error("ERROR_GETTING_REFRESH_METADATA", error);
        addPopup({
          txn: {
            hash: null,
            summary: formatError(error),
            success: true,
          },
        });
        dispatch(loading(false));
      }
    },
    [addPopup, dispatch, dropId, fetchMyNfts, media, zooKeeper]
  );
}
