import React, { useState, useEffect, useCallback } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { AppState } from 'state'
import { useDispatch, useSelector } from 'react-redux'
import Moralis from 'moralis'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

import { Text, Card as Existing, EggCard, VideoPlayer } from 'components'
import { getMilliseconds, getDaysHours } from 'util/timeHelpers'
import { breedTimeouts, eggTimeout } from 'constants/constants'
import { addAnimal, addEgg, burnEgg } from 'state/actions'
import NewAnimalCard from 'components/NewAnimal/NewAnimalCard'
import { RarityColor } from 'enums/rarity-color'
import { AnimalCard } from 'components/AnimalCard'
import useWeb3 from 'hooks/useWeb3'
import { getZooKeeper } from 'util/contractHelpers'
import { Animal, Egg } from 'types/zoo'
import { mapEgg, mapAnimal } from 'util/moralis'

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`

const RowTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
  font-weight: 600;
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

const Card = styled(Existing)<{ selected?: boolean; timedOut?: boolean }>`
  border: ${({ selected }) => (selected ? '2px solid white' : null)};
  opacity: ${({ timedOut }) => (timedOut ? '0.6' : null)};
`

const MyZooAccount: React.FC = () => {
  const { account, chainId } = useWeb3React()
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  const [eggType, setEggType] = useState('')
  const [isOpen, setOpen] = useState(false)
  const [_, setShowBoth] = useState(false)
  const web3 = useWeb3()
  const zooKeeper = getZooKeeper(web3, chainId)
  const videoTimeout = []
  const [newEgg, setNewEgg] = useState('')
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

  const allAnimals = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
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

    console.log('foundAnimal', foundAnimal)
    setHatched(mapAnimal(foundAnimal))
    foundAnimal.set('revealed', true)
    foundAnimal.save()
    startAnimationTimer()
  }

  const hatchEgg = async (egg) => {
    dispatch(addEgg(mapEgg(egg)))
    try {
      const gasPrice = await web3.eth.getGasPrice()
      const gasEstimate = await zooKeeper.methods.hatchEgg(1, egg.tokenID).estimateGas({ from: account })
      console.log(gasEstimate)
      await zooKeeper.methods.hatchEgg(1, egg.tokenID).send({
        from: account,
        gasPrice: gasPrice,
        gas: gasEstimate + 10000000,
      })
    } catch (error) {
      dispatch(addEgg(mapEgg(egg)))
      console.error(error)
    }
  }

  const startAnimationTimer = useCallback(() => {
    videoTimeout.push(
      setTimeout(() => {
        setOpen(true)
        setNewEgg('')
      }, 5450),
    )
    videoTimeout.push(setTimeout(() => setEggType(''), 7000))
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

  const renderAnimals = (hybrid): JSX.Element => {
    const animalGroup = {}
    const animalData = []

    Object.values(allAnimals).forEach((animal, index) => {
      if (animal.owner.toLowerCase() !== account.toLowerCase() || animal.freed || !animal.revealed) {
        return
      }
      const lastBred = animal.lastBred ? new Date(Number(animal.lastBred)).getTime() : new Date().getTime()
      const now = new Date().getTime()
      const breedTimeoutKey = animal.breedCount > 5 ? 5 : animal.breedCount || 0
      const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey])
      const elapsedTime = now - lastBred
      const timeRemaining = breedTimeout - elapsedTime
      const timeRemainingDaysHours = getDaysHours(timeRemaining)
      const barwidth = [100 * (elapsedTime / breedTimeout), '%'].join('')

      if (timeRemaining <= 0 && animalData.find((a) => a.name === animal.name && a.timeRemaining <= 0)) {
        animalGroup[animal.name] = animalGroup[animal.name] + 1 || 2
      } else {
        animalData.push({
          id: index,
          ...animal,
          name: animal.name.replace(/\u0000/g, ''),
          timeRemaining: animal.bloodline === 'pure' ? (elapsedTime < breedTimeout ? timeRemaining : 0) : 0,
          CTAOverride: animal.bloodline === 'pure' ? (elapsedTime < breedTimeout ? { barwidth, timeRemainingDaysHours } : null) : null,
          rarityColor: RarityColor[animal.rarity.toLowerCase()] || 'white',
        })
      }
    })

    const animals = sortData(
      animalData.filter((item) => item.bloodline === hybrid),
      'bloodline',
    )

    return (
      <>
        {hybrid === 'pure' ? (
          <RowTitle>
            {animals.length} {animals.length != 1 ? 'Breedable Animals' : 'Breedable Animal'}
          </RowTitle>
        ) : (
          <RowTitle>
            {animals.length} {animals.length != 1 ? 'Hybrid Animals' : 'Hybrid Animal'}
          </RowTitle>
        )}
        <RowLayout>
          <Route exact path={`${path}`}>
            {animals.length === 0 ? (
              <StyledText textAlign='center' fontSize='16px'>
                No {hybrid === 'pure' ? `breedable` : `hybrid`} animals
              </StyledText>
            ) : (
              <Swiper slidesPerView={document.body.getBoundingClientRect().width / 220} spaceBetween={4} pagination={{ clickable: true }}>
                {animals.map((animal) => (
                  <SwiperSlide style={{ width: '220px', display: 'flex' }} key={animal.tokenID}>
                    <AnimalCard {...{ animal, account, animalGroup, hybrid, allAnimals }} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Route>
          <Route exact path={`${path}/history`}>
            {animalData.map((animal) => (
              <Card key={animal.id} />
            ))}
          </Route>
        </RowLayout>
      </>
    )
  }

  const renderEggs = (): JSX.Element => {
    let eggData = []
    // let eggGroup = {
    //    BASIC: 1,
    //    HYBRID: 1
    // };

    Object.values(allEggs).forEach((egg, index) => {
      const eggType = egg.basic ? 'BASIC' : 'HYBRID'
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

    eggData = sortData(eggData, 'hybrid')

    return (
      <RowLayout>
        <Route exact path={`${path}`}>
          {eggData.length === 0 ? (
            <StyledText textAlign='center' fontSize='16px'>
              No eggs
            </StyledText>
          ) : (
            <Swiper slidesPerView={document.body.getBoundingClientRect().width / 220} spaceBetween={4} pagination={{ clickable: true }}>
              {eggData.map((egg) => (
                <SwiperSlide style={{ width: '220px', display: 'flex' }} key={egg.tokenID}>
                  {/* <CardWrapper> */}
                  <EggCard egg={egg} hatchEgg={hatchEgg} hatchEggReady={hatchEggReady} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Route>
        <Route exact path={`${path}/history`}>
          {eggData.map((egg) => (
            <Card key={egg.id} />
          ))}
        </Route>
      </RowLayout>
    )
  }

  const sortData = (data: Array<any>, byType: string) => {
    return data.sort((a, b) => {
      if (a.timeRemaining === b.timeRemaining) {
        if (a[byType]) {
          if (b[byType]) return 0
          return -1
        }
        if (b[byType]) return 1
        return 0
      }
      return a.timeRemaining - b.timeRemaining
    })
  }

  return (
    <div>
      {eggType !== '' && <VideoPlayer videoPath={eggType === 'basic' ? 'hatch_mobile_basic.mp4' : 'hatch_mobile_hybrid.mp4'} />}
      {isOpen ? (
        <NewAnimalCard animal={hatched} isOpen={setOpen} />
      ) : (
        <>
          {eggType === '' && renderEggs()}
          {eggType === '' && renderAnimals('pure')}
          {eggType === '' && renderAnimals('hybrid')}
        </>
      )}
    </div>
  )
}

export default MyZooAccount
