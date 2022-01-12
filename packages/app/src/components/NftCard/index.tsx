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
    <div className="border border-blue rounded-lg w-full overflow-hidden mb-6 lg:mb-0">
      <div className="PopularNfts__nft-img text-center object-contain">
        {image && image}
      </div>
      <div className="PopularNfts__nft-info px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <p>{name}</p>
          <p className="text-uppercase border border-blue px-2 py-2">
            {price} {currency}
          </p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <p className="flex items-center ">
            <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
            {address}
          </p>
          <p>{days} Days Left</p>
        </div>
        <hr className="mb-6" />
        <div className="flex justify-between items-center mb-4">
          <p>Highest bid</p>
          <p className="text-uppercase">{highestBid} Zoo</p>
        </div>
        <div className="text-center flex justify-center items-center">
          <p className="flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded-full mr-2" />
            {yields} Yields/Day
          </p>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
