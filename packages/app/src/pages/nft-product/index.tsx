import Image from "next/image";

const productData = [
  {
    id: "1",
    name: "Siberian Tiger",
    description:
      "Introducing Only1 Genesis NFTs and Creator Staking Pool - where Defi meets social in only1. Each creator passed KYC will be minted a Genesis-NFT, which they can associate with perks and rewards and trade it in the marketplace. Users on the platform can stake $LIKE tokens on individual creators and earn based on the pool’s APY, which adjusts according to the creator’s engagement. Only1 believes that the future of NFTs will serve a key function within the tech world and that utility NFTs will inevitably spill into other verticals outside gaming. They also think art and collectible NFTs will slowly be replaced by utility NFTs, and hence have made them an integral part of their concept and earning mechanisms. There are two main methods that Only1 uses to prioritize social engagement between fans and influencers.",
    status: "endangered",
    population: "2,400 - 2,800",
    scientificName: "Elephas Maximus Sumatrensis",
    size: "6.6 - 10.5 Feet",
    habitat: "Tropical Forests",
  },
];

const NFTProduct = () => {
  return (
    <div className="NFTProduct">
      <div className=" pt-16 pb-16 px-6 md:flex md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto lg:justify-center gap-4">
        <div className="lg:basis-1/2 flex items-center justify-center">
          <div className="p-px bg-gradient-to-b from-btn1 to-btn2 mb-8 lg:mb-0">
            <div className="bg-black">
              <Image src="/img/egg.png" width={300} height={300} alt="" />
            </div>
          </div>
        </div>
        {productData.map((data) => {
          return (
            <div
              className="bg-black100 rounded px-4 py-12 flex flex-col lg:flex-row items-start justify-between lg:basis-1/2 gap-2"
              key={data.id}
            >
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
                  <a href="/partnerships" className="text-sm underline">
                    philanthropic partnership
                  </a>
                </div>
                <div className="flex items-center mb-8">
                  <Image
                    src="/img/status-icon.svg"
                    width={48}
                    height={48}
                    alt=""
                  />
                  <span className="ml-4">
                    <p>Status</p>
                    <p className="text-xs capitalize">{data.status}</p>
                  </span>
                </div>
                <div className="flex items-center mb-8">
                  <Image
                    src="/img/population-icon.svg"
                    width={48}
                    height={48}
                    alt=""
                  />
                  <span className="ml-4">
                    <p>Population</p>
                    <p className="text-xs">{data.population}</p>
                  </span>
                </div>
                <div className="flex items-center mb-8">
                  <Image
                    src="/img/scientific-name-icon.svg"
                    width={48}
                    height={48}
                    alt=""
                  />
                  <span className="ml-4">
                    <p>Scientific Name</p>
                    <p className="text-xs">{data.scientificName}</p>
                  </span>
                </div>
                <div className="flex items-center mb-8">
                  <Image
                    src="/img/size-icon.svg"
                    width={48}
                    height={48}
                    alt=""
                  />
                  <span className="ml-4">
                    <p>Size</p>
                    <p className="text-xs">{data.size}</p>
                  </span>
                </div>
                <div className="flex items-center mb-8">
                  <Image
                    src="/img/environment-icon.svg"
                    width={48}
                    height={48}
                    alt=""
                  />
                  <span className="ml-4">
                    <p>Habitats</p>
                    <p className="text-xs capitalize">{data.habitat}</p>
                  </span>
                </div>
              </div>

              <div className="basis-2/3">
                <p className="text-lg">
                  Introducing Only1 Genesis NFTs and Creator Staking Pool -
                  where Defi meets social in only1. Each creator passed KYC will
                  be minted a Genesis-NFT, which they can associate with perks
                  and rewards and trade it in the marketplace. Users on the
                  platform can stake $LIKE tokens on individual creators and
                  earn based on the pool’s APY, which adjusts according to the
                  creator’s engagement.
                </p>
                <p className="text-lg">
                  Introducing Only1 Genesis NFTs and Creator Staking Pool -
                  where Defi meets social in only1. Each creator passed KYC will
                  be minted a Genesis-NFT, which they can associate with perks
                  and rewards and trade it in the marketplace. Users on the
                  platform can stake $LIKE tokens on individual creators and
                  earn based on the pool’s APY, which adjusts according to the
                  creator’s engagement.
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-16 pb-16 px-6 md:flex md:flex-col lg:max-w-7xl lg:mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
          View Available Siberian Tigers
        </h2>
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          <div className="p-px bg-gradient-to-b from-btn1 to-btn2 mb-4">
            <div className="bg-black">
              <Image
                src="/img/siberian-tiger-nft.png"
                width={263}
                height={334}
                alt=""
                objectFit="contain"
              />
            </div>
          </div>
          <div className="p-px bg-gradient-to-b from-btn1 to-btn2 mb-4">
            <div className="bg-black">
              <Image
                src="/img/tiger-nft.png"
                width={263}
                height={334}
                alt=""
                objectFit="contain"
              />
            </div>
          </div>
          <div className="p-px bg-gradient-to-b from-btn1 to-btn2 mb-4">
            <div className="bg-black">
              <Image
                src="/img/tiger-nft.png"
                width={263}
                height={334}
                alt=""
                objectFit="contain"
              />
            </div>
          </div>
          <div className="p-px bg-gradient-to-b from-btn1 to-btn2 mb-4">
            <div className="bg-black">
              <Image
                src="/img/tiger-nft.png"
                width={263}
                height={334}
                alt=""
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTProduct;
