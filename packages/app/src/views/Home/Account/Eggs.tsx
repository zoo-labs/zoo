import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { EggCard, Text, useMatchBreakpoints } from 'components'
import { CardEgg } from 'components/EggCard/types'
import AssetModal from 'components/modals/MarketModals/AssetModal'
import { Splide, SplideSlide } from 'components/Splide'
import { useZooKeeper } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import useWeb3 from 'hooks/useWeb3'
import Moralis from 'moralis'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, useRouteMatch } from 'react-router-dom'
import { useAssetModalToggle, useHatchDisabledModalToggle, useNewAnimalModalToggle, useVideoPlayerModalToggle } from 'state/application/hooks'
import { useGasPrice } from 'state/network/hooks'
import { addEgg } from 'state/zoo/actions'
import styled from 'styled-components'
import { Egg } from 'types/zoo'
import { mapAnimal, mapEgg } from 'util/moralis'
import HatchDisabledModal from '../../../components/modals/HatchDisabled'
import NewAnimalModal from '../../../components/modals/NewAnimal'
import VideoPlayerModal from '../../../components/modals/VideoPlayer'
import { ChainId } from '../../../constants/Chains'

interface EggsProps {
  myEggs: Array<Egg>
}
const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`

const RowLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    // min-width: calc(100vw - 20px);
    // max-width: 31.5%;
    width: 100%;
    margin: 0px;
    margin-bottom: 32px;
  }
`
const Eggs: React.FC<EggsProps> = ({ myEggs }) => {
  const { account, chainId, library } = useWeb3()
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  const [eggType, setEggType] = useState('')
  const { toastInfo, clear } = useToast()
  const [isOpen, setOpen] = useState(false)
  const [_, setShowBoth] = useState(false)
  const gasPrice = useGasPrice()

  const zooKeeper = useZooKeeper()
  const videoTimeout = []
  const [hatched, setHatched] = useState({
    tokenID: 0,
    name: '',
    rarity: '',
    description: '',
    dob: 0,
    imageUrl: '',
    listed: false,
    boost: 0,
    yield: 0,
  })
  const { isXl, isSm, isMd } = useMatchBreakpoints()
  const toggleNewAnimalModal = useNewAnimalModalToggle()
  const toggleVideoPlayerModal = useVideoPlayerModalToggle()
  const toggleAssetModal = useAssetModalToggle()
  const [activeItem, setActiveItem] = useState({})
  const hatchEggReady = async (egg) => {
    const eggObject = Moralis.Object.extend('Eggs')
    const eggQuery = new Moralis.Query(eggObject)
    eggQuery.equalTo('tokenID', egg.tokenID)
    const eggResults = await eggQuery.find()
    const foundEgg = eggResults[0]

    foundEgg.set('burn', true)
    await foundEgg.save()

    setShowBoth(true)
    setEggType(egg.basic ? 'basic' : 'hybrid')

    const animalObject = Moralis.Object.extend('Animals')
    const animalQuery = new Moralis.Query(animalObject)
    // console.log('QUERY ANIMAL', egg.animalID)
    animalQuery.equalTo('tokenID', egg.animalID)
    const animalResults = await animalQuery.find()
    const foundAnimal = animalResults[0]

    // console.log('ANIMAL', foundAnimal)
    setHatched(mapAnimal(foundAnimal))
    foundAnimal.set('revealed', true)
    foundAnimal.save()
    startAnimationTimer()
  }
  const hatchDisabledModal = useHatchDisabledModalToggle()
  // const chainIds = [
  //   ChainId.MAINNET,
  //   ChainId.BSC,
  //   ChainId.RINKEBY,
  //   ChainId.BSC_TESTNET,
  // ]
  const hatchEgg = async (egg) => {
    //disable egg hatching and show modal here

    toastInfo('Game features will be enabled soon. Stay tunned for updates.')
    return

    if (chainId === ChainId.BSC_TESTNET) {
      console.log('egg', egg)
      const newEgg = { ...egg, hatching: true }
      // egg.hatching = true
      dispatch(addEgg({ data: mapEgg(newEgg), account }))
      try {
        await zooKeeper.methods.hatchEgg(1, newEgg.tokenID).send({
          from: account,
          gasPrice: gasPrice,
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      hatchDisabledModal()
    }
  }

  const startAnimationTimer = useCallback(() => {
    videoTimeout.push(
      setTimeout(() => {
        toggleNewAnimalModal()
      }, 5450),
    )
    // videoTimeout.push(setTimeout(() => setEggType(''), 7000))
  }, [])

  const closeAnimation = useCallback(async (e) => {
    setEggType('')
    videoTimeout.forEach((i) => {
      clearTimeout(i)
    })
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', closeAnimation, false)
    return () => {
      document.removeEventListener('keydown', closeAnimation, false)
    }
  }, [])

  const [timeStartOnPage] = useState(new Date().getTime())
  const [elapsedTimeOnPage, setElapsedTimeOnPage] = useState(new Date().getTime() - timeStartOnPage)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setElapsedTimeOnPage(elapsedTimeOnPage + 5000)
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [elapsedTimeOnPage])
  // SwiperCore.use([Pagination])
  useEffect(() => {
    if (eggType !== '') {
      toggleVideoPlayerModal()
    }
  }, [eggType])

  return (
    <>
      <RowLayout style={{ marginBottom: -8 }}>
        <Route exact path={`${path}`}>
          {myEggs.length === 0 ? (
            <StyledText textAlign='center' fontSize='16px'>
              No eggs
            </StyledText>
          ) : (
            // <Swiper
            //   slidesPerView={isSm ? 3 : isMd ? 9 : 12}
            //   // spaceBetween={isSm ? 4 : isMd ? 15 : 30}
            //   spaceBetween={8}
            //   pagination={{
            //     clickable: true,
            //   }}
            //   className='mySwiper'>
            //   {myEggs.map((egg: CardEgg) => {
            //     return (
            //       <SwiperSlide key={egg.tokenID} style={{ minWidth: 123 }}>
            //         <div className='flex items-center' style={{ height: 200, width: '100%' }}>
            //           <EggCard egg={egg} hatchEgg={hatchEgg} hatchEggReady={hatchEggReady} />
            //         </div>
            //       </SwiperSlide>
            //     )
            //   })}
            // </Swiper>
            <Splide
              options={{
                direction: 'ltr',
                arrows: false,
                autoWidth: true,
                autoHeight: true,
                pagination: false,
                gap: '2rem',
              }}>
              {myEggs.map((egg: CardEgg) => (
                <SplideSlide key={egg.tokenID}>
                  <div className='flex items-center' style={{ height: 300, width: '100%' }}>
                    <EggCard egg={egg} hatchEgg={hatchEgg} hatchEggReady={hatchEggReady} viewItem={() => (setActiveItem(egg), toggleAssetModal())} />
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          )}
        </Route>
        <Route exact path={`${path}/history`}>
          {/* {eggData.map((egg) => (
      <Card key={egg.id} />
    ))} */}
        </Route>
      </RowLayout>
      <VideoPlayerModal videoPath={eggType === 'basic' ? 'hatch_mobile_basic.mp4' : 'hatch_mobile_hybrid.mp4'} />
      <NewAnimalModal animal={hatched} onDismiss={() => setEggType('')} />
      <HatchDisabledModal />
      <AssetModal item={activeItem} />
    </>
  )
}
// animal={hatched}
export default Eggs
