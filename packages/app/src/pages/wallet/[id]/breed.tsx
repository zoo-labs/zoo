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

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const Breed = () => {
  const [nft, setNftItem] = useState<MyNFT>();
  const [pair, setPair] = useState<MyNFT>();
  const [pairables, setPairables] = useState<MyNFT[]>([]);
  const router = useRouter();
  const { account } = useActiveWeb3React();
  const fetchNFTs = useFetchMyNFTs();
  const { id } = router.query;
  const { myNfts, nftTransfers, loading } = useSelector(
    (state: any) => state.zoo
  );
  const handleBreed = useBreed();

  useEffect(() => {
    const nft_ = myNfts.find((nft) => String(nft.id) === String(id));
    setNftItem(nft_);
    const pairables_ = myNfts.filter(
      (nft) => nft.stage === 2 && String(nft.id) !== String(id)
    );
    setPairables(pairables_);
  }, [id, myNfts]);

  useEffect(() => {
    fetchNFTs;
  }, [fetchNFTs]);

  const breed = useCallback(() => {
    if (account) {
      if (nft?.id && pair?.id) {
        handleBreed(nft?.id, pair?.id, () => router.push("/wallet"));
      }
    }
  }, [account, handleBreed, nft?.id, pair?.id, router]);

  console.log("NFT_TO_BREED_1", nft, pairables);
  return (
    <div>
      <BidModalHeader
        onBack={() => router.push(`/wallet/${nft?.id}`)}
        className="absolute w-full p-6 "
      />
      <div className="max-w-[777px] w-full mx-auto text-center flex flex-col items-center">
        <p className="font-bold text-4xl mt-10">Breed Animals</p>
        <p className="font-light text-base mt-2 text-butter-white mb-9">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida nisl
          enim tincidunt sit eleifend. Sed ut nibh interdum porttitor molestie
          velit, Sed ut nibh interdum porttitor molestie velit.
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
          disabled={!pair && loading}
          onClick={breed}
        >
          Breed
        </button>
        <p className="font-bold text-4xl mt-10">Select Animal to Pair</p>
        <p className="font-light text-base mt-2 text-butter-white mb-9">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida nisl
          enim tincidunt sit eleifend. Sed ut nibh interdum porttitor molestie
          velit, Sed ut nibh interdum porttitor molestie velit.
        </p>
        <div className="flex space-10 justify-center items-center flex-wrap mb-20">
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
    </div>
  );
};

export default Breed;
