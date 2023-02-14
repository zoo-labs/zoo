import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "components/CloseIcon";
import { PrettoSlider } from "components/Slider";
import { wait } from "functions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "state";
import { fadeInOnScroll } from "animation";
import {
  useBuyZoo,
  useFetchMyNFTs,
  useGetAllAuctions,
  useGetNftTransfers,
} from "state/zoo/hooks";
import { numberWithCommas } from "functions";

import MyWalletSection from "./MyWalletSection";
import MyBidsSection from "./MyBidsSection";
import MyAuctionSection from "./MyAuctionsSections";
import EmptyAuctionSection from "./EmptyAuctionSection";
import { handleFunds } from "utils/handleFunds";
import { useActiveWeb3React } from "hooks";
import { useMoralis } from "react-moralis";
import { Auction } from "types";
import EmptyBidSection from "./EmptyBidSection";
import CustomLoader from "components/CustomLoader";
import Image from "next/image";
import ReactDropdown from "react-dropdown";

export default function Wallet({ children }) {
  const [category, setCategory] = useState(0);
  const [filtering, setFiltering] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [maxPrice, setMaxPrice] = useState<any>(0);
  const [breedCount, setBreadCount] = useState(0);
  const [eggOptions, setEggs] = useState([]);

  const { Moralis, enableWeb3, isAuthenticated, authenticate } = useMoralis();

  const { account, library, chainId } = useActiveWeb3React();
  const buyZoo = useBuyZoo();
  const getAllAuctions = useGetAllAuctions();
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );
  const animalsState = useSelector<AppState, AppState["zoo"]["animals"]>(
    (state) => state.zoo.animals
  );
  const eggsState = useSelector<AppState, AppState["zoo"]["eggs"]>(
    (state) => state.zoo.eggs
  );
  const dispatch = useDispatch();
  const fetchNFTs = useFetchMyNFTs();
  const getNftTransfers = useGetNftTransfers();
  const {
    myNfts,
    nftTransfers,
    allAuctions,
    myEggsCount,
    myAnimalsCount,
    availableEggs,
  } = useSelector((state: any) => state.zoo);
  const comingSoonRef = React.useRef();
  const allAnimls = Object.values(animalsState);
  const allEggs = Object.values(eggsState);
  const options = ["Endangered", "Critically-Endangered", "Near-Extinction"];
  const sortOptions = ["Highest - Lowest", "Lowest - Highest"];

  const timeFIlterOption = [
    "Recently added",
    "Last 24 hours",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
  ];

  const animalFilterOption = [
    "Sumatran Elephant",
    "Javan Rhino",
    "Siberian Tiger",
    "Amur Leopard",
    "Pygmy Hippo",
    "Nubian Giraffe",
    "Red Wolf",
  ];

  const allData = {
    0: allEggs,
    1: allAnimls,
  };


  const [auctionFilter, setAuctionFilter] = useState([]);
  const [isLoadingAuction, setIsLoadingAuction] = useState(true);

  useEffect(() => {
    getAllAuctions(setIsLoadingAuction);
  }, []);
  // useEffect(() => {
  //   fadeInOnScroll(comingSoonRef.current);
  // }, []);

  useEffect(() => {
    setAuctionFilter(allAuctions);
  }, [allAuctions]);

  useEffect(() => {
    initMoralis();
  }, [chainId]);

  const initMoralis = async () => {
    if (chainId) {
      try {
        await enableWeb3();
        await fetchNFTs();
        await getNftTransfers();
        if (!isAuthenticated) {
          authenticate();
        }
      } catch (error) {
        console.log("error in inist", error);
      }
    }
  };

  const filterAuctions = useCallback(
    (type: "price" | "rarity" | "yields" | "egg" | "animal", value) => {
      if (type === "price") {
        const filter = allAuctions.filter(
          (auction) => Number(auction.reservePrice) >= Number(value)
        );
        setAuctionFilter(filter);
      }
      if (type === "rarity") {
        const filter = allAuctions.filter(
          (auction) =>
            auction?.attributes?.find((a) => a.trait_type === "Rarity")
              ?.value == value.value
        );

        setAuctionFilter(filter);
      }
      if (type === "yields") {
        if (value.value === "Highest - Lowest") {
          const filter = [...allAuctions].sort(
            (a, b) =>
              b?.attributes?.find((a) => a.trait_type === "Yields")?.value -
              a?.attributes?.find((a) => a.trait_type === "Yields")?.value
          );
          const actVal = filter.filter((v) => v);
          setAuctionFilter(actVal);
        } else {
          const filter = [...allAuctions].sort(
            (a, b) =>
              a?.attributes?.find((a) => a.trait_type === "Yields")?.value -
              b?.attributes?.find((a) => a.trait_type === "Yields")?.value
          );
          const actVal = filter.filter((v) => v);
          setAuctionFilter(actVal);
        }
      }
      if (type === "egg" || type === "animal") {
        const filter = allAuctions.filter(
          (auction) =>
            auction.name?.toLowerCase() === value?.value?.toLowerCase()
        );
        setAuctionFilter(filter);
      }
    },
    [allAuctions]
  );

  useEffect(() => {
    const e = availableEggs?.map((egg) => `${egg.name} Egg`);
    setEggs(e);
  }, [availableEggs]);

  return (
    <section className="Hero">
      <div className="px-6 pb-16 mt- Hero__inner md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
        <div className="flex flex-col items-center justify-between px-2 sm:px-0 pt-12 lg:flex-row lg:max-w-7xl lg:mx-auto">
          <div className="p-0.5 rounded-full bg-black">
            <div className="">
              <div className="flex items-center  w-max">
                {["My Wallet", "My Bids", "My Auctions"].map((value, index) => {
                  const active = category === index;
                  return (
                    <a
                      onClick={() => {
                        setCategory(index);
                      }}
                      className={` ${index === 0 && ""} ${index === 2 && ""}
                    ${index !== 2 && "mr-px"}
                    text-base font-semibold py-4 px-3 cursor-pointer inline-block text-white ${
                      active ? " border-b-2 border-[#2517FF]" : ""
                    }`}
                      key={index}
                    >
                      {value}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between px-2 sm:px-0 pt-4 md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
          <div className="">
            <p className="text-[32px] font-[400] md:text-xl mt-4">
              Wallet Value
            </p>
            <div className="flex items-center mb-10 mt-6">
              <p className="text-base font-bold text-white md:text-[56px] ">
                {numberWithCommas(zooBalance.toFixed(2))} $ZOO
              </p>
              {/* <button
                onClick={() => handleFunds(chainId, buyZoo)}
                className="px-5 py-3 ml-4 text-sm font-semibold text-white rounded-full bg-blue md:text-base md:px-6 md:py-3 lg:px-6"
              >
                Buy $ZOO
              </button> */}
            </div>
            <div className="flex">
              {/* for v2 */}
              {/* <div className="bg-[#333333] w-56 h-16 rounded-[5px] px-4 flex items-center justify-between">
                <div>
                  <p className="text-[14px]">Collateral Staked</p>
                  <p className="font-[500] text-[20px]">$15,600.42</p>
                </div>
                <button className="flex items-center">
                  <Image
                    src="/icons/add-circle.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </button>
              </div>
              <div className="bg-blue w-56 h-16 rounded-[5px] px-4 text-center flex items-center justify-center ml-4 cursor-pointer">
                <p className="text-[14px] text-center">Start a Pool</p>
              </div> */}
              <div
                onClick={() => handleFunds(chainId, buyZoo)}
                className="bg-blue w-56 h-16 rounded-[5px] px-4 text-center flex items-center justify-center cursor-pointer"
              >
                <p className="text-[14px] text-center">Buy $ZOO</p>
              </div>
            </div>
            {account && category === 0 && (
              <p className="font-semibold mt-8">
                {myEggsCount} Egg{myEggsCount !== 1 ? "s" : ""} -{" "}
                {myAnimalsCount} Animal{myAnimalsCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
        <>
          {isLoadingAuction ? (
            <CustomLoader />
          ) : (
            <>
              <div className="flex justify-end">
                <div>
                  <div className="flex items-center">
                    <button className="mr-4">
                      <Image
                        src={"/icons/market-package.svg"}
                        width={40}
                        height={40}
                        alt=""
                      />
                    </button>
                    <button className="mr-4">
                      <Image
                        src={"/icons/market-sweep.svg"}
                        width={40}
                        height={40}
                        alt=""
                        className="mr-4"
                      />
                    </button>
                    <button
                      className=""
                      onClick={() => {
                        if (filtering) {
                          setFiltering(!filtering);
                          setAuctionFilter(allAuctions);
                        } else {
                          setFiltering(!filtering);
                        }
                      }}
                    >
                      {!filtering ? (
                        <Image
                          src={"/icons/market-filter.svg"}
                          width={40}
                          height={40}
                          alt=""
                        />
                      ) : (
                        <CloseIcon width="48" color="#878787" />
                      )}
                      {/* */}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="relative justify-between hidden mb-8 lg:flex mt-8">
                <div className="flex items-center justify-between w-full h-12  pr-1 text-sm rounded-lg cursor-pointer">
                  <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-solid rounded-lg cursor-pointer border-33 text-grey-400 w-44">
                    <ReactDropdown
                      menuClassName="menu absolute -ml-4 pl-4 py-1 top-full bg-white flex flex-col w-full"
                      className="dropdown"
                      options={timeFIlterOption}
                      value={""}
                      placeholder={"Recently added"}
                      placeholderClassName="menu absolute -ml-4 pl-4 top-3 flex flex-col w-full"
                    />
                    <Image
                      src={"/icons/down.svg"}
                      alt=""
                      className="absolute"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                {/* <div className='flex items-center justify-between h-12 pl-4 pr-1 text-sm border border-gray-600 border-solid rounded-lg cursor-pointer w-44'>
              Recently added
              <RiArrowDownCircleLine fill='gray' style={{ fontSize: 25, color: 'red' }} />
            </div> */}
                <div
                  className="w-full rounded-xl"
                  style={{
                    background: "#333",
                    padding: 1,
                  }}
                >
                  <div className="flex items-center justify-center w-full h-full bg-[#111] rounded-xl">
                    {["All Items", "Eggs", "Animals"].map((value, index) => {
                      const active = category === index;
                      return (
                        <a
                          onClick={() => {
                            setCategory(index);
                            setPage(1);
                            setAuctionFilter(allAuctions);
                            if (index === 0) {
                              setData(
                                [...Object.values(allData)]
                                  .flat(1)
                                  .sort(
                                    (a: any, b: any) => a.tokenID - b.tokenID
                                  )
                                  .slice(0, 8)
                              );
                            } else if (index === 3) {
                              console.log("is hybrid filter");
                            } else {
                              setData([]);
                              setFetching(true);
                              wait(1500).then(() =>
                                setData(
                                  [allData[index - 1]]
                                    .flat(1)
                                    .sort((a, b) => a.tokenID - b.tokenID)
                                    .slice(0, 8)
                                )
                              );
                            }
                          }}
                          className={`text-white text-sm font-bold py-1 px-4 cursor-pointer w-full h-full flex items-center justify-center ${
                            index !== 2 && "border-r border-33"
                          } ${
                            index === 0
                              ? "rounded-l-xl"
                              : index === 2 && "rounded-r-xl"
                          }`}
                          style={{
                            background: active ? "black" : "transparent",
                          }}
                          key={index}
                        >
                          {value}
                        </a>
                      );
                    })}
                  </div>
                </div>
                {/* <div
            className="absolute flex justify-center transform left-2/4 -translate-x-2/4"
            style={{ top: 10 }}
          >
            {['All Items', 'Eggs', 'Animals'].map((value, index) => {
              const active = category === index;
              return (
                <a
                  onClick={() => {
                    setCategory(index);
                    setPage(1);
                    if (index === 0) {
                      setData(
                        [...Object.values(allData)]
                          .flat(1)
                          .sort((a: any, b: any) => a.tokenID - b.tokenID)
                          .slice(0, 8)
                      );
                    } else if (index === 3) {
                      console.log('is hybrid filter');
                    } else {
                      setData([]);
                      setFetching(true);
                      wait(1500).then(() =>
                        setData(
                          [allData[index - 1]]
                            .flat(1)
                            .sort((a, b) => a.tokenID - b.tokenID)
                            .slice(0, 8)
                        )
                      );
                    }
                  }}
                  className={`${
                    active ? 'bg-white text-gray-900' : 'text-gray-600'
                  } text-sm rounded-full font-bold py-1 px-4 cursor-pointer`}
                  key={index}
                >
                  {value}
                </a>
              );
            })}
          </div> */}
                <div className="hidden">show on tablet viewport</div>
                {/* <div className="flex items-end justify-end w-full">
          <button
            onClick={() => {
              if (filtering) {
                setFiltering(!filtering);
                setAuctionFilter(allAuctions);
              } else {
                setFiltering(!filtering);
              }
            }}
            className="relative flex items-center justify-center px-6 py-3 font-bold leading-3 text-center border border-33 rounded-xl text-grey-400"
          >
            Filter
            <span className="flex items-center justify-center pl-2">
              {!filtering ? (
                <Filter color="#878787" />
              ) : (
                <CloseIcon color="#878787" />
              )}
            </span>
          </button>
        </div> */}
              </div>

              {/* Search + Filter */}
              <div
                className={`${
                  !filtering ? "hidden" : "block"
                } border-t border-solid py-8`}
                style={{ borderColor: "rgb(107, 114, 128)" }}
              >
                <div className="flex flex-wrap items-center justify-between ">
                  <div>
                    <p className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
                      YIELDS
                    </p>
                    <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-white border-solid rounded-lg cursor-pointer text-grey-400 w-44">
                      <ReactDropdown
                        menuClassName="menu absolute -ml-4 pl-4 py-1 top-full bg-white flex flex-col w-full"
                        className="dropdown"
                        options={sortOptions}
                        value={""}
                        onChange={(e) => filterAuctions("yields", e)}
                        placeholder="-"
                        placeholderClassName="menu absolute -ml-4 pl-4 top-3 flex flex-col w-full"
                      />
                      <Image
                        src={"/icons/down.svg"}
                        alt=""
                        className="absolute top-0"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
                      RARITY
                    </p>
                    <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-white border-solid rounded-lg cursor-pointer text-grey-400 min-w-[240px]">
                      <ReactDropdown
                        menuClassName="menu absolute -ml-4 pl-4 py-1 top-full bg-white flex flex-col w-full"
                        className="dropdown"
                        options={options}
                        value={""}
                        onChange={(e) => filterAuctions("rarity", e)}
                        placeholder="-"
                        placeholderClassName="menu absolute -ml-4 pl-4 top-3 flex flex-col w-full"
                      />
                      <Image
                        src={"/icons/down.svg"}
                        alt=""
                        className="absolute top-0"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  {category === 1 && (
                    <div>
                      <p className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
                        EGG TYPE
                      </p>
                      <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-white border-solid rounded-lg cursor-pointer text-grey-400 min-w-[240px]">
                        <ReactDropdown
                          menuClassName="menu absolute -ml-4 pl-4 py-1 top-full bg-white flex flex-col w-full"
                          className="dropdown"
                          options={eggOptions}
                          value={""}
                          onChange={(e) => filterAuctions("egg", e)}
                          placeholder="-"
                          placeholderClassName="menu absolute -ml-4 pl-4 top-3 flex flex-col w-full"
                        />
                        <Image
                          src={"/icons/down.svg"}
                          alt=""
                          className="absolute top-0"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  )}
                  {category === 2 && (
                    <div>
                      <p className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
                        ANIMAL TYPE
                      </p>
                      <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-white border-solid rounded-lg cursor-pointer text-grey-400 min-w-[240px]">
                        <ReactDropdown
                          menuClassName="menu absolute -ml-4 pl-4 py-1 top-full bg-white flex flex-col w-full"
                          className="dropdown"
                          options={animalFilterOption}
                          value={""}
                          onChange={(e) => filterAuctions("animal", e)}
                          placeholder="-"
                          placeholderClassName="menu absolute -ml-4 pl-4 top-3 flex flex-col w-full"
                        />
                        <Image
                          src={"/icons/down.svg"}
                          alt=""
                          className="absolute top-0"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className=""
                    style={{
                      flex: " 0 0 calc(25% - 32px)",
                      maxWidth: "calc(25% - 32px)",
                      margin: "0px 16px",
                    }}
                  >
                    <div>
                      <div className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
                        PRICE RANGE
                      </div>
                      <PrettoSlider
                        onChange={(value, number) => {
                          setBreadCount(Number(number));
                          filterAuctions("price", number);
                        }}
                        value={breedCount}
                        valueLabelDisplay="auto"
                        aria-label="slider"
                        step={1}
                        defaultValue={10}
                        min={1}
                        max={maxPrice}
                      />
                      <div className="flex justify-between text-xs">
                        <div className="font-semibold">0.01 ZOO</div>
                        <div className="font-semibold">{maxPrice} ZOO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {category === 0 ? (
                <MyWalletSection
                  myNfts={myNfts}
                  nftTransfers={nftTransfers}
                  fetchNfts={() => fetchNFTs()}
                />
              ) : category === 1 ? (
                auctionFilter.filter((auction: Auction) =>
                  auction.auctionHistory.some((history) => {
                    return history.from_address === account;
                  })
                )?.length > 0 ? (
                  auctionFilter
                    .filter((auction: Auction) =>
                      auction.auctionHistory.some((history) => {
                        return history.from_address === account;
                      })
                    ) // filter bids that are mine
                    .map((auction: Auction, index: number) => (
                      <MyBidsSection key={index} auction={auction} />
                    ))
                ) : (
                  <EmptyBidSection />
                )
              ) : auctionFilter.filter(
                  (auction: Auction) => auction.tokenOwner === account
                )?.length > 0 ? (
                auctionFilter
                  .filter((auction: Auction) => auction.tokenOwner === account) // filter auctions that are mine
                  .map((auction: Auction, index: number) => (
                    <MyAuctionSection key={index} auction={auction} />
                  ))
              ) : (
                <EmptyAuctionSection />
              )}
            </>
          )}
        </>
      </div>
    </section>
  );
}
