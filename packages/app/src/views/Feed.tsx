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
`

// const StyledChevron = styled(ChevronLeftIcon)`
//   height: 40px;
//   width: 40px;
//   z-index: 101;
//   fill: white;
// `

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
    history.push('/account')
  }

  const handleClick = (newIndex) => {
  console.log('new Index ' + newIndex)
    setActiveIndex(newIndex)
    swiperRef.slideTo(newIndex + 1, 200)
  }

  const handleIndexChange = (obj) => {
    console.log("handleIndexChange")
    console.log(obj)
    setActiveIndex(obj.activeIndex)
  }

  //  Settings for Zoo vs Market
  let filter = ''
  switch (true) {
    case pathname.includes('myzoo'):
      filter = 'myZoo'
      break
    case pathname.includes('marketplace'):
      filter = 'marketplace'
      break
    default:
      filter = ''
      break
  }

  //  Filter if in the Zoo or Market
  const isMyZoo = filter === 'myZoo'

  let totalAnimalsFiltered = animals.filter((animal) => {
    return (animal.owner || '').toLowerCase() !== account.toLowerCase() && !animal.freed
  })
  console.log(totalAnimalsFiltered)

  let myZooAnimalsFiltered = animals.filter((animal) => {
    return animal.owner.toLowerCase() === account.toLowerCase()
    // && !animal.freed
  })
  console.log(myZooAnimalsFiltered)

  if(myZooAnimalsFiltered[0] === undefined){
      myZooAnimalsFiltered.shift()
      myZooAnimalsFiltered.pop()
  }

  if (match) {
    const index1 = myZooAnimalsFiltered.findIndex((a) => a.tokenID === match.params.key)
    const index = index1 + 1
    console.log('Indexer '  + index)
    const toMove = myZooAnimalsFiltered[index]
    console.log(toMove)
    myZooAnimalsFiltered[index] = myZooAnimalsFiltered[index]
    myZooAnimalsFiltered[index] = toMove
  }

  // const index = myZooAnimalsFiltered.findIndex((a) => a.tokenID === match.params.key)

  const animalGroup = {}
  let myZooAnimalData = []
  let totalAnimalData = []

  myZooAnimalsFiltered.forEach((animal) => {
    if (myZooAnimalData.find((a) => a.name === animal.name)) {
      console.log(animal.name)
    } else if (animal) {
      console.log(animal)
      myZooAnimalData.push(animal)
    }
  })

  totalAnimalData = totalAnimalsFiltered
  console.log('myZooAnimalsFiltered', myZooAnimalsFiltered)
  console.log(myZooAnimalData.length)

  return (
    <Container isMobile={isMobile}>
      <ToggleContainer>
        <ButtonMenu activeIndex={activeIndex} onItemClick={handleClick} scale='sm'>
          <ButtonMenuItem as='a'>My Zoo</ButtonMenuItem>
          <ButtonMenuItem as='a'>Marketplace</ButtonMenuItem>
        </ButtonMenu>
      </ToggleContainer>
      <Swiper onSwiper={setSwiperRef} onActiveIndexChange={handleIndexChange} centeredSlides={isMobile ? true : false} spaceBetween={30} slidesPerView={1} direction='horizontal'>
        <SwiperSlide key={0}>
          {myZooAnimalData.length ? (
            <Swiper spaceBetween={30} slidesPerView={1} direction='vertical'>
              {myZooAnimalData.map((data) => {
                console.log(data)
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
          <Swiper spaceBetween={30} slidesPerView={1} direction='vertical'>
            {totalAnimalData.map((data, index) => {
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
