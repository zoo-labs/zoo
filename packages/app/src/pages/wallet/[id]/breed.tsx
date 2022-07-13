/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MyNFT } from "state/zoo/types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFetchMyNFTs } from "state/zoo/hooks";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const Breed = () => {
  const [nft, setNftItem] = useState<MyNFT>();
  const [pair, setPair] = useState<MyNFT>();
  const [pairables, setPairables] = useState<MyNFT[]>([]);
  const router = useRouter();
  const fetchNFTs = useFetchMyNFTs();
  const { id } = router.query;
  const { myNfts, nftTransfers } = useSelector((state: any) => state.zoo);

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

  console.log("NFT_TO_BREED_1", nft, pairables);
  return (
    <div>
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
            <div className="bg-nft-gradient p-px rounded-xl flex-1">
              <div className="bg-black rounded-xl w-full h-full min-h-[350px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi dolor quidem neque dolorem accusantium doloribus veniam
                aspernatur minima. Temporibus reiciendis similique eos id in
                assumenda quia atque placeat sit architecto!
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
          disabled={!pair}
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
            pairables.map((nft) => (
              <div key={nft.id}>
                <div className="bg-nft-gradient p-px rounded-xl flex-1">
                  <div className="bg-black rounded-xl w-full h-[270px]">
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
            ))
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
