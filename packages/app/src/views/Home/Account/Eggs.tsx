import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from 'state'
import { Route, useRouteMatch } from 'react-router-dom'
import Moralis from 'moralis'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'

import NewAnimalModal from '../../../modals/NewAnimal'
import useWeb3 from 'hooks/useWeb3'
import { Text, Card as Existing, EggCard, VideoPlayer, useMatchBreakpoints } from 'components'
import AspectRatio from 'react-aspect-ratio'
import { getMilliseconds, getDaysHours } from 'util/timeHelpers'
import { eggTimeout } from 'constants/index'
import { addEgg } from 'state/actions'
import { getZooKeeper } from 'util/contracts'
import NewAnimalCard from '../../../modals/NewAnimal'
import { mapEgg, mapAnimal } from 'util/moralis'
import { useNewAnimalModalToggle } from 'state/application/hooks'
interface EggsProps {}
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
    margin: 8px;
    margin-bottom: 32px;
  }
`
const Eggs: React.FC<EggsProps> = ({}) => {
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
  let eggData = []
  const { isXl, isSm, isMd } = useMatchBreakpoints()
  const toggleNewAnimalModal = useNewAnimalModalToggle()

  const allEggs = useSelector<AppState, AppState['zoo']['eggs']>((state) => state.zoo.eggs)

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
    console.log('QUERY ANIMAL', egg.animalID)
    animalQuery.equalTo('tokenID', egg.animalID)
    const animalResults = await animalQuery.find()
    const foundAnimal = animalResults[0]

    console.log('ANIMAL', foundAnimal)
    setHatched(mapAnimal(foundAnimal))
    foundAnimal.set('revealed', true)
    foundAnimal.save()
    startAnimationTimer()
  }

  const hatchEgg = async (egg) => {
    egg.hatching = true
    dispatch(addEgg(mapEgg(egg)))
    try {
      await zooKeeper.methods.hatchEgg(1, egg.tokenID).send({
        from: account,
        gasPrice: gasPrice,
      })
    } catch (error) {
      console.error(error)
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

  const sortData = (data: Array<any>, byType: string) => {
    return data.sort((a, b) => Number(b.tokenID) - Number(a.tokenID))
  }
  Object.values(allEggs).forEach((egg, index) => {
    const eggType = egg.basic ? 'EGG' : 'HYBRID'
    if ((egg.owner || '').toLowerCase() !== account.toLowerCase()) {
      //console.log(account, egg)
      return
    }
    const now = new Date().getTime()
    const elapsedTime = now - egg.createdAt.getTime()
    const hatchTimeout = egg.basic ? 0 : getMilliseconds(eggTimeout)
    const timeRemaining = hatchTimeout - elapsedTime
    const timeRemainingDaysHours = getDaysHours(timeRemaining)
    const barwidth = [100 * (elapsedTime / hatchTimeout), '%'].join('')

    if (egg.owner.toLowerCase() === account.toLowerCase() && !egg.burned) {
      eggData.push({
        id: index,
        ...egg,
        name: eggType,
        timeRemaining: !egg.basic ? (elapsedTime < hatchTimeout ? timeRemaining : 0) : 0,
        CTAOverride: !egg.basic ? (elapsedTime < hatchTimeout ? { barwidth, timeRemainingDaysHours } : null) : null,
      })
    }
  })
  console.log('isSm', isSm)
  eggData = sortData(eggData, 'hybrid')
  // SwiperCore.use([Pagination])

  return (
    <>
      {eggType === '' ? (
        <RowLayout style={{ marginBottom: -8 }}>
          <Route exact path={`${path}`}>
            {eggData.length === 0 ? (
              <StyledText textAlign='center' fontSize='16px'>
                No eggs
              </StyledText>
            ) : (
              // <Swiper slidesPerView={isSm ? 2 : isMd ? 6 : 12} spaceBetween={30} pagination={{ clickable: true }} style={{ marginBottom: 0 }}>
              //   {eggData.map((egg) => (
              //     <SwiperSlide className='account__animal-slide' style={{ display: 'flex', minWidth: 130, minHeight: 180 }} key={egg.tokenID}>
              //       <EggCard egg={egg} hatchEgg={hatchEgg} hatchEggReady={hatchEggReady} />
              //     </SwiperSlide>
              //   ))}

              // </Swiper>
              <Swiper
                slidesPerView={2}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                className='mySwiper'>
                {eggData.map((egg) => {
                  return (
                    <SwiperSlide key={egg.tokenID}>
                      <div style={{ height: 230, width: '100%' }}>
                        <EggCard egg={egg} hatchEgg={hatchEgg} hatchEggReady={hatchEggReady} />
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            )}
          </Route>
          <Route exact path={`${path}/history`}>
            {/* {eggData.map((egg) => (
      <Card key={egg.id} />
    ))} */}
          </Route>
        </RowLayout>
      ) : (
        <VideoPlayer videoPath={eggType === 'basic' ? 'hatch_mobile_basic.mp4' : 'hatch_mobile_hybrid.mp4'} />
      )}

      <NewAnimalModal animal={hatched} onDismiss={() => setEggType('')} />
    </>
  )
}
// animal={hatched}
export default Eggs