import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from 'state'
import { Route, useRouteMatch } from 'react-router-dom'
import Moralis from 'moralis'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import VideoPlayerModal from '../../../components/modals/VideoPlayer'
import NewAnimalModal from '../../../components/modals/NewAnimal'
import HatchDisabledModal from '../../../components/modals/HatchDisabled'
import useWeb3 from 'hooks/useWeb3'
import { Text, Card as Existing, EggCard, VideoPlayer, useMatchBreakpoints } from 'components'
import { getMilliseconds, getDaysHours } from 'util/timeHelpers'
import { eggTimeout } from 'constants/index'
import { addEgg, getMyEggs } from 'state/zoo/actions'
import { getZooKeeper } from 'util/contracts'
import NewAnimalCard from '../../../components/modals/NewAnimal'
import { mapEgg, mapAnimal } from 'util/moralis'
import { useHatchDisabledModalToggle, useNewAnimalModalToggle, useVideoPlayerModalToggle } from 'state/application/hooks'
import { Splide, SplideSlide } from 'components/Splide'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'

import { sortData } from 'functions'
import { CardEgg } from 'components/EggCard/types'
import { t } from '@lingui/macro'
import { Egg } from 'types/zoo'
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
  const { account, chainId } = useWeb3React()
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  const [eggType, setEggType] = useState('')
  const [isOpen, setOpen] = useState(false)
  const [_, setShowBoth] = useState(false)
  const web3 = useWeb3()
  const { gasPrice } = web3
  const zooKeeper = getZooKeeper(web3)
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

  const hatchEgg = async (egg) => {
    //disable egg hatching and show modal here
    hatchDisabledModal()
    // egg.hatching = true
    // dispatch(addEgg(mapEgg(egg)))
    // try {
    //   await zooKeeper.methods.hatchEgg(1, egg.tokenID).send({
    //     from: account,
    //     gasPrice: gasPrice,
    //   })
    // } catch (error) {
    //   console.error(error)
    // }
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
                gap: '1rem',
              }}>
              {myEggs.map((egg: CardEgg) => (
                <SplideSlide key={egg.tokenID}>
                  <div className='flex items-center' style={{ height: 200, width: '100%' }}>
                    <EggCard egg={egg} hatchEgg={hatchEgg} hatchEggReady={hatchEggReady} />
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
    </>
  )
}
// animal={hatched}
export default Eggs
