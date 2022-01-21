import Image from "next/image";
import { useActiveWeb3React } from "hooks";
import Web3Status from "../../components/Web3Status";

const nftData = [
  {
    id: "1",
    name: "Red Wolf",
    dailyYield: false,
    medium: true,
    large: true,
  },
  {
    id: "2",
    name: "Bengal Tiger",
    dailyYield: true,
    medium: true,
    large: true,
  },
  {
    id: "3",
    name: "Nubian Giraffe",
    dailyYield: true,
    medium: true,
    large: true,
  },
  {
    id: "4",
    name: "Sumatran Elephantt",
    dailyYield: false,
    medium: true,
    large: true,
  },
  {
    id: "5",
    name: "Pigmy Hippopotamus",
    dailyYield: true,
    medium: true,
    large: true,
  },
  {
    id: "6",
    name: "Black Rhino",
    dailyYield: true,
    medium: true,
    large: true,
  },
  {
    id: "7",
    name: "Jaguar",
    dailyYield: false,
    medium: true,
    large: true,
  },
];

const CompareYield = () => {
  const { account, chainId, library } = useActiveWeb3React();

  return (
    <div className="CompareYield">
      <div className="pt-16 pb-16 px-6 lg:max-w-7xl lg:mx-auto">
        <div className="text-center">
          <p className="uppercase text-green font-bold mb-4">
            ZOO nft animal yield opportunity
          </p>
          <h1 className="text-2xl lg:text-4xl font-bold">
            Compare yield between ZOO animals
          </h1>
        </div>
        <div className="mt-16 mb-16">
          <div className="flex flex-col max-w-screen-lg mx-auto">
            <div className="flex items-center justify-between h-20 px-4 mb-12">
              <div className="w-40"></div>
              <div className="flex-grow">
                <p className="text-sm lg:text-lg font-semibold text-center text-purple mb-4">
                  Daily Yield
                </p>
                <p className="text-grey text-xs lg:text-base text-center hidden">
                  Watch your Animal increase in value day after day
                </p>
              </div>
              <div className="flex-grow">
                <p className="lg:text-lg font-semibold text-center text-blue mr-2 lg:mr-0 mb-4">
                  Medium
                </p>
                <p className="text-xs lg:text-base text-grey text-center hidden">
                  Speed up your daily yield everytime you feed it.
                </p>
              </div>
              <div className="flex-grow">
                <p className="lg:text-lg font-semibold text-center text-red mb-4">
                  Large
                </p>
                <p className="text-xs lg:text-base text-center text-grey hidden">
                  Amount of times you need to feed your NFT Animal for it to
                  become fully grown.
                </p>
              </div>
            </div>
            <div className="flex items-center h-12 px-4 bg-black">
              <div className="text-grey text-sm uppercase font-bold">
                NFT Animals
              </div>
            </div>
            {nftData.map((data) => {
              return (
                <div
                  className="flex items-center h-12 px-4 border-b border-gray-500"
                  key={data.id}
                >
                  <div className="w-40">{data.name}</div>
                  <div className="flex justify-center flex-grow w-0">
                    {data.dailyYield && (
                      <Image
                        src="/img/tick-icon.svg"
                        width={16}
                        height={16}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex justify-center flex-grow w-0">
                    {data.medium && (
                      <Image
                        src="/img/tick-icon.svg"
                        width={16}
                        height={16}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex justify-center flex-grow w-0">
                    {data.large && (
                      <Image
                        src="/img/tick-icon.svg"
                        width={16}
                        height={16}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              );
            })}

            <div className="flex flex-col lg:flex-row items-center h-20 px-4">
              <div className="w-40"></div>
              <div className="flex items-center px-8 mb-4 mt-4 lg:mb-0 lg:mt-0">
                <a
                  href="https://pancakeswap.finance/info/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-b from-purple to-blue text-white font-semibold text-sm md:text-base px-5 py-2 md:px-6 md:py-4 lg:px-10 rounded-full"
                >
                  Buy $ZOO
                </a>
              </div>
              <div className="flex items-center px-8  mb-4 lg:mb-1">
                {!account ? (
                  <a>
                    <Web3Status
                      title="Connect Wallet"
                      className="bg-gradient-to-b from-purple to-blue text-white font-semibold text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full "
                    />
                  </a>
                ) : (
                  <a
                    href="/market"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-gray-100 text-sm md:text-base font-semibold text-white px-5 py-3 md:px-6 md:py-3 lg:px-10 rounded-full hover:cursor-pointer"
                  >
                    Marketplace
                  </a>
                )}
              </div>
              <div className="flex items-center px-8">
                <a
                  href="/market"
                  className="border border-gray-100 text-sm md:text-base font-semibold text-white px-5 py-3 md:px-6 md:py-3 lg:px-10 rounded-full hover:cursor-pointer"
                >
                  MarketPlace
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareYield;
