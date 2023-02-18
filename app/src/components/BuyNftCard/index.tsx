import React from "react";

interface BuyNftCardProps {
  image: React.ReactNode;
  name?: string;
  address?: string;
  days?: string;
  price?: string;
  yields?: string;
  currency?: string;
}

const BuyNftCard = ({
  image,
  name,
  price,
  address,
  days,

  yields,
  currency = "ZOO",
}: BuyNftCardProps) => {
  return (
    <div className="w-full mb-6 overflow-hidden border rounded-lg border-blue lg:mb-0">
      <div className="object-contain text-center PopularNfts__nft-img">
        <>{image && image}</>
      </div>
      <div className="px-8 py-8 PopularNfts__nft-info">
        <div className="flex items-center justify-between mb-4">
          <p>{name}</p>
          <p className="px-2 py-2 border text-uppercase border-blue">
            {price} {currency}
          </p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <p className="flex items-center ">
            <div className="w-3 h-3 mr-2 bg-red-400 rounded-full"></div>
            {address}
          </p>
          <p>{days} Days Left</p>
        </div>
      </div>
    </div>
  );
};

export default BuyNftCard;
