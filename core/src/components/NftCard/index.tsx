import React from "react";

interface NftCardProps {
  image: React.ReactNode;
  name?: string;
  address?: string;
  days?: string;
  highestBid?: string;
  price?: string;
  yields?: string;
  currency?: string;
}

const NftCard = ({
  image,
  name,
  price,
  address,
  days,
  highestBid,
  yields,
  currency = "ZOO",
}: NftCardProps) => {
  return (
    <div className="flex flex-col flex-1 grow">
      <div className="p-0.5 rounded-lg h-full w-full overflow-hidden mb-6 lg:mb-0 PopularNft_nft border border-gray-500">
        <div className="overflow-hidden bg-black rounded-lg">
          <div className="flex flex-col justify-end object-contain my-8 overflow-hidden text-center PopularNfts__nft-img min-h-nftContainer">
            <>{image && image}</>
          </div>
        </div>
      </div>
      <div className="py-8 PopularNfts__nft-info">
        <div className="flex items-center justify-between mb-4">
          <p>{name}</p>
          <p className="text-uppercase border border-blue p-1.5">
            {price} {currency}
          </p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <p className="flex items-center text-base text-steel">
            <span className="w-5 h-5 mr-2 rounded-full border border-gray-500" />
            {address}
          </p>
          <p>{days} Days Left</p>
        </div>
        <hr className="mb-6" />
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-steel mr-9">Highest bid</p>
          <p className="text-uppercase">{highestBid} Zoo</p>
          <p className="flex items-center text-sm text-steel ml-9">
            {yields} Yields/Day
          </p>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
