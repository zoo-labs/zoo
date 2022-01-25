import React from 'react';

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
  currency = 'ZOO'
}: NftCardProps) => {
  return (
    <div className="flex flex-col flex-1 grow">
      <div className="p-0.5 rounded-lg h-full w-full overflow-hidden mb-6 lg:mb-0 PopularNft_nft bg-nft-gradient">
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="PopularNfts__nft-img flex flex-col justify-end my-8 text-center object-contain overflow-hidden min-h-nftContainer">
            {image && image}
          </div>
        </div>
      </div>
      <div className="PopularNfts__nft-info py-8">
        <div className="flex justify-between items-center mb-4">
          <p>{name}</p>
          <p className="text-uppercase border border-blue p-1.5">
            {price} {currency}
          </p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <p className="flex items-center text-steel text-base">
            <span className="w-5 h-5 bg-nft-gradient rounded-full mr-2" />
            {address}
          </p>
          <p>{days} Days Left</p>
        </div>
        <hr className="mb-6" />
        <div className="flex justify-between items-center mb-4">
          <p className="text-steel text-sm mr-9">Highest bid</p>
          <p className="text-uppercase">{highestBid} Zoo</p>
          <p className="flex items-center text-steel text-sm ml-9">
            {yields} Yields/Day
          </p>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
