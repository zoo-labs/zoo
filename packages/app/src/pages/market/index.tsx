import { numberWithCommas } from "functions";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { AppState } from "state";
import { useBuyZoo, useGetAllAuctions } from "state/zoo/hooks";
import MarketItem from "../../components/market/marketItem";
import markets from "../../components/market/marketitem.json";
import { wait } from "functions";
import { withStyles } from "@mui/styles";
import CloseIcon from "components/CloseIcon";
import ReactDropdown from "react-dropdown";
import { Filter } from "react-feather";
import { Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useModal } from "react-morphing-modal";
import { useRouter } from "next/router";
import Wallet from "./wallet";
import { useTokenTypes } from "zoo/state";
import { useGetAvailableEggs } from "state/zoo/hooks";
import { useActiveWeb3React, useDrop, useZooKeeper } from "../../hooks";
import { useMoralis } from "react-moralis";
import { abbreviateNumber } from "functions/abbreviateNumbers";
import { accountEllipsis } from "functions/lux";
import { FaMoneyBillWave } from "react-icons/fa";
import { Auction, AvailableEgg } from "types";
import Web3 from "web3";

const PrettoSlider = styled(Slider)({
  color: "#15F195",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#15F195",
    border: "2px solid #fff",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#15F195",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const MarketPlacePage = () => {
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );
  const animalsState = useSelector<AppState, AppState["zoo"]["animals"]>(
    (state) => state.zoo.animals
  );
  const eggsState = useSelector<AppState, AppState["zoo"]["eggs"]>(
    (state) => state.zoo.eggs
  );
  // const toggleBidModal = useBidModalToggle()
  // const toggleAssetModal = useAssetModalToggle()
  const myAuctions = [0, 1];
  const options = [
    "Common 🌕",
    "Uncommon 🌓",
    "Rare 🔥",
    "Super Rare ☄️",
    "Epic 🌟",
  ];
  const timeFIlterOption = [
    "Recently added",
    "Last 24 hours",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
  ];
  const [fetching, setFetching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [activeItem, setActiveItem] = useState({});
  const [hotData, setHotData] = useState([]);
  const getAvailableEggs = useGetAvailableEggs();
  const getAllAuctions = useGetAllAuctions();
  const dropContract = useDrop();

  const [age, setAge] = useState(0);
  const [breedCount, setBreadCount] = useState(0);
  const [category, setCategory] = useState(0);
  const [filtering, setFiltering] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const allAnimls = Object.values(animalsState);
  const allEggs = Object.values(eggsState);
  const allData = {
    0: allEggs,
    1: allAnimls,
  };

  const MarketEggs = markets.filter((item, index) => item.type === "egg");
  const MarketAnimals = markets.filter((item, index) => item.type === "animal");

  const { tokenTypes } = useTokenTypes();
  console.log("tokenTypes", tokenTypes);
  useEffect(() => {
    setData(
      [...Object.values(allData)]
        .flat(1)
        .sort((a: any, b: any) => a.tokenID - b.tokenID)
        .slice(0, 8 * page)
    );
    setHotData([allData[1]].flat(1).slice(0, 8));
  }, []);

  const loadMore = () => {
    setPage(page + 1);

    setLoadingMore(true);
    if (category === 0) {
      setData(
        [...Object.values(allData)]
          .flat(1)
          .sort((a: any, b: any) => a.tokenID - b.tokenID)
          .slice(0, 8 * page)
      );
    } else if (category === 3) {
      console.log("is hybrid filter");
    } else {
      setData(
        [allData[category - 1]]
          .flat(1)
          .sort((a, b) => a.tokenID - b.tokenID)
          .slice(0, 8 * page)
      );
    }
    setLoadingMore(false);
  };

  const { modalProps, open: openModal } = useModal({
    background: "black",
  });

  const router = useRouter();
  // const [zooBnbPrice, setZooBnbPrice] = useState(0);
  // const zooKeeper = useZooKeeper();

  // const getZooBnbPrice = useCallback(async () => {
  //   const price = await zooKeeper?.BNBPrice();
  //   const value = Web3.utils.fromWei(price.toString(), "ether");
  //   setZooBnbPrice(parseFloat(value));
  // }, [zooKeeper]);

  // useEffect(() => {
  //   getZooBnbPrice();
  // }, [getZooBnbPrice]);

  const onClickTokenType = (name: string) => {
    console.log("name", name);
    router.push(`${router.pathname}?name=${name}`, undefined, {
      shallow: true,
    });
  };

  const buyZoo = useBuyZoo();

  const { availableEggs, loading, allAuctions } = useSelector(
    (state: any) => state.zoo
  );

  // const {
  //   myEggsCount: eggsCount,
  //   myAnimalsCount: animalsCount,
  //   myBreedsCount: breedsCount,
  //   myNfts: myNFTs,
  // } = useSelector((state: any) => state.zoo);
  // const { authenticate, isAuthenticated, logout } = useMoralis();

  // const login = useCallback(async () => {
  //   if (!isAuthenticated) {
  //     await authenticate({ signingMessage: "Log in using Moralis" })
  //       .then(function (user) {
  //         console.log("logged in user:", user);
  //         console.log(user!.get("ethAddress"));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }, [authenticate, isAuthenticated]);

  useEffect(() => {
    getAllAuctions();
    getAvailableEggs();
  }, [getAllAuctions, getAvailableEggs]);

  console.log("MY availableEggs", availableEggs);
  console.log("MY_Auctionss", allAuctions);

  return (
    <div className="px-6 pt-16 pb-16 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
      <div className="flex flex-col items-center h-[20vh]">
        <h1 className="mb-4 text-5xl">
          The{" "}
          <span className="text-blue" style={{ fontWeight: 900 }}>
            ZOO
          </span>{" "}
          Market
        </h1>
        <p>Buy, list, and bid on NFT Eggs and Animals.</p>
      </div>
      {/* Eggs */}
      {/* <div className="mb-16">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-center text-white lg:text-4xl">
            Buy Eggs
          </h2>
        </div>
        <div className="flex flex-wrap justify-center -mx-4">
          {availableEggs.length ? (
            availableEggs?.map((item: AvailableEgg) => {
              console.log("nft item", item);
              return (
                <div
                  className="p-2 m:w-1/2 l:w-1/4"
                  key={item.id}
                  onClick={() => router.push(`/market/egg/${item.id}`)}
                >
                  <div className="flex flex-col ">
                    <div className="relative overflow-hidden rounded parent">
                      <div className="relative overflow-hidden rounded border border-gray-500 p-[2px] parent w-full">
                        <div className="h-full w-[300px]">
                          <video
                            src={item.animation_url}
                            autoPlay
                            loop
                            className="object-cover max-h-full overflow-hidden rounded"
                          />
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 invisible w-full h-full transition-all duration-300 rounded opacity-0 hover:visible hover:opacity-100">
                        <a className="absolute inline-flex items-center justify-center h-10 px-4 text-sm transition-all duration-300 transform rounded-full cursor-pointer left-1/2 bottom-6 min-w-max bg-primary -translate-x-2/4">
                          <span>Place a bid</span>
                        </a>
                      </div>
                    </div>

                    <a className="flex flex-col flex-grow py-4 no-underline cursor-pointer">
                      <div className="flex flex-col flex-grow">
                        <div className="flex mb-4 ">
                          <div className="mt-1 mr-auto text-sm font-semibold uppercase">
                            {item.name || "Egg"}{" "}
                          </div>
                          <div
                            className="flex items-center justify-center flex-shrink-0 px-2 ml-2 text-xs font-bold uppercase rounded-sm primary hover:bg-[#8c4ff8]"
                            style={{
                              boxShadow: "inset 0 0 0 1px rgb(140, 79, 248)",
                            }}
                          >
                            {abbreviateNumber(item.price)} Z00
                          </div>
                        </div>
                        <div className="flex flex-col">
                          {item.attributes?.length > 0 &&
                            item.attributes.map((attr, index) => {
                              if (attr.trait_type === "Rarity") return null;
                              return (
                                <div
                                  key={index}
                                  className="flex items-center justify-between"
                                >
                                  <p className="text-sm font-medium">
                                    {attr.trait_type}
                                  </p>
                                  <p className="font-semibold text-[10px]">
                                    {attr.value}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-800 border-t border-gray-700 border-solid ">
                        <div className="flex items-center text-xs font-semibold text-gray-500">
                          <div className="mr-1">
                            <FaMoneyBillWave />
                          </div>
                          Supply
                        </div>
                        <span className="font-semibold text-white">
                          {item.minted} / {item.supply}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-12 ">
              <p className="text-lg text-center lg:text-3xl">
                No eggs available
              </p>
            </div>
          )}
        </div>
      </div> */}
      {/* Tab Navbar */}
      {/* <div className="relative justify-center hidden mb-8 lg:flex">
        <div
          className="rounded-xl"
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
                    if (index === 0) {
                      setData(
                        [...Object.values(allData)]
                          .flat(1)
                          .sort((a: any, b: any) => a.tokenID - b.tokenID)
                          .slice(0, 8)
                      );
                    } else if (index === 1) {
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
                  className={`text-white text-sm font-bold py-4 px-6 cursor-pointer w-full h-full flex items-center justify-center ${
                    index !== 2 && "border-r border-33 whitespace-nowrap"
                  } ${
                    index === 0 ? "rounded-l-xl" : index === 2 && "rounded-r-xl"
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
      </div> */}

      {/* Tab Navigation */}
      <div className="relative justify-between hidden mb-8 lg:flex">
        <div className="flex items-center justify-between w-full h-12 pl-4 pr-1 text-sm rounded-lg cursor-pointer">
          <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-white border-solid rounded-lg cursor-pointer text-grey-400 w-44">
            {/* <ReactDropdown
                menuClassName="menu absolute -ml-4 pl-4 py-1 top-full bg-white flex flex-col w-full"
                className="dropdown"
                options={timeFIlterOption}
                value={""}
                placeholder={"Recently added"}
                placeholderClassName="menu absolute -ml-4 pl-4 top-3 flex flex-col w-full"
              /> */}
            <Image
              src={"/icons/download.svg"}
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
            background: "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
            padding: 2,
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-black rounded-xl">
            {["All Items", "Eggs", "Animals", "Hybrid"].map((value, index) => {
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
                    index !== 3 && "border-r border-blue"
                  } ${
                    index === 0 ? "rounded-l-xl" : index === 3 && "rounded-r-xl"
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
        {/* <div
            className="absolute flex justify-center transform left-2/4 -translate-x-2/4"
            style={{ top: 10 }}
          >
            {['All Items', 'Eggs', 'Animals', 'Hybrid'].map((value, index) => {
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
        <div className="flex items-end justify-end w-full">
          <button
            onClick={() => setFiltering(!filtering)}
            className="relative flex items-center justify-center px-6 py-3 font-bold leading-3 text-center border-2 rounded-xl text-grey-400"
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
        </div>
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
              PRICE
            </p>
            <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-white border-solid rounded-lg cursor-pointer text-grey-400 w-44">
              {/* <ReactDropdown
                  menuClassName="menu absolute -ml-4 pl-4 py-1 top-full bg-white flex flex-col w-full"
                  className="dropdown"
                  options={timeFIlterOption}
                  value={""}
                  placeholder="Highest Prices"
                  placeholderClassName="menu absolute -ml-4 pl-4 top-3 flex flex-col w-full"
                /> */}
              <Image
                src={"/icons/download.svg"}
                alt=""
                className="absolute top-0"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
              YIELDS
            </p>
            <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-white border-solid rounded-lg cursor-pointer text-grey-400 w-44">
              {/* <ReactDropdown
                  menuClassName="menu absolute -ml-4 pl-4 py-1 top-full bg-white flex flex-col w-full"
                  className="dropdown"
                  options={timeFIlterOption}
                  value={""}
                  placeholder="Highest Yields"
                  placeholderClassName="menu absolute -ml-4 pl-4 top-3 flex flex-col w-full"
                /> */}
              <Image
                src={"/icons/download.svg"}
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
            <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-white border-solid rounded-lg cursor-pointer text-grey-400 w-44">
              {/* <ReactDropdown
                  menuClassName="menu absolute -ml-4 pl-4 py-1 top-full bg-white flex flex-col w-full"
                  className="dropdown"
                  options={timeFIlterOption}
                  value={""}
                  placeholder="Epic"
                  placeholderClassName="menu absolute -ml-4 pl-4 top-3 flex flex-col w-full"
                /> */}
              <Image
                src={"/icons/download.svg"}
                alt=""
                className="absolute top-0"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div
            className=""
            style={{
              flex: " 0 0 calc(25% - 32px)",
              maxWidth: "calc(25% - 32px)",
              margin: "32px 16px 0",
            }}
          >
            <div>
              <div className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
                PRICE RANGE
              </div>
              <PrettoSlider
                onChange={(value, number) => {
                  setBreadCount(Number(number));
                }}
                value={breedCount}
                valueLabelDisplay="auto"
                aria-label="slider"
                step={1}
                defaultValue={10}
                min={1}
                max={100}
              />
              <div className="flex justify-between text-xs">
                <div className="font-semibold">0.01 ETH</div>
                <div className="font-semibold">10 ETH</div>
              </div>
            </div>
          </div>
          {/* <div
              className=""
              style={{
                flex: ' 0 0 calc(25% - 32px)',
                maxWidth: 'calc(25% - 32px)',
                margin: '32px 16px 0'
              }}
            >
              <div>
                <div className="mb-4 text-xs font-bold text-gray-400 uppercase">
                  Age
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between w-full h-12 pl-4 pr-1 text-sm font-semibold text-white border border-gray-600 border-solid rounded-lg cursor-pointer w-44">
                    Highest Yields
                    <RiArrowDownCircleLine fill='gray' style={{ fontSize: 25, color: 'red' }} />
                    <input
                      type={'number'}
                      onChange={(e) => {
                        setAge(parseInt(e.target.value));
                      }}
                      placeholder="Age"
                      className="w-full h-12 text-white bg-transparent border-solid border-none"
                    ></input>
                  </div>
                </div>
              </div>
            </div> */}
          {/* <div
              className=""
              style={{
                flex: ' 0 0 calc(25% - 32px)',
                maxWidth: 'calc(25% - 32px)',
                margin: '32px 16px 0'
              }}
            >
              <div>
                <div className="mb-4 text-xs font-bold text-gray-400 uppercase">
                  Rarity
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between w-full h-12 pl-4 pr-1 text-sm font-semibold text-white border border-gray-600 border-solid rounded-lg cursor-pointer w-44">
                    <ReactDropdown
                      menuClassName="menu absolute top-full"
                      className="dropdown"
                      options={options}
                      value={''}
                      placeholder="Select an option"
                    />
                    <RiArrowDownCircleLine values={"dfghj"} fill='gray' style={{ fontSize: 25, color: 'red' }} />
                  </div>
                </div>
              </div>
            </div> */}

          {/* <div
              className=""
              style={{
                flex: ' 0 0 calc(25% - 32px)',
                maxWidth: 'calc(25% - 32px)',
                margin: '32px 16px 0'
              }}
            >
              <div>
                <div className="mb-2 text-xs font-bold text-gray-400 uppercase">
                  Breed Range
                </div>
                <PrettoSlider
                  onChange={(value, number) => {
                    setBreedRange(number);
                  }}
                  value={breedRange}
                  valueLabelDisplay="auto"
                  aria-label="slider"
                  step={1}
                  defaultValue={2}
                  min={0}
                  max={9}
                />
                <div className="flex justify-between text-xs">
                  <div className="font-semibold">0</div>
                  <div className="font-semibold">9</div>
                </div>
              </div>
            </div> */}
          {/* <div
              className=""
              style={{
                flex: ' 0 0 calc(25% - 32px)',
                maxWidth: 'calc(25% - 32px)',
                margin: '32px 16px 0'
              }}
            >
              <div>
                <div className="mb-2 text-xs font-bold text-gray-400 uppercase">
                  Price Range
                </div>
                <PrettoSlider
                  onChange={(value, number) => {
                    setPriceRange(Number(number));
                  }}
                  value={priceRange}
                  valueLabelDisplay="auto"
                  aria-label="slider"
                  step={0.01}
                  defaultValue={2}
                  min={0.01}
                  max={10}
                />
                <div className="flex justify-between text-xs">
                  <div className="font-semibold">0.01 ETH</div>
                  <div className="font-semibold">10 ETH</div>
                </div>
              </div>
            </div> */}
        </div>
      </div>

      {/* Data */}
      <div>
        {category === 0 && (
          <div className="flex flex-wrap justify-center mt-8 -mx-4">
            {allAuctions.length > 0 ? (
              allAuctions.map((datum: Auction, index) => {
                return (
                  <div key={index} className="w-full p-2 md:w-1/2 xl:w-1/4">
                    <MarketItem
                      datum={datum}
                      applyMaxWidth={false}
                      placeBid={() => (setActiveItem(datum), console.log(""))}
                    />
                  </div>
                );
              })
            ) : (
              <div className="w-full py-16 text-center">No auctions</div>
            )}
          </div>
        )}

        {category === 1 && (
          <div className="flex flex-wrap justify-center mt-8 -mx-4">
            {allAuctions.length > 0 ? (
              allAuctions
                .filter((auction) => auction.kind === 0)
                .map((datum, index) => {
                  return (
                    <div key={index} className="w-full p-2 md:w-1/2 xl:w-1/4">
                      <MarketItem
                        datum={datum}
                        applyMaxWidth={false}
                        placeBid={() => (setActiveItem(datum), console.log(""))}
                      />
                    </div>
                  );
                })
            ) : (
              <div className="w-full py-16 text-center">No auctions</div>
            )}
          </div>
        )}

        {category === 2 && (
          <div className="flex flex-wrap justify-center mt-8 -mx-4">
            {allAuctions.length > 0 ? (
              allAuctions
                .filter((auction) => auction.kind === 1)
                .map((datum, index) => {
                  return (
                    <div key={index} className="w-full p-2 md:w-1/2 xl:w-1/4">
                      <MarketItem
                        datum={datum}
                        applyMaxWidth={false}
                        placeBid={() => (setActiveItem(datum), console.log(""))}
                      />
                    </div>
                  );
                })
            ) : (
              <div className="w-full py-16 text-center">No auctions</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlacePage;
