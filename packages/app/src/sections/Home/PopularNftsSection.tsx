import React from "react";
import Image from "next/image";
import NftCard from "../../components/NftCard";

const PopularNftsSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-2xl lg:text-4xl text-center mb-6 font-semibold">
            Popular NFTs
          </h2>
          <p className="text-base lg:text-lg mb-6 lg:mb-8 text-white text-center text-opacity-70 md:max-w-xl ">
            Browse and bid on the hottest ZOO NFTs on the marketplace.{" "}
          </p>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg: justify-between lg:gap-4">
          <NftCard
            image={
              <Image src="/img/girrafe.png" width={131} height={292} alt="" />
            }
            name="Elk (1589)"
            price="500k"
            address="0x070...09cb"
            days="3"
            highestBid="1M"
            yields="200"
          />
					 <NftCard
            image={
              <Image src="/img/tiger.png" width={234} height={292} alt="" />
            }
            name="Elk (1589)"
            price="500k"
            address="0x070...09cb"
            days="3"
            highestBid="1M"
            yields="200"
          />
					 <NftCard
            image={
              <Image src="/img/hippo.png" width={211} height={292} alt="" />
            }
            name="Elk (1589)"
            price="500k"
            address="0x070...09cb"
            days="3"
            highestBid="1M"
            yields="200"
          />
					 <NftCard
            image={
              <Image src="/img/leopard.png" width={231} height={292} alt="" />
            }
            name="Elk (1589)"
            price="500k"
            address="0x070...09cb"
            days="3"
            highestBid="1M"
            yields="200"
          />
        </div>
      </div>
    </section>
  );
};

export default PopularNftsSection;
