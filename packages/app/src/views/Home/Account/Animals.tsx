import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from 'state'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { Swiper, Slide } from 'components/Swiper'

import { Text, Card as Existing, useMatchBreakpoints } from 'components'
import { getMilliseconds, getDaysHours } from 'util/timeHelpers'
import { breedTimeouts } from 'constants/index'
import { RarityColor } from 'enums/rarity-color'
import { Animal } from 'types/zoo'
import { AnimalCard } from 'components/AnimalCard'
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
            <Swiper slidesPerView={'auto'} spaceBetween={30} pagination={{ clickable: true }}>
              {animals.map((animal) => {
                return (
                  <Slide style={{ display: 'flex', minWidth: 190, minHeight: 272, maxWidth: 215 }} key={animal.tokenID}>
                    <AnimalCard {...{ animal, account, animalGroup, hybrid, allAnimals, executeStackedBreeding }} />
                  </Slide>
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
    </>
  )
}

export default Animals
