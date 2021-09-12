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
    padding: 16px;
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
      <div className='w-full m-8'>
        <Body>
          <Label className='text-base font-bold currentColor mb-2 text-xl'>Total Daily Yield</Label>
          <Flex width='100%' alignItems='center' justifyContent='space-around'>
            <ValueWrapper> {dailyYield} ZOO Daily Yield</ValueWrapper>
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
          <Label>Recent Tansactions</Label>
          {myTransactions.length === 0 ? (
            <TableText> No Transaction Data </TableText>
          ) : (
            <Container>
              <TransactionTable Transactions={myTransactions} />
              {/* <TableContainer>
                <TableWrapper>
                  <StyledTable>
                    <TableBody className='w-full'>
                      <TableRow className='w-full'>
                        <TableHeader style={{ fontWeight: 400, width: isSm ? '100%' : '50%' }} className={`${isSm ? 'w-full' : 'w-1/2'}`}>
                          Tx Hash
                        </TableHeader>
                        <TableHeader style={{ fontWeight: 400 }}>Action</TableHeader>
                        <TableHeader style={{ fontWeight: 400 }}>Block</TableHeader>
                        <TableHeader style={{ fontWeight: 400 }}>Token ID</TableHeader>
                      </TableRow>
                      {transactions.map((tx: { hash: string; action: string; blockNumber: string; tokenID: string; url: string; id: string }) => {
                        console.log('tx', tx)
                        return (
                          <TableRow key={tx.id} className='w-full'>
                            <TableData style={{ width: `${isSm ? '100%' : '50%'}` }}>
                              <a href={`${tx.url}`} className='flex items-center gap-2'>
                                <h6 className='flex items-center hover:underline py-0.5'>{tx.hash.slice(0, 35)} ↗</h6>
                                <div className='text-green'>
                                  <CheckmarkCircleIcon width={16} height={16} />
                                </div>
                              </a>
                            </TableData>
                            <TableData>{tx.action}</TableData>
                            <TableData>{tx.blockNumber}</TableData>
                            <TableData>
                              <Link to={`/feed/myzoo/${tx.tokenID}`}>{tx.tokenID}</Link>
                            </TableData>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </StyledTable>
                </TableWrapper>
              </TableContainer>
             */}
            </Container>
          )}
        </Body>
      </div>
      {/* <div>
      <div className="flex flex-col gap-2 flex-nowrap">
      {transactions.map((hash, i) => {
        return <Transaction transaction={tx} />
      })}
    </div>
      </div> */}
    </>
  )
}

export default Bank
