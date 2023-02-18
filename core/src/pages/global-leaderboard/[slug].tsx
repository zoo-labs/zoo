import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// import PopularNftsSection from 'pages/home/PopularNftsSection';

type Props = {};

const Slug: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { slug } = router.query;
  const [category, setCategory] = useState(0);

  const items = [
    {
      id: 1,
      nftId: 4,
      nftName: "Egg",
      nftImg: "egg",
      price: 300_000,
    },
    {
      id: 2,
      nftId: 360,
      nftName: "Egg",
      nftImg: "egg-white",
      price: 500_000,
    },
    {
      id: 3,
      nftId: 50,
      nftName: "Mature Siberian Tiger",
      nftImg: "egg-white",
      price: 1_000_000,
    },
  ];

  return (
    <div className="xl:px-52 lg:px-48 md:px-24 px-6">
      <div className="my-12 md:my-24 xl:px-52 lg:px-24 md:px-32">
        <div
          className="rounded-xl w-full mb-4 p-0.5 mb-10 md:mb-20"
          style={{
            background: "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
          }}
        >
          <div className="flex items-center justify-center bg-black rounded-xl w-full h-full">
            {["Top ZOO", "NFT", "Global Users"].map((value, index) => {
              const active = category === index;
              return (
                <a
                  onClick={() => {
                    setCategory(index);
                  }}
                  className={`text-white text-xs md:text-sm font-bold px-3 md:px-6 py-3.5 cursor-pointer w-full h-full flex items-center justify-center ${
                    index !== 2 && "border-r border-blue"
                  } ${
                    index === 0 ? "rounded-l-xl" : index === 2 && "rounded-r-xl"
                  }`}
                  style={{
                    background: active
                      ? "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)"
                      : "transparent",
                  }}
                  key={index}
                >
                  {value}
                </a>
              );
            })}
          </div>
        </div>
        <div
          className="rounded-lg  p-px cursor-pointer"
          style={{
            background: "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
          }}
        >
          <div className="p-3 text-sm md:text-base font-semibold rounded-lg bg-black flex justify-between gap-4">
            <span>
              <span className="mr-2">{slug}.</span>
              <span>@finessequeen</span>
            </span>
            <span>0xd8 … 3a8db</span>
            <span>
              <Image src="/img/arrow-right.png" width={16} height={12} alt="" />
            </span>
          </div>
        </div>
      </div>

      {items?.map(({ id, nftId, nftName, nftImg, price }) => (
        <div
          key={id}
          className="flex flex-col md:flex-row md:justify-between md:gap-16 lg:gap-32 mb-40"
        >
          <div className="mb-4 lg:mb-0 p-0.5 rounded border border-gray-500">
            <div className="flex flex-col justify-center items-center px-4 py-6 rounded lg:px-8 bg-black h-full">
              <div style={{ minHeight: "299px" }}>
                <Image
                  src={`/img/${nftImg}.png`}
                  width={300}
                  height={300}
                  alt=""
                />
              </div>
              <button className="bg-gradient-to-b from-purple to-blue text-white font-semibold text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full">
                Make Offer
              </button>
            </div>
          </div>
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">
                {nftName} #{nftId}
              </h3>
              <p>
                Contains <span className="font-extrabold">1 of 16</span>{" "}
                Generation one Base Animals. To hatch or to hold…
              </p>
            </div>
            <div className="p-0.5 mb-8 rounded border border-gray-500">
              <div className="bg-black px-4 py-6 rounded h-full">
                <p className="font-bold mb-2">Details</p>
                <div className="flex justify-between mb-2">
                  <p>Transaction</p>
                  <p className="text-purple">0x00000000…000000</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Token Id</p>
                  <p>234345</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Hash</p>
                  <p>4</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Token Standard</p>
                  <p>ERC-721</p>
                </div>
              </div>
            </div>

            <div className="p-0.5 mb-8 rounded border border-gray-500">
              <div className="details rounded bg-black">
                <div className="px-4 pt-6 pb-2 ">
                  <p className="font-bold mb-2">Proof of Authenticity</p>
                  <div className="mb-2">
                    <p className="text-lg font-bold">
                      {price.toLocaleString()} $ZOO
                    </p>
                  </div>

                  <div className="flex justify-between mb-2 cursor-pointer">
                    <p className="text-purple100">Etherscan transaction</p>
                    <Image
                      src="/img/link-arrow-right.svg"
                      width={16}
                      height={16}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex justify-between px-4 py-2 border-t border-blue cursor-pointer">
                  <p className="text-purple100">View on IPS</p>
                  <Image
                    src="/img/link-arrow-right.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* <div className="py-20">
        <PopularNftsSection />
        <div className="text-center mt-12 text-xl">
          <a href="/animal-list" className="underline text-green ">
            View All
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Slug;
