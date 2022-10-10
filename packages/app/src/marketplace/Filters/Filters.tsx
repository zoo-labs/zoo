import React, { useEffect, useState } from "react";
import Image from "next/image";
import MarketItem from "components/market/marketItem";
import markets from "data/market.json";
import { Filter } from "react-feather";
import { Slider, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import { makeStyles } from '@mui/styles'
import { useTheme } from "@mui/material/styles";
import { useGetAvailableEggs } from "state/zoo/hooks";
import dynamic from "next/dynamic";
import { accountEllipsis } from "functions/lux";
import { FaMoneyBillWave } from "react-icons/fa";
import { getEmoji } from "functions/zoo";
import { abbreviateNumber } from "functions/abbreviateNumbers";

const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

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

interface FilterProps {}

const TestArr = [
  {
    TokenStandard: "ERC-721",
    CurrentPrice: "102",
    Blockchain: "BNB",
    Name: "Token#1",
    TokenId: 0,
    Age: 200,
    Yields: 10421210,
    Rarity: "Legendary",
    type: "Tiger",
    owner: "8xbcs0xb82013nx9z",
    Owners: 2,
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png",
    usdz: "/models/Tiger/TIGER_ADULT.usdz",
    glb: "/models/Tiger/TIGER_ADULT.glb",
    category: "origin",
    transactionHistory: [
      {
        Event: "Minted",
        Price: "",
        FromAddress: "Null",
        ToAddress: "FirstOwner",
        Date: "2022/4/20",
      },
      {
        Event: "Transfer",
        Price: "",
        FromAddress: "FristOwner",
        ToAddress: "SecondOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Sale",
        Price: "20 BNB",
        FromAddress: "FristOwner",
        ToAddress: "SecondOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Transfer",
        Price: "",
        FromAddress: "SecondOwner",
        ToAddress: "ThirdOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Sale",
        Price: "50 BNB",
        FromAddress: "SecondOwner",
        ToAddress: "ThirdOwner",
        Date: "2022/6/20",
      },
    ],
  },

  {
    TokenStandard: "ERC-721",
    CurrentPrice: "56",
    Blockchain: "BNB",
    Name: "Token#2",
    TokenId: 1,
    Age: 100,
    Yields: 1000,
    Rarity: "Epic",
    type: "Giraffe",
    owner: "8xbcs0xb82013nx9z",
    Owners: 2,
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332705/zoo/images/giraffe_caohec.png",
    usdz: "/models/Giraffe/GIRAFFE_ADULT.usdz",
    glb: "/models/Giraffe/GIRAFFE_ADULT.glb",
    category: "animals",
    transactionHistory: [
      {
        Event: "Minted",
        Price: "",
        FromAddress: "Null",
        ToAddress: "FirstOwner",
        Date: "2022/4/20",
      },
      {
        Event: "Transfer",
        Price: "",
        FromAddress: "FristOwner",
        ToAddress: "SecondOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Sale",
        Price: "15 BNB",
        FromAddress: "FristOwner",
        ToAddress: "SecondOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Transfer",
        Price: "",
        FromAddress: "SecondOwner",
        ToAddress: "ThirdOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Sale",
        Price: "34 BNB",
        FromAddress: "SecondOwner",
        ToAddress: "ThirdOwner",
        Date: "2022/6/20",
      },
    ],
  },

  {
    TokenStandard: "ERC-721",
    CurrentPrice: "46",
    Blockchain: "BNB",
    Name: "Token#3",
    TokenId: 2,
    Age: 1000,
    Yields: 100000,
    Rarity: "Rare",
    type: "Leopard",
    owner: "8xbcs0xb82013nx9z",
    Owners: 2,
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332847/zoo/images/clouded-leopard_piqix9.png",
    usdz: "/models/Leopard/LEOPARD_ADULT.usdz",
    glb: "/models/Leopard/LEOPARD_ADULT.glb",
    category: "animals",
    transactionHistory: [
      {
        Event: "Minted",
        Price: "",
        FromAddress: "Null",
        ToAddress: "FirstOwner",
        Date: "2022/4/20",
      },
      {
        Event: "Transfer",
        Price: "",
        FromAddress: "FristOwner",
        ToAddress: "SecondOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Sale",
        Price: "15 BNB",
        FromAddress: "FristOwner",
        ToAddress: "SecondOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Transfer",
        Price: "",
        FromAddress: "SecondOwner",
        ToAddress: "ThirdOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Sale",
        Price: "32 BNB",
        FromAddress: "SecondOwner",
        ToAddress: "ThirdOwner",
        Date: "2022/6/20",
      },
    ],
  },

  {
    TokenStandard: "ERC-721",
    CurrentPrice: "30",
    Blockchain: "BNB",
    Name: "Token#4",
    TokenId: 3,
    Age: 1000,
    Yields: 100000,
    Rarity: "Rare",
    type: "Rhino",
    owner: "8xbcs0xb82013nx9z",
    Owners: 2,
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png",
    usdz: "/models/Rhino/RHINO_ADULT.usdz",
    glb: "/models/Rhino/RHINO.glb",
    category: "eggs",
    transactionHistory: [
      {
        Event: "Minted",
        Price: "",
        FromAddress: "Null",
        ToAddress: "FirstOwner",
        Date: "2022/4/20",
      },
      {
        Event: "Transfer",
        Price: "",
        FromAddress: "FristOwner",
        ToAddress: "SecondOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Sale",
        Price: "15 BNB",
        FromAddress: "FristOwner",
        ToAddress: "SecondOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Transfer",
        Price: "",
        FromAddress: "SecondOwner",
        ToAddress: "ThirdOwner",
        Date: "2022/6/20",
      },
      {
        Event: "Sale",
        Price: "25 BNB",
        FromAddress: "SecondOwner",
        ToAddress: "ThirdOwner",
        Date: "2022/6/20",
      },
    ],
  },
];

const Filters: React.FC<FilterProps> = ({}) => {
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

  const [filterPrice, setFilterPrice] = React.useState("low");
  const [filterRarity, setFilterRarity] = React.useState("common");
  const [filterYield, setFilterYield] = React.useState("high");
  const theme = useTheme();
  const not_desktop = useMediaQuery(theme.breakpoints.down("lg"));

  const [filterData, setFilterData] = useState<any>([]);

  const [age, setAge] = useState(0);
  const [breedCount, setBreadCount] = useState(0);
  const [category, setCategory] = useState(0);
  const [filtering, setFiltering] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  // const allAnimls = Object.values(animalsState)
  // const allEggs = Object.values(eggsState)
  const allAnimls = [];
  const allEggs = [];

  const getAvailableEggs = useGetAvailableEggs();
  const { availableEggs } = useSelector((state: any) => state.zoo);

  console.log("all_availableEggs", availableEggs);

  // const useStyles = makeStyles({
  //   select: {
  //     '&:after': {
  //       borderBottomColor: 'darkred',
  //     },
  //     '& .MuiSvgIcon-root': {
  //       color: 'white',
  //     },
  //   },
  // })
  // const classes = useStyles()

  const allData = {
    0: allEggs,
    1: allAnimls,
  };

  const handlePriceChange = (event: SelectChangeEvent) => {
    setFilterPrice(event.target.value as string);
  };
  const handlePriceSort = (by: string) => {
    if (by === "low") {
      setFilterData(TestArr.filter((d) => parseInt(d.CurrentPrice) < 100));
    }
    if (by === "high") {
      setFilterData(TestArr.filter((d) => parseInt(d.CurrentPrice) > 100));
    }
  };

  const handleRarityChange = (event: SelectChangeEvent) => {
    setFilterRarity(event.target.value as string);
  };
  const handleRaritySort = (by: string) => {
    if (by === "rare") {
      setFilterData(TestArr.filter((d) => d.Rarity.toLowerCase() === by));
    }

    if (by === "legendary") {
      setFilterData(TestArr.filter((d) => d.Rarity.toLowerCase() === by));
    }

    if (by === "epic") {
      setFilterData(TestArr.filter((d) => d.Rarity.toLowerCase() === by));
    }
  };

  const handleYieldChange = (event: SelectChangeEvent) => {
    setFilterYield(event.target.value as string);
  };
  const handleYieldSort = (by: string) => {
    if (by === "low") {
      setFilterData(TestArr.filter((d) => d.Yields < 98000));
    }
    if (by === "high") {
      setFilterData(TestArr.filter((d) => d.Yields > 99000));
    }
  };

  useEffect(() => {
    setData(
      [...Object.values(allData)]
        .flat(1)
        .sort((a: any, b: any) => a.tokenID - b.tokenID)
        .slice(0, 8 * page)
    );
    setHotData([allData[1]].flat(1).slice(0, 8));
  }, []);

  useEffect(() => {
    getAvailableEggs();
  }, [getAvailableEggs]);

  const router = useRouter();

  const onClickTokenType = (name: string) => {
    console.log("name", name);
    router.push(`${router.pathname}?name=${name}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    setFilterData(TestArr);
  }, []);

  return (
    <div className="block w-full">
      <div className="pt-16 pb-16 lg:px-6 md:flex-col md:items-center lg:mx-auto lg:max-w-7xl">
        <div className="w-full mx-auto mt-20">
          {/* Tab Navigation */}
          <div className="relative justify-between mb-8 space-y-4 hiden lg:flex lg:space-y-0">
            <div className="flex items-center justify-between w-full h-12 pr-1 text-sm rounded-lg cursor-pointer lg:pl-4">
              <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold border border-white border-solid rounded-lg cursor-pointer text-grey-400 lg:w-44">
                Recently Added
              </div>
            </div>
            <div
              className="w-full rounded-xl"
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
                        } else if (index === 2) {
                          console.log("is origin filter");
                        } else {
                          setData([]);
                          setFetching(true);
                          setTimeout(() => {
                            setData(
                              [allData[index - 1]]
                                .flat(1)
                                .sort((a, b) => a.tokenID - b.tokenID)
                                .slice(0, 8)
                            );
                          }, 1500);
                        }
                      }}
                      className={`text-white text-[11px] lg:text-sm font-bold py-3.5 lg:py-1 px-4 cursor-pointer w-full h-full flex items-center justify-center ${
                        index !== 3 && "border-r border-blue"
                      } ${
                        index === 0
                          ? "rounded-l-xl"
                          : index === 2 && "rounded-r-xl"
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
            <div className="hidden">show on tablet viewport</div>
            <div className="flex items-end justify-end w-full">
              <button
                onClick={() => setFiltering(!filtering)}
                className="relative flex items-center justify-center w-full px-6 py-3 font-bold leading-3 text-center border-2 rounded-xl text-grey-400 lg:w-auto"
              >
                Filter
                <span className="flex items-center justify-center pl-2">
                  {!filtering ? (
                    <Filter color="#878787" />
                  ) : (
                    <span className="text-[#878787] py-2">X</span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div>
          {/* Search + Filter */}
          <div
            className={`${
              !filtering ? "hidden" : "block"
            } border-t border-solid py-8`}
            style={{ borderColor: "rgb(107, 114, 128)" }}
          >
            <div className="flex flex-col flex-wrap space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <div className="w-full md:w-auto">
                <p className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
                  PRICE
                </p>
                <div className="">
                  <FormControl style={{ color: "white", width: "100%" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filterPrice}
                      onChange={(e) => {
                        handlePriceChange(e);
                        handlePriceSort(e.target.value);
                      }}
                      className={`border border-white outline-none focus:outline-none text-white`}
                      sx={{
                        "&:after": {
                          borderBottomColor: "darkred",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "white",
                        },
                      }}
                      style={{ color: "white", outline: "none" }}
                    >
                      <MenuItem value={"low"}>Low</MenuItem>
                      <MenuItem value={"high"}>High</MenuItem>
                    </Select>
                  </FormControl>
                  {/* HIGHEST PRICE{' '}
                  <Image src={'/icons/download.svg'} alt="" className="absolute top-0" width={16} height={16} /> */}
                </div>
              </div>
              <div className="w-full md:w-auto">
                <p className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
                  YIELDS
                </p>
                <div className="">
                  <FormControl style={{ color: "white", width: "100%" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filterYield}
                      onChange={(e) => {
                        handleYieldChange(e);
                        handleYieldSort(e.target.value);
                      }}
                      className={`border border-white outline-none focus:outline-none text-white`}
                      style={{ color: "white", outline: "none" }}
                      sx={{
                        "&:after": {
                          borderBottomColor: "darkred",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "white",
                        },
                      }}
                    >
                      <MenuItem value={"high"}>Highest Yield</MenuItem>
                      <MenuItem value={"low"}>Lowest Yield</MenuItem>
                    </Select>
                  </FormControl>
                  {/* HIGHEST YIELD{' '}
                  <Image src={'/icons/download.svg'} alt="" className="absolute top-0" width={16} height={16} /> */}
                </div>
              </div>
              <div className="w-full md:w-auto">
                <p className="mb-2 text-sm font-normal uppercase md:text-lg text-grey-400">
                  RARITY
                </p>
                <div className="">
                  <FormControl style={{ color: "white", width: "100%" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filterRarity}
                      onChange={(e) => {
                        handleRarityChange(e);
                        handleRaritySort(e.target.value);
                      }}
                      className={`border border-white outline-none focus:outline-none text-white`}
                      style={{ color: "white", outline: "none" }}
                      sx={{
                        "&:after": {
                          borderBottomColor: "darkred",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "white",
                        },
                      }}
                    >
                      <MenuItem value={"legendary"}>Legendary</MenuItem>
                      <MenuItem value={"rare"}>Rare</MenuItem>
                      <MenuItem value={"super rare"}>Super Rare</MenuItem>
                      <MenuItem value={"common"}>Common</MenuItem>
                      <MenuItem value={"uncommon"}>Uncommon</MenuItem>
                      <MenuItem value={"epic"}>Epic</MenuItem>
                    </Select>
                  </FormControl>
                  {/* EPIC <Image src={'/icons/download.svg'} alt="" className="absolute top-0" width={16} height={16} /> */}
                </div>
              </div>

              <div
                className="w-full"
                style={{
                  flex: not_desktop ? 1 : "0 0 calc(25% - 32px)",
                  maxWidth: not_desktop ? "100%" : "calc(25% - 32px)",
                  margin: "32px 16px 0",
                }}
              >
                <div className="w-[70%] lg:w-[100%]">
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
                    style={{ width: "100%" }}
                  />
                  <div className="flex justify-between text-xs">
                    <div className="font-semibold">0.01 ETH</div>
                    <div className="font-semibold">10 ETH</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-16 -mx-4">
            {category === 1 ? (
              availableEggs.map((item) => {
                return (
                  <div
                    className="p-2 w-ull m:w-1/2 l:w-1/4"
                    key={item.id}
                    onClick={() => router.push(`/marketplace/egg/${item.id}`)}
                  >
                    <div className="flex flex-col ">
                      <div className="relative overflow-hidden border border-gray-500 rounded parent">
                        <div className="h-[350px] w-[300px]">
                          {/* <ModelViewer usdz={item.usdz} glb={item.glb}></ModelViewer> */}
                          <img src="/img/egg.png" alt="" />
                        </div>
                        <div className="absolute top-0 left-0 invisible w-full h-full transition-all duration-300 rounded opacity-0 hover:visible hover:opacity-100">
                          <div className="absolute px-2 py-1 text-xs font-bold uppercase rounded top-6 left-3 bg-primary "></div>

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
            ) : filterData.length > 0 ? (
              filterData.map((datum, index) => {
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
    </div>
  );
};
export default Filters;
