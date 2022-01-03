import { numberWithCommas } from 'functions';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { useBuyZoo } from 'state/zoo/hooks';
import MarketItem from '../../components/market/marketItem';
import markets from '../../components/market/marketitem.json';
import { wait } from 'functions';
import { withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
import CloseIcon from 'components/CloseIcon';
import ReactDropdown from 'react-dropdown';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: 'rgb(140, 79, 248)',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
    '& *': {
      background: 'white',
      color: 'rgb(140, 79, 248)'
    }
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgb(140, 79, 248)'
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);
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

  const myBids = [...Object.values(allData)]
    .flat(1)
    .sort((a: any, b: any) => a.tokenID - b.tokenID)
    .slice(0, 3);

  useEffect(() => {
    console.log(
      'hjhjh',
      [...Object.values(allData)]
        .flat(1)
        .sort((a: any, b: any) => a.tokenID - b.tokenID)
    );
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

  const buyZoo = useBuyZoo();
  return (
    <div className="md:px-[98px] md:py-[70px]">
      <div className="flex items-end justify-between text-white w-100">
        <div>
          <p className="mb-2 text-xl font-bold ">Wallet Balance</p>
          <div className="flex items-center">
            <p className="text-xl font-bold ">
              {numberWithCommas(zooBalance.toFixed(2))} ZOO
            </p>
            <div className="relative inline-flex ml-4 rounded-md shadow-sm">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => buyZoo()}
              >
                <span
                  className={`flex items-center justify-center ml-2 py-2 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis font-bold  rounded-xl text-high-emphesis bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary w-[120px] min-h-[36px] mb-[-2px] ${
                    zooBalance === 0 && 'gradient-border'
                  }`}
                  style={{
                    background:
                      'linear-gradient(180deg, #DF3EBB 0%, #199BC3 100%)'
                  }}
                >
                  {/* {wait ? 'Processing' : 'Get ZOO'} */}
                </span>
              </div>
              {zooBalance === 0 && (
                <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
                  <span className="absolute inline-flex w-full h-full bg-purple-400 rounded-full opacity-75 animate-ping"></span>
                  <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-xl px-16 mx-auto">
        <h3 className="mb-16 text-4xl font-semibold">Discover</h3>
        <div className="relative justify-between hidden mb-8 lg:flex">
          <div className="flex items-center justify-between h-12 pl-4 pr-1 text-sm rounded-lg cursor-pointer w-44"></div>
          {/* <div className='flex items-center justify-between h-12 pl-4 pr-1 text-sm border border-gray-600 border-solid rounded-lg cursor-pointer w-44'>
              Recently added
              <RiArrowDownCircleLine fill='gray' style={{ fontSize: 25, color: 'red' }} />
            </div> */}
          <div
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
          </div>
          <div className="hidden">show on tablet viewport</div>
          <button
            onClick={() => setFiltering(!filtering)}
            className="relative flex items-center justify-center pl-6 font-bold leading-3 rounded-full bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary"
          >
            Filter
            <div className="flex items-center justify-center pr-2 w-14">
              {/* {!filtering ? <Filter /> : <CloseIcon fill="white" />} */}
            </div>
          </button>
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
                      style={{ color: '#fff' }}
                      placeholder="Age"
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
                      menuClassName="menu"
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
        <div className="mt-8 text-center">
          <button
            onClick={() => loadMore()}
            className="inline-flex items-center h-12 px-6 font-semibold text-white border border-solid rounded-full shadow-lg cursor-pointer hover:bg-primary hover:border-0"
            style={{ borderColor: 'gray' }}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
export default Market;
