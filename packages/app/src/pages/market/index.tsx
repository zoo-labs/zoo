import { numberWithCommas } from 'functions';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { useBuyZoo } from 'state/zoo/hooks';
import MarketItem from '../../components/market/marketItem';
import markets from '../../components/market/marketitem.json';
import { wait } from 'functions';
import { withStyles } from '@mui/styles';
import CloseIcon from 'components/CloseIcon';
import ReactDropdown from 'react-dropdown';
import { Filter } from 'react-feather';
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useModal } from 'react-morphing-modal';
import { useRouter } from 'next/router';
import Wallet from './wallet';
import { useTokenTypes } from 'zoo/state';
const PrettoSlider = styled(Slider)({
  color: '#8c4ff8',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#8c4ff8',
    border: '2px solid #fff',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#8c4ff8',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
});

// const PrettoSlider = withStyles({
//   root: {
//     color: '#52af77',
//     height: 8
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: 'rgb(140, 79, 248)',
//     border: '2px solid currentColor',
//     marginTop: -8,
//     marginLeft: -12,
//     '&:focus, &:hover, &$active': {
//       boxShadow: 'inherit'
//     }
//   },
//   active: {},
//   valueLabel: {
//     left: 'calc(-50% + 4px)',
//     '& *': {
//       background: 'white',
//       color: 'rgb(140, 79, 248)'
//     }
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'rgb(140, 79, 248)'
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4
//   }
// })(Slider);
interface MarketProps {}

const Market: React.FC<MarketProps> = ({}) => {
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>(
    (state) => state.zoo.zooBalance
  );
  const animalsState = useSelector<AppState, AppState['zoo']['animals']>(
    (state) => state.zoo.animals
  );
  const eggsState = useSelector<AppState, AppState['zoo']['eggs']>(
    (state) => state.zoo.eggs
  );
  // const toggleBidModal = useBidModalToggle()
  // const toggleAssetModal = useAssetModalToggle()
  const myAuctions = [0, 1];
  const options = [
    'Common 🌕',
    'Uncommon 🌓',
    'Rare 🔥',
    'Super Rare ☄️',
    'Epic 🌟'
  ];
  const timeFIlterOption = [
    'Recently added',
    'Last 24 hours',
    'Last 7 days',
    'Last 30 days',
    'Last 90 days'
  ];
  const [fetching, setFetching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [bidView, setBidView] = useState(0);
  const [activeBid, setActiveBid] = useState({});
  const [priceRange, setPriceRange] = useState<any>(0.0);
  const [breedRange, setBreedRange] = useState<any>(0.0);
  const [activeItem, setActiveItem] = useState({});
  const [hotData, setHotData] = useState([]);

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
    1: allAnimls
  };
  const { tokenTypes } = useTokenTypes();
  console.log('tokenTypes', tokenTypes);
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
      console.log('is hybrid filter');
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
    background: 'black'
  });

  const router = useRouter();

  const onClickTokenType = (name: string) => {
    console.log('name', name);
    router.push(`${router.pathname}?name=${name}`, undefined, {
      shallow: true
    });
  };

  const buyZoo = useBuyZoo();
  return (
    <div className="pt-16 pb-16 px-6 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
      <div className="flex items-end justify-between text-white w-100">
        <Wallet />
      </div>
      <div className="w-full max-w-screen-xl mx-auto mt-20">
        <h3 className="mb-16 text-4xl font-semibold">Discover</h3>
        <div className="relative justify-between hidden mb-8 lg:flex">
          {/* <div className="flex items-center justify-between h-12 pl-4 pr-1 text-sm rounded-lg cursor-pointer w-full"></div> */}
          <div className="flex items-center justify-between h-12 pl-4 pr-1 text-sm rounded-lg cursor-pointer w-full">
            <div className="relative flex items-center justify-between w-full h-12 pl-4 pr-4 text-sm font-semibold text-grey-400 border border-white border-solid rounded-lg cursor-pointer w-44">
              <ReactDropdown
                menuClassName="menu absolute top-full"
                className="dropdown"
                options={timeFIlterOption}
                value={''}
                placeholder="Recently added"
              />
              <Image
                src={'/icons/download.svg'}
                alt=""
                className="absolute top-0"
                width={20}
                height={20}
              />
              {/* <RiArrowDownCircleLine values={"dfghj"} fill='gray' style={{ fontSize: 25, color: 'red' }} /> */}
            </div>
          </div>
          {/* <div className='flex items-center justify-between h-12 pl-4 pr-1 text-sm border border-gray-600 border-solid rounded-lg cursor-pointer w-44'>
              Recently added
              <RiArrowDownCircleLine fill='gray' style={{ fontSize: 25, color: 'red' }} />
            </div> */}
          <div
            className="rounded-xl w-full"
            style={{
              background: 'linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)',
              padding: 2
            }}
          >
            <div className="flex items-center justify-center bg-black rounded-xl w-full h-full">
              {['All Items', 'Eggs', 'Animals', 'Hybrid'].map(
                (value, index) => {
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
                      className={`text-white text-sm font-bold py-1 px-4 cursor-pointer w-full h-full flex items-center justify-center ${
                        index !== 3 && 'border-r border-blue'
                      } ${
                        index === 0
                          ? 'rounded-l-xl'
                          : index === 3 && 'rounded-r-xl'
                      }`}
                      style={{
                        background: active
                          ? 'linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)'
                          : 'transparent'
                      }}
                      key={index}
                    >
                      {value}
                    </a>
                  );
                }
              )}
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
          <div className="w-full flex items-end justify-end">
            <button
              onClick={() => setFiltering(!filtering)}
              className="relative flex items-center justify-center text-center px-6 py-3 font-bold leading-3 rounded-xl border-2 text-grey-400"
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
          {/* <button
            onClick={() => setFiltering(!filtering)}
            className="relative flex items-center justify-center pl-6 font-bold leading-3 rounded-full bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary "
            style={{
              background: 'linear-gradient(180deg, #DF3EBB 0%, #199BC3 100%)'
            }}
          >
            Filter
            <div className="flex items-center justify-center pr-2 w-14">
              {!filtering ? <Filter /> : <CloseIcon fill="white" />}
            </div>
          </button> */}
        </div>

        <div
          className={`${
            !filtering ? 'hidden' : 'block'
          } border-t border-solid  py-8`}
          style={{ borderColor: 'rgb(107, 114, 128)' }}
        >
          <div className="flex flex-wrap -mx-4 -mt-8 ">
            <div
              className=""
              style={{
                flex: ' 0 0 calc(25% - 32px)',
                maxWidth: 'calc(25% - 32px)',
                margin: '32px 16px 0'
              }}
            >
              <div>
                <div className="mb-2 text-xs font-bold text-gray-400 uppercase">
                  Breed Count
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
            <div
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
                    {/* Highest Yields */}
                    {/* <RiArrowDownCircleLine fill='gray' style={{ fontSize: 25, color: 'red' }} /> */}
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
            </div>
            <div
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
                    {/* <RiArrowDownCircleLine values={"dfghj"} fill='gray' style={{ fontSize: 25, color: 'red' }} /> */}
                  </div>
                </div>
              </div>
            </div>
            ``
            <div
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
            </div>
            <div
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
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap mt-8 -mx-4">
            {data.length > 0 ? (
              data.map((datum, index) => {
                return (
                  <div key={index} className="w-full p-2 md:w-1/2 xl:w-1/4">
                    <MarketItem
                      datum={datum}
                      applyMaxWidth={false}
                      placeBid={() => (setActiveItem(datum), console.log(''))}
                    />
                  </div>
                );
              })
            ) : (
              <div>None</div>
            )}
          </div>
        </div>
        {/* <div className="mt-8 text-center">
          <button
            onClick={() => loadMore()}
            className="inline-flex items-center h-12 px-6 font-semibold text-white border border-solid rounded-full shadow-lg cursor-pointer hover:bg-primary hover:border-0"
            style={{ borderColor: 'gray' }}
          >
            Load More
          </button>
        </div> */}
      </div>
      {/* <AssetSaleModal modalProps={modalProps} openModal={openModal} /> */}
    </div>
  );
};
export default Market;
