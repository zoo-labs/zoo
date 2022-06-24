import React from 'react'
import TwoColumComp from '../Grid/TwoColumComp'
import HomeCard from './HomeCard'
import WelcomeCard from './WelcomeCard'

const MarketHero = () => {
  return (
    <TwoColumComp AddClass="mt-5 lg:mt-1" LeftCol={<WelcomeCard />} RightCol={<HomeCard></HomeCard>}></TwoColumComp>
  )
}

export default MarketHero
