import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'components'
import { ButtonMenu, ButtonMenuItem, ButtonMenuItemProps } from 'components/ButtonMenu'

import { Swiper, Slide } from 'components/Swiper'
import { useRouteMatch, Link, useLocation, useHistory, RouteComponentProps, withRouter } from 'react-router-dom'
import { Splide, SplideSlide } from 'components/Splide'
import { useWeb3 } from 'hooks/useWeb3'
import { useSelector } from 'react-redux'
import { useMatchBreakpoints } from 'hooks'
import Moralis from 'moralis'
import { AppState } from 'state/index'
import FeedCard from './FeedCard'
import BorderButton from 'components/Button/BorderButton'
import { ChevronLeftIcon } from 'components/Svg'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import EggFeedCard from './EggFeedCard'
import { getDaysHours, getMilliseconds } from 'util/timeHelpers'
import { eggTimeout } from 'constants/index'
import { sortData } from 'functions'
interface ButtonProp extends ButtonMenuItemProps {
  activeIndex: number
}

export interface FeedPagePops extends RouteComponentProps<{ key?: string }> {}

function Feed<FeedPagePops>({ match }) {
  const animalsState = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
  const eggsState = useSelector<AppState, AppState['zoo']['eggs']>((state) => state.zoo.eggs)

  const eggs = useSelector<AppState, AppState['zoo']['myEggs']>((state) => state.zoo.myEggs)
  const myEggs = Object.values(eggs)
  const allEggs = Object.values(eggsState)

  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const history = useHistory()
  const { account } = useWeb3()
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  let animals = Object.values(animalsState)

  const { pathname, state } = useLocation()
  //  Reroute to homes
  const HomeClick = () => {
    history.push('/home')
  }

  const onItemClick = (index) => {
    swiperRef.current.splide.go(index)
    setActiveIndex(index)
  }

  const handleIndexChange = (obj) => {
    setActiveIndex(obj.activeIndex)
  }

  //  Settings for Zoo vs Market
  const isMarket = pathname.includes('market')
  // setActiveIndex(isMarket ? 0 : 1)
  useEffect(() => {
    if (isMarket) setActiveIndex(1)
  }, [])

  if (match) {
    console.log(match)
    const index = animals.findIndex((a) => a.tokenID === match.params.key)
    console.log('Index of match:', index)
  }

  const animalGroup = {}

  /*
   * Get index of selected animal to set Swipers initial slide
   * equal to that index
   */
  let animalIndex = 0
  if (history.location && history.location.state) {
    animalIndex = animals.findIndex((a) => a.tokenID === history.location.state['tokenID'])
  }

  const handleContainerClick = (event) => {
    const className = event.target.className
    if (className === 'feed-container') {
      HomeClick()
    }
  }
  return (
    // <Container className='feed-container' onClick={handleContainerClick} isMobile={isMobile}>

    <>
      <main className='flex flex-col items-center justify-start flex-grow w-full h-full'>
        <div className='w-full items-center justify-center fixed z-10 mt-4 flex'>
          <div className={`grid rounded-md p-1 grid-cols-2 justify-self-start`} style={{ backgroundColor: 'rgb(44, 47, 54)', height: 46 }}>
            {['My Zoo', 'Market'].map((item: string, index: number) => {
              const active = activeIndex == index
              return (
                <a
                  onClick={() => onItemClick(index)}
                  className={`rounded-md flex justify-center items-center cursor-pointer font-normal flex text-gray-300 text-center px-8 text-base ${
                    active && 'font-semibold text-white'
                  }`}
                  style={{ backgroundColor: active ? '#212429' : 'transparent' }}>
                  <h6>{item}</h6>
                </a>
              )
            })}
          </div>
        </div>
        <Splide
          ref={swiperRef}
          options={{
            direction: 'ltr',
            arrows: false,
            perPage: 1,
            focus: 'center',
            width: '100vw',
            pagination: false,
            drag: false,
          }}>
          <SplideSlide>
            <div className='flex justify-center w-full'>
              <Splide
                options={{
                  direction: 'ttb',
                  height: '100vh',
                  arrows: false,
                  pagination: false,
                  perPage: 1,
                  perMove: 1,
                  gap: '5em',
                  focus: 'center',
                  breakpoints: {
                    640: {
                      fixedWidth: '100vw',
                    },
                    780: {
                      fixedWidth: '80vw',
                    },
                  },
                }}>
                {myEggs.length > 0 ? (
                  myEggs.map((data) => {
                    return (
                      <SplideSlide>
                        <div className='w-full p-px   gradient-border' style={{ background: 'none' }}>
                          <div className='flex flex-col p-1 w-full'>
                            {/* <FeedCard item={data} key={data.tokenID + 'card'} animalGroup={animalGroup} hideBid={activeIndex === 0} /> */}
                            <EggFeedCard item={data} key={data.tokenID + 'card'} />
                          </div>
                        </div>
                      </SplideSlide>
                    )
                  })
                ) : (
                  <SplideSlide>
                    <div className='w-full h-full p-px rounded bg-gradient-to-b from-btn1  to-btn2'>
                      <div className='flex h-full flex-col p-1 rounded bg-dark-900 justify-center items-center px-12'>
                        <Text textAlign='center'>You do not currently own any animals</Text>
                        <button onClick={HomeClick} className='col-span-1 p-px rounded mt-4'>
                          <div className='w-full p-px rounded bg-gradient-to-b from-btn1  to-btn2'>
                            <div className='flex flex-col w-full h-full overflow-y-hidden rounded bg-dark-900'>
                              <div className='flex items-center w-full h-full py-3 px-4 rounded bg-gradient-to-b from-bg-dark-1000 to-bg-dark-1000 hover:from-btn1 hover:to-btn2 '>
                                <div className='font-bold text-primary'>Buy Eggs</div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </SplideSlide>
                )}
              </Splide>
            </div>
          </SplideSlide>

          <SplideSlide tabindex='0'>
            <div className='flex justify-center'>
              <Splide
                options={{
                  direction: 'ttb',
                  height: '100vh',
                  arrows: false,
                  pagination: false,
                  perPage: 1,
                  perMove: 1,
                  gap: '5em',
                  focus: 'center',
                  breakpoints: {
                    640: {
                      fixedWidth: '100vw',
                    },
                    780: {
                      fixedWidth: '80vw',
                    },
                  },
                  lazyLoad: 'nearby',
                  preloadPages: 10,
                }}>
                {allEggs.length ? (
                  allEggs.map((data) => {
                    return (
                      <SplideSlide>
                        <div className='w-full p-px   gradient-border' style={{ background: 'none' }}>
                          <div className='flex flex-col p-1 w-full'>
                            <EggFeedCard item={data} key={data.tokenID + 'card'} />
                            {/* <FeedCard item={data} key={data.tokenID + 'card'} animalGroup={{}} /> */}
                          </div>
                        </div>
                      </SplideSlide>
                    )
                  })
                ) : (
                  <SplideSlide>
                    <div className='w-full p-px rounded bg-gradient-to-b from-btn1  to-btn2'>
                      <div className='flex flex-col p-1 rounded bg-dark-900'>
                        <Text textAlign='center'>You do not currently own any animals</Text>
                        <BorderButton scale='md' onClick={HomeClick}>
                          Buy Egg
                        </BorderButton>
                      </div>
                    </div>
                  </SplideSlide>
                )}
              </Splide>
            </div>
          </SplideSlide>
        </Splide>
      </main>
      {/* <AssetModal /> */}
    </>
  )
}
export default withRouter(Feed)
