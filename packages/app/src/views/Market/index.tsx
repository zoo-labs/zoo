import { CloseIcon, HeartIcon } from 'components'
import React, { useEffect, useRef, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { RiArrowDownCircleLine, RiFilter2Line, RiPlayMiniFill } from 'react-icons/ri'
import Slider from '@material-ui/core/Slider'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import DiscoverCard from 'components/Market/DiscoverCard'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { Splide, SplideSlide } from 'components/Splide'
import { ArrowLeft, ArrowRight, StopCircle } from 'react-feather'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { ImArrowRight, ImPlay } from 'react-icons/im'
import DoubleGlowShadow from 'components/DoubleGlowShadow'
import { wait } from 'functions'
import { Avatar } from '@material-ui/core'
import { GiPlayButton } from 'react-icons/gi'
import MyBid from 'components/Market/MyBid'
import MyAuction from 'components/Market/MyAuction'
import BidModal from 'components/modals/MarketModals/BidModal'
import { useBidModalToggle, useAssetModalToggle } from 'state/application/hooks'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Input } from '@mui/material'
import Dropdown from 'react-dropdown'
import AssetModal from 'components/modals/MarketModals/AssetModal'
import { color } from 'styled-system'
import './index.css'
interface IndexProps {}
const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: 'rgb(140, 79, 248)',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
    '& *': {
      background: 'white',
      color: 'rgb(140, 79, 248)',
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgb(140, 79, 248)',
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider)

const Index: React.FC<IndexProps> = ({}) => {
  const [category, setCategory] = useState(0)
  const [filtering, setFiltering] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [hotData, setHotData] = useState([])
  const [bidView, setBidView] = useState(0)
  const [activeBid, setActiveBid] = useState({})
  const [priceRange, setPriceRange] = useState<any>(0.0)
  const [breedRange, setBreedRange] = useState<any>(0.0)
  const [age, setAge] = useState(0)
  const [breedCount, setBreadCount] = useState(0)
  const [rarity, setRarity] = useState('')
  const [activeItem, setActiveItem] = useState({})

  const animalsState = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
  const eggsState = useSelector<AppState, AppState['zoo']['eggs']>((state) => state.zoo.eggs)
  const toggleBidModal = useBidModalToggle()
  const toggleAssetModal = useAssetModalToggle()
  const myAuctions = [0, 1]
  const options = ['Common 🌕', 'Uncommon 🌓', 'Rare 🔥', 'Super Rare ☄️', 'Epic 🌟']
  const swiperRef = useRef(null)
  const splideAuctionRef = useRef(null)
  const splideBidRef = useRef(null)
  const splideparentRef = useRef(null)
  const allAnimls = Object.values(animalsState)
  const allEggs = Object.values(eggsState)
  const allData = {
    0: allEggs,
    1: allAnimls,
  }

  const myBids = [...Object.values(allData)]
    .flat(1)
    .sort((a, b) => a.tokenID - b.tokenID)
    .slice(0, 3)

  useEffect(() => {
    console.log(
      'hjhjh',
      [...Object.values(allData)].flat(1).sort((a, b) => a.tokenID - b.tokenID),
    )
    setData(
      [...Object.values(allData)]
        .flat(1)
        .sort((a, b) => a.tokenID - b.tokenID)
        .slice(0, 8 * page),
    )
    setHotData([allData[1]].flat(1).slice(0, 8))
  }, [])
  const loadMore = () => {
    setPage(page + 1)

    setLoadingMore(true)
    if (category === 0) {
      setData(
        [...Object.values(allData)]
          .flat(1)
          .sort((a, b) => a.tokenID - b.tokenID)
          .slice(0, 8 * page),
      )
    } else if (category === 3) {
      console.log('is hybrid filter')
    } else {
      setData(
        [allData[category - 1]]
          .flat(1)
          .sort((a, b) => a.tokenID - b.tokenID)
          .slice(0, 8 * page),
      )
    }
    setLoadingMore(false)
  }
  splideparentRef.current &&
    splideparentRef.current.splide.on('moved', function (data, index) {
      console.log('index', index)
      if (index === 0) {
        setBidView(1)
      } else {
        setBidView(0)
      }
    })

  return (
    <main className='w-full h-full'>
      <div className='py-32 '>
        <div className='w-full md:px-8 lg:px-16 px-4'>
          <div className='mb-36 text-center mx-auto max-w-xl'>
            <DoubleGlowShadow>
              <div className='mb-2 text-gray-600 font-bold text-sm'>Buy, List, & Bid on Generation One Based Animals.</div>
              <h3 className='mb-6 text-4xl'>
                The new <span className='primary font-semibold text-3xl'>ZOO</span> Market
              </h3>
              <a
                href='#market-section'
                className='cursor-pointer font-semibold rounded-full shadow-lg text-white h-12 items-center border-solid border px-6 inline-flex hover:bg-primary hover:border-0'
                style={{ borderColor: 'gray' }}>
                Start your search
              </a>
            </DoubleGlowShadow>
          </div>
          <div className='relative -mt-6 '>
            <div className='flex mb-8 justify-between items-center px-2 lg:px-16 max-w-screen-xl mx-auto'>
              <h3 className=' font-bold text-xl md:text-2xl lg:text-4xl'>My {bidView === 0 ? 'Bids' : 'Auctions'}</h3>
              <div
                onClick={() => splideparentRef.current.splide.go('>')}
                style={{ borderWidth: 1 }}
                className='hoverdiv hover:border-white cursor-pointer border-gray-500 border-solid  shadow-xl w-30 md:w-40 lg:w-60 rounded  flex justify-between items-center '>
                <div className='flex flex-col px-4 py-2 '>
                  <h6 className='text-xs text-gray-500  font-semibold'>{bidView === 0 ? myAuctions.length : myBids.length}</h6>
                  <h6 className=' text-xl text-gray-500  font-bold'>{bidView === 0 ? 'Auctions' : 'Bids'}</h6>
                </div>
                <div className='pr-4 py-2'>
                  <ArrowRight color='gray' className='svg' />
                </div>
              </div>
            </div>

            <Splide
              ref={splideparentRef}
              options={{
                drag: false,
                width: '100%',
                fixedWidth: '100vw',
                arrows: false,
                pagination: false,
                rewind: true,
                breakpoints: {
                  640: {
                    fixedWidth: '100%',
                  },
                },
              }}>
              <SplideSlide>
                <Splide
                  ref={splideBidRef}
                  options={{
                    width: '100%',
                    fixedWidth: '100%',
                    arrows: false,
                    pagination: false,
                  }}>
                  {myBids.map((datum, index) => {
                    const showArrow = myBids.length > 0
                    const showLeftArrow = index > 0
                    const showRightArrow = index < myBids.length - 1

                    return (
                      <SplideSlide key={index} className='flex items-center flex-col'>
                        <MyBid
                          datum={datum}
                          showArrow={showArrow}
                          showLeftArrow={showLeftArrow}
                          showRightArrow={showRightArrow}
                          bidRef={splideBidRef}
                          placeBid={() => (setActiveItem(datum), toggleBidModal())}
                          viewItem={() => (setActiveItem(datum), toggleAssetModal())}
                        />
                      </SplideSlide>
                    )
                  })}
                </Splide>
              </SplideSlide>
              <SplideSlide>
                <Splide
                  ref={splideAuctionRef}
                  options={{
                    width: '100%',
                    fixedWidth: '100%',
                    arrows: false,
                    pagination: false,
                  }}>
                  {myAuctions.map((value, index) => {
                    const showArrow = myAuctions.length > 0
                    const showLeftArrow = index > 0
                    const showRightArrow = index < myAuctions.length - 1
                    return (
                      <SplideSlide key={index} className='flex items-center flex-col'>
                        <MyAuction showArrow={showArrow} showLeftArrow={showLeftArrow} showRightArrow={showRightArrow} bidRef={splideAuctionRef} />
                      </SplideSlide>
                    )
                  })}
                </Splide>
              </SplideSlide>
            </Splide>
          </div>
        </div>
      </div>
      {/* <div className='pb-16'>
        <div className='w-full px-16 max-w-screen-xl mx-auto'>
          <div className='relative'>
            <div className='flex mb-16 justify-between items-center'>
              <h3 className=' font-bold text-4xl'>Hot bid</h3>
              {hotData.length > 0 && (
                <div className='flex'>
                  <div
                    onClick={() => swiperRef.current.splide.go('<')}
                    style={{ borderColor: 'rgb(94, 98, 111)' }}
                    className='h-10 mr-2 w-10 rounded-full  border-solid hover:border-2 flex items-center justify-center cursor-pointer'>
                    <FaArrowLeft fill='rgb(94, 98, 111)' />
                  </div>
                  <div
                    onClick={() => swiperRef.current.splide.go('>')}
                    style={{ borderColor: 'rgb(94, 98, 111)' }}
                    className='h-10 ml-2 w-10 rounded-full  border-solid hover:border-2 flex items-center justify-center cursor-pointer'>
                    <FaArrowRight fill='rgb(94, 98, 111)' />
                  </div>
                </div>
              )}
            </div>
            <div className='-mx-4 flex flex-col'>
              {hotData.length > 0 ? (
                <Splide
                  ref={swiperRef}
                  options={{
                    perPage: 4,
                    perMove: 1,
                    fiexdWidth: 'calc(25% - 32px)',
                    arrows: false,
                    pagination: false,
                    gap: '1rem',
                    breakpoints: {
                      640: {
                        fixedWidth: '100%',
                        perPage: 1,
                      },
                      780: {
                        fixedWidth: 'calc(50% - 32px)',
                        perPage: 2,
                      },
                    },
                  }}>
                  {hotData.map((datum, index) => {
                    return (
                      <SplideSlide key={index}>
                        <div className='w-full h-full'>
                          <DiscoverCard datum={datum} applyMaxWidth={false} placeBid={() => (setActiveBid(datum), toggleBidModal())} />
                        </div>
                      </SplideSlide>
                    )
                  })}
                </Splide>
              ) : (
                <div className='self-center w-max h-full p-px rounded '>
                  <div className='flex h-full flex-col p-3 rounded bg-dark-900 justify-center items-center px-12'>
                    <h6 className='text-center'>No Eggs available in the market</h6>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}
      <div className='py-32 ' id='market-section'>
        <div className='w-full px-16 max-w-screen-xl mx-auto'>
          <h3 className='mb-16 text-4xl font-semibold'>Discover</h3>
          <div className='hidden lg:flex relative justify-between mb-8'>
            <div className='cursor-pointer text-sm w-44 h-12 pl-4 pr-1 items-center rounded-lg flex justify-between'></div>
            {/* <div className='cursor-pointer text-sm w-44 h-12 pl-4 pr-1 items-center rounded-lg border border-solid border-gray-600 flex justify-between'>
              Recently added
              <RiArrowDownCircleLine fill='gray' style={{ fontSize: 25, color: 'red' }} />
            </div> */}
            <div className='absolute transform left-2/4 flex justify-center -translate-x-2/4' style={{ top: 10 }}>
              {['All Items', 'Eggs', 'Animals', 'Hybrid'].map((value, index) => {
                const active = category === index
                return (
                  <a
                    onClick={() => {
                      setCategory(index)
                      setPage(1)
                      if (index === 0) {
                        setData(
                          [...Object.values(allData)]
                            .flat(1)
                            .sort((a, b) => a.tokenID - b.tokenID)
                            .slice(0, 8),
                        )
                      } else if (index === 3) {
                        console.log('is hybrid filter')
                      } else {
                        setData([])
                        setFetching(true)
                        wait(1500).then(() =>
                          setData(
                            [allData[index - 1]]
                              .flat(1)
                              .sort((a, b) => a.tokenID - b.tokenID)
                              .slice(0, 8),
                          ),
                        )
                      }
                    }}
                    className={`${active ? 'bg-white text-gray-900' : 'text-gray-600'} text-sm rounded-full font-bold py-1 px-4 cursor-pointer`}
                    key={index}>
                    {value}
                  </a>
                )
              })}
            </div>
            <div className='hidden'>show on tablet viewport</div>
            <button
              onClick={() => setFiltering(!filtering)}
              className='font-bold relative flex items-center justify-center rounded-full pl-6 bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary leading-3'>
              Filter
              <div className='flex items-center justify-center w-14 pr-2'>{!filtering ? <RiFilter2Line /> : <CloseIcon fill='white' />}</div>
            </button>
          </div>
          <div className={`${!filtering ? 'hidden' : 'block'} border-t border-solid  py-8`} style={{ borderColor: 'rgb(107, 114, 128)' }}>
            <div className='flex flex-wrap -mt-8 -mx-4 '>
              <div className='' style={{ flex: ' 0 0 calc(25% - 32px)', maxWidth: 'calc(25% - 32px)', margin: '32px 16px 0' }}>
                <div>
                  <div className='mb-2 font-bold uppercase text-gray-400 text-xs'>Breed Count</div>
                  <PrettoSlider
                    onChange={(value, number) => {
                      setBreadCount(Number(number))
                    }}
                    value={breedCount}
                    valueLabelDisplay='auto'
                    aria-label='slider'
                    step={1}
                    defaultValue={10}
                    min={1}
                    max={100}
                  />
                  <div className='flex justify-between text-xs'>
                    <div className='font-semibold'>0.01 ETH</div>
                    <div className='font-semibold'>10 ETH</div>
                  </div>
                </div>
              </div>
              <div className='' style={{ flex: ' 0 0 calc(25% - 32px)', maxWidth: 'calc(25% - 32px)', margin: '32px 16px 0' }}>
                <div>
                  <div className='mb-4 font-bold uppercase text-gray-400 text-xs'>Age</div>
                  <div className='relative'>
                    <div className='w-full cursor-pointer text-sm text-white font-semibold w-44 h-12 pl-4 pr-1 items-center rounded-lg border border-solid border-gray-600 flex justify-between'>
                      {/* Highest Yields */}
                      {/* <RiArrowDownCircleLine fill='gray' style={{ fontSize: 25, color: 'red' }} /> */}
                      <Input
                        type={'number'}
                        onChange={(e) => {
                          setAge(parseInt(e.target.value))
                        }}
                        style={{ color: '#fff' }}
                        placeholder='Age'></Input>
                    </div>
                  </div>
                </div>
              </div>
              <div className='' style={{ flex: ' 0 0 calc(25% - 32px)', maxWidth: 'calc(25% - 32px)', margin: '32px 16px 0' }}>
                <div>
                  <div className='mb-4 font-bold uppercase text-gray-400 text-xs'>Rarity</div>
                  <div className='relative'>
                    <div className='w-full cursor-pointer text-sm text-white font-semibold w-44 h-12 pl-4 pr-1 items-center rounded-lg border border-solid border-gray-600 flex justify-between'>
                      <Dropdown menuClassName='menu' className='dropdown' options={options} value={''} placeholder='Select an option' />
                      {/* <RiArrowDownCircleLine values={"dfghj"} fill='gray' style={{ fontSize: 25, color: 'red' }} /> */}
                    </div>
                  </div>
                </div>
              </div>
              ``
              <div className='' style={{ flex: ' 0 0 calc(25% - 32px)', maxWidth: 'calc(25% - 32px)', margin: '32px 16px 0' }}>
                <div>
                  <div className='mb-2 font-bold uppercase text-gray-400 text-xs'>Breed Range</div>
                  <PrettoSlider
                    onChange={(value, number) => {
                      setBreedRange(number)
                    }}
                    value={breedRange}
                    valueLabelDisplay='auto'
                    aria-label='slider'
                    step={1}
                    defaultValue={2}
                    min={0}
                    max={9}
                  />
                  <div className='flex justify-between text-xs'>
                    <div className='font-semibold'>0</div>
                    <div className='font-semibold'>9</div>
                  </div>
                </div>
              </div>
              <div className='' style={{ flex: ' 0 0 calc(25% - 32px)', maxWidth: 'calc(25% - 32px)', margin: '32px 16px 0' }}>
                <div>
                  <div className='mb-2 font-bold uppercase text-gray-400 text-xs'>Price Range</div>
                  <PrettoSlider
                    onChange={(value, number) => {
                      setPriceRange(Number(number))
                    }}
                    value={priceRange}
                    valueLabelDisplay='auto'
                    aria-label='slider'
                    step={0.01}
                    defaultValue={2}
                    min={0.01}
                    max={10}
                  />
                  <div className='flex justify-between text-xs'>
                    <div className='font-semibold'>0.01 ETH</div>
                    <div className='font-semibold'>10 ETH</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='flex flex-wrap mt-8 -mx-4'>
              {data.length > 0 ? (
                data.map((datum, index) => {
                  return (
                    <div key={index} className='w-full md:w-1/2 xl:w-1/4 p-2'>
                      <DiscoverCard datum={datum} applyMaxWidth={false} placeBid={() => (setActiveItem(datum), toggleBidModal())} />
                    </div>
                  )
                })
              ) : (
                <div>None</div>
              )}
            </div>
          </div>
          <div className='mt-8 text-center'>
            <button
              onClick={() => loadMore()}
              className='cursor-pointer font-semibold rounded-full shadow-lg text-white h-12 items-center border-solid border px-6 inline-flex hover:bg-primary hover:border-0'
              style={{ borderColor: 'gray' }}>
              Load More
            </button>
          </div>
        </div>
      </div>
      <div className=''></div>
      <BidModal item={activeItem} />
      <AssetModal item={activeItem} />
    </main>
  )
}

export default Index
