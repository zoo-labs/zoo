/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MyNFT } from "state/zoo/types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useBreed, useFetchMyNFTs } from "state/zoo/hooks";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import BidModalHeader from "components/ModalHeader/BidModalHeader";
import ModalLayout from "layouts/Modal";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import CooldownModal from "modals/CountdownModal.";
import { useCountdownToggle } from "state/application/hooks";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const Breed = ({}: AppProps & {
  Component: NextComponentType<NextPageContext> & {
    Layout: (title: string) => void;
  };
}) => {
  const [nft, setNftItem] = useState<MyNFT>();
  const [pair, setPair] = useState<MyNFT>();
  const [pairables, setPairables] = useState<MyNFT[]>([]);
  const toggleCooldown = useCountdownToggle();
  const router = useRouter();
  const { account } = useActiveWeb3React();
  const fetchNFTs = useFetchMyNFTs();
  const { id } = router.query;
  const { myNfts, nftTransfers, loading } = useSelector(
    (state: any) => state.zoo
  );
  const handleBreed = useBreed();

  const t = new Date(nft?.breed?.timestamp * 1000);
  const nt = t.setHours(t.getHours() + 24);
  const now = new Date();
  const breedCooldown = +nt - +now;

  // console.log("COOLDOWN_TIMER", breedCooldown);
  useEffect(() => {
    const nft_ = myNfts.find((nft) => String(nft?.id) === String(id));
    setNftItem(nft_);
    const pairables_ = myNfts.filter(
      (nft) =>
        nft.stage === 2 &&
        String(nft.id) !== String(id) &&
        nft?.name?.toLowerCase() === nft_?.name?.toLowerCase()
    );
    setPairables(pairables_);
  }, [id, myNfts]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  const breed = useCallback(() => {
    if (account) {
      const t = new Date(pair?.breed?.timestamp * 1000);
      const nt = t.setHours(t.getHours() + 24);
      const now = new Date();
      const pairBreedCooldown = +nt - +now;
      console.log("COOLDOWN_TIMER", pair, nt, pairBreedCooldown);

      if (breedCooldown > 0) {
        toggleCooldown();
        return;
      }
      if (pairBreedCooldown > 0) {
        toggleCooldown();
        return;
      }
      if (nft?.id && pair?.id) {
        handleBreed(nft?.id, pair?.id, () => router.push("/wallet"));
      }
    }
  }, [
    account,
    breedCooldown,
    handleBreed,
    nft?.id,
    pair,
    router,
    toggleCooldown,
  ]);

  // useEffect(() => {
  //   if (breedCooldown > 0) toggleCooldown();
  // }, [breedCooldown, toggleCooldown]);

  console.log("NFT_TO_BREED_1", nft, pairables);
  return (
    <div className="mt-28">
      <div className="max-w-[777px] w-full mx-auto text-center flex flex-col items-center">
        <p className="font-bold text-4xl mt-10">Breed Animals</p>
        <p className="font-light text-base mt-2 text-butter-white mb-9">
          Zoo Labs’ ADULT NFT Animals can each be bred up to 6 times. Any two
          NFT Animals can be bred together and will produce a random egg
          according to rarity tier percentages. The fee for breeding is
          determined by the rarity tier of the rarest animal in the breeding
          pair.
        </p>
        <div className="flex space-x-14 w-full justify-between items-center mb-11">
          <div className="bg-nft-gradient p-px rounded-xl flex-1">
            <div className="bg-black rounded-xl w-full h-[350px]">
              <ModelViewer
                glb={nft?.glb_animation_url}
                usdz={nft?.usdz_animation_url}
                className="rounded-xl"
              />
            </div>
          </div>
          <img src="/icons/arrange-circle.svg" alt="" width={62} height={62} />
          {pair ? (
            <div
              className="bg-nft-gradient p-px rounded-xl flex-1"
              onClick={() => setPair(null)}
            >
              <div className="bg-black rounded-xl w-full h-[350px]">
                <ModelViewer
                  glb={pair?.glb_animation_url}
                  usdz={pair?.usdz_animation_url}
                  className="rounded-xl"
                />
              </div>
            </div>
          ) : (
            <div className="border border-dashed p-px rounded-xl flex-1">
              <div className="bg-black rounded-xl w-full h-full min-h-[350px]" />
            </div>
          )}
        </div>
        <button
          className="bg-leader-board rounded-xl md:w-[343px] py-5 mb-20 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!pair || loading}
          onClick={breed}
        >
          {!loading ? "Breed" : "Breeding..."}
        </button>
        <p className="font-bold text-4xl my-10">Select Animal to Pair</p>
        {/* <p className="font-light text-base mt-2 text-butter-white mb-9">
          Zoo Labs’ ADULT NFT Animals can each be bred up to 6 times. Any two
          NFT Animals can be bred together and will produce a random egg
          according to rarity tier percentages. The fee for breeding is
          determined by the rarity tier of the rarest animal in the breeding
          pair.
        </p> */}
        <div className="flex gap-2.5 justify-center items-center flex-wrap mb-20">
          {pairables.length > 0 ? (
            pairables.map((nft) => {
              if (nft.id === pair?.id) return false;
              return (
                <div key={nft.id} onClick={() => setPair(nft)}>
                  <div className="bg-nft-gradient p-px rounded-xl flex-1">
                    <div className="bg-black rounded-xl w-[234px]  h-[270px]">
                      <ModelViewer
                        glb={nft.glb_animation_url}
                        usdz={nft.usdz_animation_url}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <p className="text-lg mt-2.5">
                    {nft.name} ({nft.id})
                  </p>
                </div>
              );
            })
          ) : (
            <p className="font-semibold text-lg">
              You don&apos;t have any other animal to breed with :(
            </p>
          )}
        </div>
      </div>
      <CooldownModal />
    </div>
  );
};

Breed.Layout = ModalLayout;
export default Breed;
