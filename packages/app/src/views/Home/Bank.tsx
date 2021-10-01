import BorderButton from 'components/Button/BorderButton'
import styled from 'styled-components'
import StickyBottomMenu from 'components/Button/StickyBottomMenu'
import Page from 'components/layout/Page'
import React, { useState, useEffect } from 'react'
import { AppState } from 'state'
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3 } from 'hooks/useWeb3'
import { useHistory } from 'react-router-dom'
import styles from 'styled-components'
import { Label, Text } from 'components/Text'
import { Flex } from 'components'
import Body from 'components/layout/Body'
import TransactionTable from 'components/Transaction/Table'

const ValueWrapper = styles(Text)`
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
`

const EarnerValueWrapper = styles(Text)`
   color: ${({ theme }) => theme.colors.text};
   width: 100%;
   flex-direction: column;
   overflow: hidden;
   text-overflow: ellipsis;
   padding: 12px 16px;
`

const EarnerValue = styles(Text)`
   color: ${({ theme }) => theme.colors.text};
   font-size: 18px;
   line-height: 1.8;
`

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  border-radius: 16px;
  min-width: 280px;
`

const TableText = styled(Text)`
  width: 100%;
  text-align: center;
  margin: 20px 0px;
  font-size: 16px;
`

const Bank: React.FC = () => {
  const web3 = useWeb3()
  const { account } = web3
  const animalsState = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
  const myTransactions = useSelector<AppState, AppState['zoo']['myTransactions']>((state) => state.zoo.myTransactions)

  const accountAnimals = Object.values(animalsState).filter((animal) => {
    if (!animal.owner || !account) return false
    return animal.owner && animal.owner.toLowerCase() === account.toLowerCase()
  })
  const dispatch = useDispatch()

  // Calculate yield
  const dailyYield = accountAnimals.reduce((acc, x) => acc + Number(x.yield), 0)

  // Get top ten animals
  const topTenAnimals = accountAnimals.sort((a, b) => Number(b.yield) - Number(a.yield)).slice(0, 10)

  return (
    <>
      <div className='flex flex-col relative filter drop-shadow z-10 w-full'>
        <div className='flex flex-col h-full'>
          {/* <div className='p-5 flex flex-col'>
            <Label className='text-base font-bold currentColor mb-2 text-xl'>Total Daily Yield</Label>
            <Flex width='100%' alignItems='center' justifyContent='space-around'>
              <ValueWrapper>{dailyYield} ZOO Daily Yield</ValueWrapper>
            </Flex>
            <Label>Top Earners</Label>
            {topTenAnimals.length === 0 ? (
              <ValueWrapper style={{ justifyContent: 'center' }}> No animals </ValueWrapper>
            ) : (
              <EarnerValueWrapper style={{ marginLeft: -16 }}>
                {topTenAnimals.map((animal) => {
                  return (
                    <EarnerValue key={animal.tokenID + '_earner_'}>
                      {animal.name} - {animal.yield}/day
                    </EarnerValue>
                  )
                })}
              </EarnerValueWrapper>
            )}
          </div> */}
          <Label>Recent Tansactions</Label>
          {myTransactions.length === 0 ? (
            <TableText> No Transaction Data </TableText>
          ) : (
            <Container>
              <TransactionTable Transactions={myTransactions} />
            </Container>
          )}
        </div>
      </div>
    </>
  )
}

export default Bank
