import Image from "next/image";
import React from "react";

const utils = [
  {
    title: "Anti-Rugging Tax",
    description:
      "Zoo Labs will impose a 8% tax for the $ZOO token in order to keep moving forward and keep liquidity high. The tax will enure a sustainable ecosystem. The tax will be split in half where 4% will go to the ZOO DAO and 4% will go to the liquidity pool.",
    icon: "/icons/line-across-circle-1.svg",
  },
  {
    title: "Collateral Backed NFTs",
    description:
      "“Feed” your animal any currency, crypto or fiat. Each feed, is like staking. The more you stake the more you make, at around 111% APY or even more! All you have to do is keep the collateral in and redeem collateral by burning or selling NFT.",
    icon: "/icons/collateral.svg",
  },
  {
    title: "Mint New Animals",
    description:
      "Your animal will mint an older generation of the same animal when you feed your animal the original NFT’s price. Collect every generation: Eggs, Baby, Teen and Adult, OR sell them on the Zoo Marketplace to the highest bidder.",
    icon: "/icons/mint.svg",
  },
  {
    title: "Incubate Eggs",
    description:
      "The Egg NFTs  hatch! You can also hold on to your NFT Eggs in your wallet, someone might make an offer to buy it, or just directly list it on the Zoo Marketplace.  But if you incubateyour egg and it hatches you can finally unveil the animal inside, which actually is a baby NFT.",
    icon: "/icons/crack-egg.svg",
  },
  {
    title: "Breed",
    description:
      "Once you have minted 2 adult animals or bought 2 adults on the Zoo Marketplace you can breed them! Each adult can be bred up to 6x. Each breeding period results in an NFT Egg.",
    icon: "/icons/bred-monkey.svg",
  },
];

const InfoSection = () => {
  return (
    <section className="relative" id="endless-opportunity">
      <div className="px-6 lg:my-10">
        <div className="flex flex-col items-center justify-between mx-auto lg:flex-row max-w-7xl">
          <div className="mx-auto max-w-5xl w-full rounded-[20px] bg-black pt-20 pb-16 px-20">
            <p className="font-semibold text-4.5xl text-white text-center mb-20">
              Making the protection of endangered species accessible, profitable
              and fun!
            </p>
            {utils.map(({ title, description, icon }, i) => (
              <div key={i} className="flex items-center mb-9">
                <div className="min-w-[100px]">
                  <img src={icon} alt="" width={78} height={78} />
                </div>
                <div className="ml-6">
                  <p className="text-xl font-medium text-butter-white">
                    {title}
                  </p>
                  <p className="text-muted-50 text-base font-medium">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
