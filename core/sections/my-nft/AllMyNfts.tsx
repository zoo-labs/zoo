import React from "react";
import Image from "next/image";

const AllMyNfts = () => {
  return (
    <div className="allMyNfts mb-20">
      <h2 className="mb-8 font-medium text-4xl leading-10 tracking-wider">
        All My Nfts
      </h2>
      <div className="allMyNfts__items flex">
        <div
          className="allMyNfts__item grid place-content-center rounded-xl mr-6 h-66 w-39 border border-nft-card-border">
          <Image src="/img/rhinovid.png" width={160} height={200} alt="" />
        </div>
        <div
          className="allMyNfts__item grid place-content-center rounded-xl mr-6 h-66 w-39 border border-nft-card-border">
          <Image src="/img/plasma.png" width={160} height={200} alt="" />
        </div>
        <div
          className="allMyNfts__item  grid place-content-center rounded-xl mr-6 h-66 w-39 border border-nft-card-border">
          <Image src="/img/egg1.png" width={160} height={200} alt="" />
        </div>
        <div
          className="allMyNfts__item  grid place-content-center rounded-xl mr-6 h-66 w-39 border border-nft-card-border">
          <Image src="/img/egg2.png" width={160} height={200} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AllMyNfts;
