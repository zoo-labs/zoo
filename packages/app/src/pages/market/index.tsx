import { numberWithCommas } from "functions";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { AppState } from "state";
import { useBuyZoo } from "state/zoo/hooks";
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
import { useActiveWeb3React } from "../../hooks";
import { useMoralis } from "react-moralis";

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

const Test = () => {
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
  const getAvailableEggs = useGetAvailableEggs()

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
  const fetchNFTs = useFetchMyNFTs();
  const { account } = useActiveWeb3React();

  const { availableEggs, loading } = useSelector((state: any) => state.zoo)

  const {
    myEggsCount: eggsCount,
    myAnimalsCount: animalsCount,
    myBreedsCount: breedsCount,
    myNfts: myNFTs,
  } = useSelector((state: any) => state.zoo);
  const { authenticate, isAuthenticated, logout } = useMoralis();

  const login = useCallback(async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [authenticate, isAuthenticated]);

  useEffect(() => {
    getAvailableEggs()
  }, [getAvailableEggs])

  console.log('MY NFTSSSS', availableEggs)

  return (
    <div className="px-6 pt-16 pb-16 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
      <div className="flex flex-col items-center py-12 h-[50vh] bg-[url(/img/plant.png)] bg-contain bg-right-bottom bg-no-repeat">
        <h1 className="text-5xl mb-4">
          The <span className="text-green">ZOO</span> Market
        </h1>
        <p>Buy, list, and bid on NFT Eggs and Animals.</p>
      </div>
      {/* Eggs */}
      <div className="py-12">
        <div>
          <h2 className="text-3xl lg:text-4xl text-white font-bold text-center">
            Eggs
          </h2>
        </div>
        <div className="flex justify-center items-center">
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
        </div>
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
                    index !== 3 && "border-r border-blue whitespace-nowrap"
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
      </div>

      {/* Data */}
      <div>
        <div className="flex flex-wrap mt-8 -mx-4">
          {markets.length > 0 ? (
            markets.map((datum, index) => {
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
            <div>None</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
