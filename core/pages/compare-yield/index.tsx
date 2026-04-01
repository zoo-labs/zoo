import Image from "next/image";
import { useActiveWeb3React } from "hooks";
//import Web3Status from "../../components/Web3Status";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

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
      <div className="px-6 pt-16 pb-16 lg:max-w-7xl lg:mx-auto">
        <div className="text-center">
          <p className="mb-4 font-bold uppercase text-green">
            ZOO nft animal yield opportunity
          </p>
          <h1 className="text-2xl font-bold lg:text-4xl">
            Compare yield between ZOO animals
          </h1>
        </div>
        <div className="mt-16 mb-16">
          <div className="flex flex-col max-w-screen-lg mx-auto">
            <div className="flex items-center justify-between h-20 px-4 mb-12">
              <div className="w-40"></div>
              <div className="flex-grow">
                <p className="mb-4 text-sm font-semibold text-center lg:text-lg text-purple">
                  Daily Yield
                </p>
                <p className="hidden text-xs text-center text-grey lg:text-base">
                  Watch your Animal increase in value day after day
                </p>
              </div>
              <div className="flex-grow">
                <p className="mb-4 mr-2 font-semibold text-center lg:text-lg text-blue lg:mr-0">
                  Medium
                </p>
                <p className="hidden text-xs text-center lg:text-base text-grey">
                  Speed up your daily yield everytime you feed it.
                </p>
              </div>
              <div className="flex-grow">
                <p className="mb-4 font-semibold text-center lg:text-lg text-red">
                  Large
                </p>
                <p className="hidden text-xs text-center lg:text-base text-grey">
                  Amount of times you need to feed your NFT Animal for it to
                  become fully grown.
                </p>
              </div>
            </div>
            <div className="flex items-center h-12 px-4 bg-black">
              <div className="text-sm font-bold uppercase text-grey">
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

            <div className="flex flex-col items-center h-20 px-4 lg:flex-row">
              <div className="w-40"></div>
              <div className="flex items-center px-8 mt-4 mb-4 lg:mb-0 lg:mt-0">
                <a
                  href="https://pancakeswap.finance/info/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 md:py-4 lg:px-10"
                >
                  Buy $ZOO
                </a>
              </div>
              <div className="flex items-center px-8 mb-4 lg:mb-1">
                {/*!account ? (
                  <a>
                    <Web3Status
                      title={i18n._(t`Connect Wallet`)}
                      className="px-5 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 md:py-4 lg:px-10 "
                    />
                  </a>
                ) : (
                  <a
                    href="/market"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 text-sm font-semibold text-white border border-gray-100 rounded-full md:text-base md:px-6 md:py-3 lg:px-10 hover:cursor-pointer"
                  >
                    Marketplace
                  </a>
                )*/}
              </div>
              <div className="flex items-center px-8">
                <a
                  href="/market"
                  className="px-5 py-3 text-sm font-semibold text-white border border-gray-100 rounded-full md:text-base md:px-6 md:py-3 lg:px-10 hover:cursor-pointer"
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
