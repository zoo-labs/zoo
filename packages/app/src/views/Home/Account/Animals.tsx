import { useWeb3React } from '@web3-react/core'
import { Card as Existing, Text, useMatchBreakpoints, useWeb3 } from 'components'
import { AnimalCard } from 'components/AnimalCard'
import { breedTimeouts } from 'constants/index'
import { RarityColor } from 'enums/rarity-color'
import { useZooKeeper } from 'hooks/useContract'
import Moralis from 'moralis'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useRouteMatch } from 'react-router-dom'
import { AppState } from 'state'
import { useBreedConfirmModalToggle } from 'state/application/hooks'
import { addAnimal } from 'state/zoo'
import styled from 'styled-components'
import 'swiper/components/pagination/pagination.min.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { Animal } from 'types/zoo'
import { getDaysHours, getMilliseconds } from 'util/timeHelpers'
import BreedConfirmationModal from '../../../components/modals/BreedConfirmation'

interface AnimalsProps {
  hybrid: string
}
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
const Animals: React.FC<AnimalsProps> = ({ hybrid }) => {
  const { account, chainId } = useWeb3React()
  const { path } = useRouteMatch()
  const { isSm, isMd, isLg, isXl, isXs } = useMatchBreakpoints()

  const allAnimals = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
  const animalGroup = {}
  const animalData = []
  const web3 = useWeb3()
  const zooKeeper = useZooKeeper()

  const dispatch = useDispatch()
  Object.values(allAnimals).forEach((animal, index) => {
    if ((animal && animal.owner && account && animal.owner.toLowerCase() !== account.toLowerCase()) || animal.freed || !animal.revealed) {
      return
    }
    const lastBred = animal.lastBred ? new Date(Number(animal.lastBred)).getTime() : new Date().getTime()
    const now = new Date().getTime()
    const breedTimeoutKey = animal.breedCount > 5 ? 5 : animal.breedCount || 0
    const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey])
    const elapsedTime = now - lastBred
    const timeRemaining = breedTimeout - elapsedTime
    // const timeRemaining = 60
    // console.log('lastBred', lastBred)
    // console.log('timeRemaining', timeRemaining)
    // console.log('animal.breedCount', animal.breedCount)

    // console.log('breedTimeoutKey', breedTimeoutKey)

    // console.log('breedTimeout', breedTimeout)
    // console.log('elapsedTime', elapsedTime)
    const timeRemainingDaysHours = getDaysHours(timeRemaining)
    const barwidth = [100 * (elapsedTime / breedTimeout), '%'].join('')
    if (timeRemaining <= 0 && animalData.find((a) => a.name === animal.name && a.timeRemaining <= 0)) {
      animalGroup[animal.name] = animalGroup[animal.name] ? [...animalGroup[animal.name], animal] : [animal]
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
  const sortData = (data: Array<any>, byType: string) => {
    return data.sort((a, b) => Number(b.tokenID) - Number(a.tokenID))
  }
  const animals = sortData(
    animalData.filter((item) => item.bloodline === hybrid),
    'bloodline',
  )
  const points = useMatchBreakpoints()
  const executeStackedBreeding = (a: Animal) => {
    console.log('EXECUTING STACKED BREEDING', points)
  }
  const breed = async (arrayValues) => {
    var an1 = parseInt(arrayValues[0].tokenID)
    var an2 = parseInt(arrayValues[1].tokenID)
    const isBreedingStackedAnimal = an1 === an2
    if (an1 === an2) {
      an2 = animalGroup[arrayValues[0].name][0].tokenID
    }

    const anOb = Moralis.Object.extend('Animals')
    const anQ1 = new Moralis.Query(anOb)
    const anQ2 = new Moralis.Query(anOb)
    anQ1.equalTo('tokenID', an1)
    anQ2.equalTo('tokenID', an2)
    const res1 = await anQ1.find()
    const res2 = await anQ2.find()
    const aniM1 = res1[0]
    const aniM2 = res2[0]
    const mArray = [aniM1, aniM2]

    try {
      await zooKeeper.methods
        .breedAnimals(1, an1, an2)
        .send({ from: account })
        .then((res) => {
          console.log(res)
          const TransOb = Moralis.Object.extend('Transactions')
          const newTrans = new TransOb()

          // //
          // // Get next timestamp token can be bred
          // function breedNext(uint256 tokenID) public view returns (uint256) {
          //     IZoo.Token memory token = tokens[tokenID];
          //     return token.breed.timestamp + (token.breed.count * 1 days);
          // }

          // // Check whether token is ready to breed again
          // function breedReady(uint256 tokenID) public view returns (bool) {
          //     // Never bred? Lets go
          //     if (tokens[tokenID].breed.count == 0) {
          //         return true;
          //     }
          //     // If current timestamp is greater than the next breed time, lets go
          //     if (block.timestamp > breedNext(tokenID)) {
          //         return true;
          //     }

          //     // Not ready
          //     return false;
          // }

          newTrans.set('from', account)
          newTrans.set('action', 'Bred Animals')
          // newTrans.set('tokenID', parseInt(egg.tokenID));
          newTrans.set('parentA', aniM1.attributes.Name)
          newTrans.set('parentB', aniM2.attributes.Name)
          newTrans.save()

          // breed.count
          dispatch(addAnimal({ ...arrayValues[0], selected: false }))
          dispatch(addAnimal({ ...arrayValues[1], selected: false }))
          onConfirm()
        })
    } catch (error) {
      console.log('error in hybrid', error)
      onConfirm()
    }
  }
  const breedClick = (animal) => {
    const selected = Object.values(allAnimals).filter((item) => item.selected)
    const toSet: Animal = { ...animal }
    console.log(animalGroup)

    if (animal.selected && selected.length === 1 && animalGroup[animal.kind] && animalGroup[animal.kind].length > 1) {
      const multipleAvailable = Object.values(allAnimals).filter((item) => item.kind === animal.kind && item.timeRemaining === 0)
      const temp = [{ ...multipleAvailable[0] }, { ...multipleAvailable[1] }]
      // array = temp
      onConfirm()
    }

    toSet.selected = animal.selected ? false : true

    if ((!animal.selected && selected.length === 1) || (animalGroup[animal.name] && animal.selected && selected.length === 1)) {
      const temp = [{ ...selected[0] }, { ...animal }]
      // array = temp
      onConfirm()
    }

    dispatch(addAnimal(toSet))
  }
  const onConfirm = useBreedConfirmModalToggle()

  return (
    <>
      {hybrid === 'pure' ? (
        <RowTitle>
          {animals.length} {animals.length != 1 ? 'Animals' : 'Animal'}
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
              No {hybrid === 'pure' ? '' : `hybrid `}animals
            </StyledText>
          ) : (
            // <Swiper slidesPerView={'auto'} spaceBetween={30} pagination={{ clickable: true }}>
            //   {animals.map((animal) => {
            //     return (
            //       <SwiperSlide style={{ display: 'flex', minWidth: 190, minHeight: 272, maxWidth: 215 }} key={animal.tokenID}>
            //         <AnimalCard {...{ animal, account, animalGroup, hybrid, allAnimals, executeStackedBreeding, breedClick }} />
            //       </SwiperSlide>
            //     )
            //   })}
            // </Swiper>
            <Swiper
              slidesPerView={isSm ? 2 : isMd ? 6 : 12}
              spaceBetween={isSm ? 4 : isMd ? 15 : 30}
              pagination={{
                clickable: true,
              }}
              className='mySwiper'>
              {animals.map((animal) => {
                return (
                  <SwiperSlide key={animal.tokenID} style={{ minWidth: 150 }}>
                    <div className='flex items-center' style={{ height: 270, width: '100%' }}>
                      <AnimalCard {...{ animal, account, animalGroup, hybrid, allAnimals, executeStackedBreeding, breedClick }} />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          )}
        </Route>
        <Route exact path={`${path}/history`}>
          {animalData.map((animal) => (
            <Existing key={animal.tokenID} />
          ))}
        </Route>
      </RowLayout>
      <BreedConfirmationModal breed={(arrayValues) => breed(arrayValues)} />
    </>
  )
}

export default Animals
