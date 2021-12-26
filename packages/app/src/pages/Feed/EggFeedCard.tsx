import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Text } from 'components'
import { FaMoneyBillWave, FaDollarSign } from 'react-icons/fa'
import { useMatchBreakpoints, useWeb3 } from 'hooks'
import { useModal } from 'components/Modal'
import { Card as Existing, Flex } from 'components'
import BidModal from 'components/MarketModals/BidModal'
import { Animal, Egg } from 'types/zoo'
import YieldModal from 'components/MarketModals/YieldModal'
import { RarityColor } from 'enums/rarity-color'
import { ChevronLeftIcon } from 'components/Svg'
import ZooHomeButton from 'components/SideMenu/components/ZooHomeButton'
import { useAssetModalToggle } from 'state/application/hooks'
import { useHistory } from 'react-router'
import { useIsAnimationMode } from 'state/user/hooks'
const basicEggURL = window.location.origin + '/static/images/basic.jpg'
const hybridEggURL = window.location.origin + '/static/images/hybrid.jpg'
const animatedBasicEggURL = window.location.origin + '/static/video/egg.gif'
interface Props {
  item: Egg
  url?: string
}

const FirstThird = styled.div`
  height: 33vh;
  width: 100%;
`
const SecondThird = styled.div`
  height: 33vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const FinalThird = styled.div`
  height: 33vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 16px;
`

const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 9999999;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  width: 80px;
  & span {
    text-align: center;
    font-weight: bold;
    width: 100%;
    color: ${({ theme }) => theme.colors.modal.borderColor};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.modal.borderColor};
    -webkit-text-stroke-width: 0.2px;
    -webkit-text-stroke-color: #a9a9a9;
  }
  & svg {
    height: 40px;
    width: 40px;
    // fill: ${({ theme }) => theme.colors.primaryLight};
    fill: ${({ theme }) => theme.colors.modal.borderColor};
    stroke: #a9a9a9;
    // text-shadow: 1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black;
    // stroke: ${({ theme }) => theme.colors.modal.borderColor};
    stroke-width: 15px;
  }
`
const MainHeading = styled(Text)`
  font-size: 42px;
  width: 100%;
  line-height: 1;
  color: white;
  font-weight: 400;
  font-family: 'Permanent Marker', cursive;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #040404;
`
const Subheading = styled(Text)`
  width: 100%;
  color: black;
  font-weight: 500;
  font-size: 24px;
  -webkit-text-fill-color: ${({ theme }) => theme.colors.modal.borderColor};
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: #a9a9a9;
  :nth-child(3) {
    font-size: 24px;
    font-weight: 600;
  }
`

const Card = styled(Existing)<{ url?: string; isMobile?: boolean }>`
  width: 100%;
  background-image: url(${({ url }) => `${url}`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  // max-height: 773px;
  // max-width: 425px;
  min-width: ${({ isMobile }) => (isMobile ? `325px` : `490px`)};
  display: block;
`

const CardOverlay = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8));
  * {
    text-shadow: 2px 0 0 #0000006e, 0 -2px 0 #0000006e, 0 2px 0 #000, -2px 0 0 #0000006e;
  }
`

const StyledChevron = styled(ChevronLeftIcon)`
  width: 40px;
  height: 40px;
`

const ActionButtonContainer = styled.div`
  width: 80px;
  display: flex;
  position: absolute;
  right: 0;
  bottom: 16px;
  flex-direction: column;
`

const EggFeedCard: React.FC<Props> = ({ item }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const date = new Date(item.createdAt)
  const StringDate = date.toLocaleDateString('en-US')
  const toggleAssetModal = useAssetModalToggle()
  const getVideo = () => {
    return (
      <div
        onClick={() =>
          history.push(`/feed/${item.owner}/${item.tokenID}`, {
            item,
          })
        }
        style={{ margin: 0, position: 'absolute', width: '100%', height: '100%' }}>
        <video
          autoPlay
          loop
          muted
          style={{
            pointerEvents: 'none',
            height: '100%',
            alignSelf: 'center',
          }}>
          <source src={'/static/video/egg.mp4'} type='video/mp4'></source>
        </video>
      </div>
    )
  }
  console.log('egg is', item)
  const buyButton = false ? (
    <></>
  ) : (
    <IconButton onClick={() => console.log('buying')} style={{ padding: '10px 0px' }}>
      <FaDollarSign />
    </IconButton>
  )
  const history = useHistory()
  const animationMode = useIsAnimationMode()

  return (
    <>
      <Card isMobile={isMobile} url={item.basic ? (animationMode ? animatedBasicEggURL : basicEggURL) : hybridEggURL}>
        <CardOverlay
          onClick={() =>
            history.push(`/feed/${item.owner}/${item.tokenID}`, {
              item,
            })
          }>
          { animationMode && getVideo() }
          <FirstThird />
          <SecondThird></SecondThird>
          <FinalThird>
            <Flex flexDirection='row' className='z-10'>
              <Flex
                flexDirection='column'
                width='calc(100% - 75px)'
                style={{
                  textShadow: '2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000, -2px 0 0 #000',
                }}>
                <MainHeading bold>{`${item.kind}`}</MainHeading>
                <Subheading> {item.basic ? 'BASIC' : 'HYBRID'}</Subheading>
                <Subheading>{`Laid: ${StringDate}`}</Subheading>
                <Subheading>{`ID: ${item.tokenID}`}</Subheading>
              </Flex>
              <Flex flexDirection='column' className='z-10'>
                <ActionButtonContainer>
                  <Flex width='100%' height='100%' flexDirection='column'>
                    <IconButton onClick={() => toggleAssetModal()} style={{ padding: '10px 0px' }}>
                      <FaMoneyBillWave />
                    </IconButton>
                    {buyButton} <ZooHomeButton />
                  </Flex>
                </ActionButtonContainer>
              </Flex>
            </Flex>
          </FinalThird>
        </CardOverlay>
      </Card>
    </>
  )
}

export default EggFeedCard
