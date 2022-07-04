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
import { useFetchMyNFTs, useGetAvailableEggs } from "state/zoo/hooks";
import { useActiveWeb3React, useDrop } from "../../hooks";
import { useMoralis } from "react-moralis";
import { abbreviateNumber } from "functions/abbreviateNumbers";
import { accountEllipsis } from "functions/lux";
import { FaMoneyBillWave } from "react-icons/fa";

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
  const [bidView, setBidView] = useState(0);
  const [activeBid, setActiveBid] = useState({});
  const [priceRange, setPriceRange] = useState<any>(0.0);
  const [breedRange, setBreedRange] = useState<any>(0.0);
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

  console.log("MY NFTSSSS", availableEggs);
  console.log("MY Auctionss", allAuctions);

  return (
    <div className="px-6 pt-16 pb-16 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
      <div className="flex flex-col items-center h-[20vh] bg-[url(/img/plant.png)] bg-contain bg-right-bottom bg-no-repeat">
        <h1 className="mb-4 text-5xl">
          The <span className="text-green">ZOO</span> Market
        </h1>
        <p>Buy, list, and bid on NFT Eggs and Animals.</p>
      </div>
      {/* Eggs */}
      <div className="">
        <div>
          <h2 className="text-3xl font-bold text-center text-white lg:text-4xl">
            Buy Eggs
          </h2>
        </div>
        <div className="flex flex-wrap justify-center mt-16 -mx-4">
          {availableEggs.length ? (
            availableEggs?.map((item) => {
              return (
                <div
                  className="p-2 w-ull m:w-1/2 l:w-1/4"
                  key={item.id}
                  onClick={() => router.push(`/market/egg/${item.id}`)}
                >
                  <div className="flex flex-col ">
                    <div className="relative overflow-hidden rounded bg-nft-gradient parent">
                      <div className="h-[350px] w-[300px]">
                        {/* <ModelViewer usdz={item.usdz} glb={item.glb}></ModelViewer> */}
                        <img src="/img/egg.png" alt="" />
                      </div>
                      <div className="absolute top-0 left-0 invisible w-full h-full transition-all duration-300 rounded opacity-0 hover:visible hover:opacity-100">
                        <div className="absolute px-2 py-1 text-xs font-bold uppercase rounded top-6 left-3 bg-primary ">
                          {/* {item.bloodline || (item.basic ? "BASIC" : "HYBRID")} */}
                        </div>

                        <a className="absolute inline-flex items-center justify-center h-10 px-4 text-sm transition-all duration-300 transform rounded-full cursor-pointer left-1/2 bottom-6 min-w-max bg-primary -translate-x-2/4">
                          <span>Place a bid</span>
                        </a>
                      </div>
                    </div>

                    <a className="flex flex-col flex-grow py-4 no-underline cursor-pointer">
                      <div className="flex flex-col flex-grow">
                        <div className="flex mb-4 ">
                          <div className="mt-1 mr-auto font-semibold">
                            {item.name || "Egg"}{" "}
                            <span className="text-xs text-gray-500">
                              (#{item.id || ""})
                            </span>
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
                        <div className="flex ">
                          <div className="flex mt-1 mr-auto text-xs font-semibold text-gray-500">
                            {/* <div className="w-4 h-4 mr-1 rounded-full bg-gradient-to-b from-btn1 to-btn2"></div> */}
                            <span
                              className="w-4 h-4 mr-1 rounded-full"
                              style={{
                                background:
                                  "linear-gradient(180deg, #2517FF -61.88%, #15F195 131.19%)",
                              }}
                            ></span>
                            {accountEllipsis(item.owner || "")}
                          </div>
                          {/* <div className="flex items-center justify-center flex-shrink-0 ml-2 text-xs font-bold uppercase rounded-sm">
                              3 days Left
                            </div> */}
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
                          {item.supply}
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
        {/* <div className="flex items-center justify-center">
          <div className="relative w-[150px] h-[200px]">
            <Image
              src="/img/egg.png"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
          <div className="relative w-[150px] h-[200px]">
            <Image
              src="/img/egg1.png"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
          <div className="relative w-[150px] h-[200px]">
            <Image
              src="/img/egg2.png"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
        </div> */}
      </div>
      {/* Tab Navbar */}
      <div className="relative justify-center hidden mb-8 lg:flex">
        <div
          className="rounded-xl"
          style={{
            background: "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
            padding: 2,
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-black rounded-xl">
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
                  className={`text-white text-sm font-bold py-1 px-4 cursor-pointer w-full h-full flex items-center justify-center ${
                    index !== 2 && "border-r border-blue whitespace-nowrap"
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
      </div>

      {/* Data */}
      <div>
        {category === 0 && (
          <div className="flex flex-wrap mt-8 -mx-4">
            {allAuctions.length > 0 ? (
              allAuctions.map((datum, index) => {
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
          <div className="flex flex-wrap mt-8 -mx-4">
            {allAuctions.length > 0 ? (
              allAuctions.map((datum, index) => {
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
          <div className="flex flex-wrap mt-8 -mx-4">
            {allAuctions.length > 0 ? (
              allAuctions.map((datum, index) => {
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
