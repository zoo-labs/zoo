import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'components'
import { ButtonMenu, ButtonMenuItem, ButtonMenuItemProps } from 'components/ButtonMenu'

import { Swiper } from 'swiper/react'
import { SwiperSlide as Slide } from 'swiper/react'
import { useRouteMatch, Link, useLocation, useHistory, RouteComponentProps, withRouter } from 'react-router-dom'

import { useWeb3 } from 'hooks/useWeb3'
import 'swiper/swiper.min.css'
import { useSelector } from 'react-redux'
import { useMatchBreakpoints } from 'hooks'
import Moralis from 'moralis'
import { AppState } from 'state/index'
import { FeedCard } from 'components/FeedCard'
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

interface RouteProps extends RouteComponentProps<{ key?: string }> {}

function Feed<RouteProps>({ match }) {
  const animalsState = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const history = useHistory()
  const { account } = useWeb3()
  const [swiperRef, setSwiperRef] = useState(undefined)

  // Current set of view, either MyZoo or Marketplace
  const [activeIndex, setActiveIndex] = useState(0)

  const { pathname } = useLocation()

  //  Reroute to homes
  const homeClick = () => {
    history.push('/account')
  }

  const onItemClick = (index) => {
    setActiveIndex(index)
    swiperRef.slideTo(index, 200)
  }

  const onActiveIndexChange = (obj) => {
    onItemClick(obj.activeIndex)
  }

  //  Settings for Zoo vs Market
  const isMyZoo = pathname.includes('myzoo') ? true : false

  let animals = Object.values(animalsState)
  if (isMyZoo) {
    animals =  animals.filter((a) => a.owner.toLowerCase() == account.toLowerCase()) // only user animals
  } else {
    animals = animals.filter((a) => a.owner.toLowerCase() != account.toLowerCase())
  }

  // If viewing specific NFT, sort NFTs to that index
  if (match) {
    console.log('match', match.params)
    const index = animals.findIndex((a) => a.tokenID === match.params.key)
    animals = animals.slice(0,index).concat(animals.slice(index))
  }

  return (
    <Container isMobile={isMobile}>

      <ToggleContainer>
        <ButtonMenu activeIndex={activeIndex} onItemClick={onItemClick} scale='sm'>
          <ButtonMenuItem as='a'>My Zoo</ButtonMenuItem>
          <ButtonMenuItem as='a'>Marketplace</ButtonMenuItem>
        </ButtonMenu>
      </ToggleContainer>

      <Swiper onSwiper={setSwiperRef} onActiveIndexChange={onActiveIndexChange} centeredSlides={isMobile ? true : false} spaceBetween={30} slidesPerView={1} direction='horizontal'>

        // MyZoo slides
        <Slide key={'myzoo-slides'}>

          {animals.length ? (
            // Animals found, show animal slides
            <Swiper spaceBetween={30} slidesPerView={1} direction='vertical'>
              // Render animals
              {animals.map((nft) => {
                return (
                  <Slide key={nft.tokenID + 'slide'}>
                    <FeedCard nft={nft} key={nft.tokenID + 'card'} showBid={false} />
                  </Slide>
                )
              })}
            </Swiper>
          ):(
            // Not found, sad Zoo
            <EmptyZoo>
              <Text textAlign='center'>You do not currently own any animals</Text>
              <BorderButton scale='md' onClick={homeClick}>
                Buy Egg
              </BorderButton>
            </EmptyZoo>
          )}
        </Slide>

        // Market slides
        <Slide key={'market-slides'}>
          <EmptyZoo>
            <Text textAlign='center'>There are currently no animals up for auction</Text>
            <BorderButton scale='md' onClick={homeClick}>
              Home
            </BorderButton>
          </EmptyZoo>
        </Slide>
      </Swiper>
    </Container>
  )
}

export default withRouter(Feed)
