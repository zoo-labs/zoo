import React, { useEffect } from "react";
import Image from "next/image";
import NftCard from "../../components/NftCard";

// animation
import { fadeInOnScroll, fadeInOnScrollAndStagger } from "animation";

const PopularNftsSection = () => {
  // const popularRef = React.useRef();
  // const nftsRef = React.useRef();

  // useEffect(() => {
  //   fadeInOnScroll(popularRef.current);
  // }, []);

  // useEffect(() => {
  //   fadeInOnScrollAndStagger('.PopularNft_nft', nftsRef.current);
  // }, []);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 lg:pb-20">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-2xl lg:text-[44px] leading-[3rem] lg:leading-4 text-center mb-4 font-semibold">
            Popular NFTs
          </h1>
          <p className="text-base lg:text-lg mb-6 lg:mb-8 text-white text-center text-opacity-70 md:max-w-xl ">
            Browse and bid on the hottest ZOO NFTs on the marketplace.{" "}
          </p>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg: justify-between lg:gap-4">
          <NftCard
            image={
              <Image src="/img/girrafe.png" width={217} height={482} alt="" />
            }
            name="Girrafe (1589)"
            price="500k"
            address="0x070...09cb"
            days="3"
            highestBid="1M"
            yields="200"
          />
          <NftCard
            image={
              <Image src="/img/tiger-nft.png" width={276} height={373} alt="" />
            }
            name="Siberian Tiger (1589)"
            price="500k"
            address="0x070...09cb"
            days="3"
            highestBid="1M"
            yields="200"
          />
          <NftCard
            image={
              <Image src="/img/hippo.png" width={259} height={339} alt="" />
            }
            name="Javan Rhino (1589)"
            price="500k"
            address="0x070...09cb"
            days="3"
            highestBid="1M"
            yields="200"
          />
          <NftCard
            image={
              <Image src="/img/leopard.png" width={292} height={369} alt="" />
            }
            name="Amur Leopard (1589)"
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
