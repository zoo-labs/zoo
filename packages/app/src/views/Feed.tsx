import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'components'
import { ButtonMenu, ButtonMenuItem, ButtonMenuItemProps } from 'components/ButtonMenu'

import { Swiper, SwiperSlide } from 'swiper/react'
import { useRouteMatch, Link, useLocation, useHistory, RouteComponentProps, withRouter } from 'react-router-dom'

import { useWeb3 } from 'hooks/useWeb3'
import 'swiper/swiper.min.css'
import { useSelector } from 'react-redux'
import { useMatchBreakpoints } from 'hooks'
import Moralis from 'moralis'
import { AppState } from 'state/index'
import FeedCard from './FeedCard'
import BorderButton from 'components/Button/BorderButton'
import { ChevronLeftIcon } from 'components/Svg'
import './styles.css'

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
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const history = useHistory()
  const { account } = useWeb3()
  const [swiperRef, setSwiperRef] = useState(undefined)
  const [activeIndex, setActiveIndex] = useState(0)

  let animals = Object.values(animalsState)
  const { pathname } = useLocation()

  //  Reroute to homes
  const HomeClick = () => {
    history.push('/home')
  }

  const onItemClick = (index) => {
    console.log('new Index ' + index)
    // if (activeIndex == 0) {
    //   index = 1
    // } else {
    //   index = 0
    // }
    swiperRef.slideTo(index, 200)
    setActiveIndex(index)

    // if (index == 0) {
    //   history.push('/myzoo')
    // } else {
    //   history.push('/market')
    // }
  }

  const handleIndexChange = (obj) => {
    console.log('handleIndexChange')
    console.log(obj)
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
    if (className === 'swiper-slide swiper-slide-active') {
      HomeClick()
    }
  }

  return (
    <Container isMobile={isMobile}>
      {/* <ButtonMenu activeIndex={activeIndex} onItemClick={onItemClick} scale='sm'>
        <ButtonMenu activeIndex={activeIndex} onItemClick={onItemClick} scale='sm'>
          <ButtonMenuItem as='a'>My Zoo</ButtonMenuItem>
          <ButtonMenuItem as='a'>Market</ButtonMenuItem>
        </ButtonMenu> */}
      <div className='w-full items-center justify-center absolute z-10 mt-4 flex'>
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

      <Swiper onSwiper={setSwiperRef} onActiveIndexChange={handleIndexChange} centeredSlides={isMobile ? true : false} spaceBetween={30} slidesPerView={1} direction='horizontal'>
        <SwiperSlide key={0}>
          {animals.length ? (
            <Swiper speed={900} initialSlide={animalIndex} spaceBetween={30} slidesPerView={1} direction='vertical'>
              {animals.map((data) => {
                // console.log('DATA')
                // console.log(data)
                return (
                  <SwiperSlide key={data.tokenID + 'slide'}>
                    <FeedCard item={data} key={data.tokenID + 'card'} animalGroup={animalGroup} hideBid={activeIndex === 0} />
                  </SwiperSlide>
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
        </SwiperSlide>
        <SwiperSlide key={1}>
          <Swiper speed={900} initialSlide={animalIndex} spaceBetween={30} slidesPerView={1} direction='vertical'>
            {animals.map((data, index) => {
              return data.listed ? (
                <SwiperSlide key={data.tokenID + 'slide'}>
                  <FeedCard item={data} key={data.tokenID + 'card'} animalGroup={{}} />
                </SwiperSlide>
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
        </SwiperSlide>
      </Swiper>
    </Container>
  )
}

export default withRouter(Feed)
