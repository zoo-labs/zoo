import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'components'
import { ButtonMenu, ButtonMenuItem, ButtonMenuItemProps } from 'components/ButtonMenu'

import { Swiper, Slide } from 'components/Swiper'
import { useRouteMatch, Link, useLocation, useHistory, RouteComponentProps, withRouter } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide'
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
interface ButtonProp extends ButtonMenuItemProps {
  activeIndex: number
}

const Container = styled.div<{ isMobile?: boolean }>`
  height: ${({ isMobile }) => (isMobile ? `100vh` : null)};
  display: ${({ isMobile }) => (isMobile ? null : 'flex')};
  flex-direction: ${({ isMobile }) => (isMobile ? `column` : 'row')};
  flex-wrap: wrap;
  & .swiper-container {
    height: 100vh;
  }
  z-index: 4;
`

const StyledMenuButton = styled.button`
  position: relative;
  top: -8px;
  left: -12px;
  border: none;
  background: white;
  box-shadow: none;
  color: transparant;
`

const ToggleContainer = styled.div`
  div {
    width: 100%;
    border-radius: 0;
    justify-content: center;
    z-index: 1000;
    position: absolute;
    padding-top: 15px;
    // background: linear-gradient(#3d3d3d, transparent);
  }
  a {
    border: none;

    font-size: 20px;
    box-shadow: none;
    cursor: pointer;
  }
`

const EmptyZoo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 80px 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};

  button {
    margin-top: 24px;
  }
  * {
    color: ${({ theme }) => theme.colors.text};
  }
`

const MaxHeightLogo = styled.img`
  height: ${32 / 1.6}px;
  position: absolute;
  bottom: 20px;
  right: 10px;
  z-index: 100;
`

const LogoContainer = styled.div`
  height: 100%;
  ${({ theme }) => theme.mediaQueries.md || theme.mediaQueries.lg || theme.mediaQueries.xl} {
    left: 50%;
  }
`

export interface FeedPagePops extends RouteComponentProps<{ key?: string }> {}

function Feed<FeedPagePops>({ match }) {
  const animalsState = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
  const eggsState = useSelector<AppState, AppState['zoo']['eggs']>((state) => state.zoo.eggs)

  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const history = useHistory()
  const { account } = useWeb3()
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  let animals = Object.values(animalsState)
  let eggs = Object.values(eggsState).filter((egg) => !egg.burned)
  const myEggs = eggs.filter((egg) => egg.owner === account)
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
            <div className='flex justify-center'>
              <Splide
                options={{
                  direction: 'ttb',
                  height: '100vh',
                  autoWidth: true,
                  arrows: false,
                  pagination: false,
                  perPage: 1,
                  perMove: 1,
                  gap: '5em',
                  focus: 'center',
                }}>
                {myEggs.length ? (
                  myEggs.map((data) => {
                    return (
                      <SplideSlide>
                        <div className='w-full p-px  bg-gradient-to-b from-btn1  to-btn2'>
                          <div className='flex flex-col p-1  bg-dark-900'>
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
                      <div className='flex h-full flex-col p-1 rounded bg-dark-900 justify-center items-center px-8'>
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

          <SplideSlide tabindex='0'>
            <div className='flex justify-center'>
              <Splide
                options={{
                  direction: 'ttb',
                  height: '100vh',
                  autoWidth: true,
                  arrows: false,
                  pagination: false,
                  perPage: 1,
                  perMove: 1,
                  gap: '5em',
                  focus: 'center',
                }}>
                {animals.length ? (
                  animals.map((data) => {
                    return (
                      <SplideSlide>
                        <div className='w-full p-px  bg-gradient-to-b from-btn1  to-btn2'>
                          <div className='flex flex-col p-1  bg-dark-900'>
                            <FeedCard item={data} key={data.tokenID + 'card'} animalGroup={{}} />
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
    </>
  )
}
export default withRouter(Feed)
{
  /* <Swiper
className='swiper-wrapper'
onSwiper={setSwiperRef}
onActiveIndexChange={handleIndexChange}
centeredSlides={isMobile ? true : false}
spaceBetween={30}
slidesPerView={1}
direction='horizontal'>
<Slide key={0}>
  {animals.length ? (
    <Swiper mousewheel={{ releaseOnEdges: true }} speed={900} initialSlide={animalIndex} spaceBetween={30} slidesPerView={1} direction='vertical'>
      {animals.map((data) => {
        return (
          <Slide className='swiper-wrapper' key={data.tokenID + 'slide'}>
            <FeedCard item={data} key={data.tokenID + 'card'} animalGroup={animalGroup} hideBid={activeIndex === 0} />
          </Slide>
        )
      })}
    </Swiper>
  ) : (
    <EmptyZoo>
      <Text textAlign='center'>You do not currently own any animals</Text>
      <BorderButton scale='md' onClick={HomeClick}>
        Buy Egg
      </BorderButton>
    </EmptyZoo>
  )}
</Slide>
<Slide key={1}>
  <Swiper speed={900} initialSlide={animalIndex} spaceBetween={30} slidesPerView={1} direction='vertical'>
    {animals.map((data, index) => {
      return data.listed ? (
        <Slide key={data.tokenID + 'slide'}>
          <FeedCard item={data} key={data.tokenID + 'card'} animalGroup={{}} />
        </Slide>
      ) : (
        <EmptyZoo>
          <Text textAlign='center'>There are currently no animals up for auction</Text>
          <BorderButton scale='md' onClick={HomeClick}>
            Home
          </BorderButton>
        </EmptyZoo>
      )
    })}
  </Swiper>
</Slide>
</Swiper> */
}
