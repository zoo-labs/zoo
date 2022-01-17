import React from "react";
import Image from "next/image";

const GlobalLeaderboard = () => {
  const [isActive, setIsActive] = React.useState("nft-value");
  const dummyData = [
    {
      id: 1,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
    {
      id: 2,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
    {
      id: 3,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
    {
      id: 4,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
    {
      id: 5,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
    {
      id: 6,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
    {
      id: 7,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
    {
      id: 8,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
    {
      id: 9,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
    {
      id: 10,
      name: "@finessequeen ",
      address: "0xd8 … 3a8db",
    },
  ];
  return (
    <section className="flex flex-col items-center ">
      <div className="px-4 py-16 lg:w-3/12 mx-auto">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold mb-4 border border-blue rounded-lg p-3 text-center">
            ZOO NFT Leaderboard
          </h1>
        </div>
        <div className="">
          {dummyData.map(({ id, name, address }) => (
            <div
              key={id}
              className="border border-blue mb-4 rounded-lg"
            >
              <div className="p-3 font-semibold rounded-lg bg-black flex justify-between gap-4">
                <span>
                  <span className="mr-2">{id}.</span>
                  <span>{name}</span>
                </span>
                <span>{address}</span>
                <span>
                  <Image
                    src="/img/arrow-right.png"
                    width={16}
                    height={12}
                    alt=""
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalLeaderboard;