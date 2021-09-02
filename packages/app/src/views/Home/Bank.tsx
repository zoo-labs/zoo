import BorderButton from 'components/Button/BorderButton'
import styled from 'styled-components'
import StickyBottomMenu from 'components/Button/StickyBottomMenu'
import Page from 'components/layout/Page'
import React, { useState, useEffect } from 'react'
import { AppState } from 'state'
import { useSelector } from 'react-redux'
import { useWeb3 } from 'hooks/useWeb3'
import { useHistory } from 'react-router-dom'
import styles from 'styled-components'
import { Label, Text } from 'components/Text'
import { CheckmarkCircleIcon, Flex, Heading } from 'components'
import Body from 'components/layout/Body'
import { useModal } from 'components/Modal'
import BuyEggs from 'components/BuyEggs'
import { getToken, getFaucet } from 'util/contracts'
import { useMatchBreakpoints } from 'components'
import { FaHome } from 'react-icons/fa'
import Moralis from 'moralis'
import { resourceLimits } from 'worker_threads'
import { Link } from 'react-router-dom'
import Transaction from 'components/Transaction'
import TransactionTable from 'components/Transaction/Table'

const HeaderFrame = styles.div<{ isSm: boolean }>`
  grid-template-columns: 1fr 120px;
  -moz-box-pack: justify;
  -moz-box-align: center;
  flex-direction: row;
  top: 0px;
  padding: 1rem;
  z-index: 21;
  position: relative;
  background-image: linear-gradient(transparent 50%, rgb(25, 27, 31) 50%);
  background-position: 0px 0px;
  background-size: 100% 200%;
  box-shadow: transparent 0px 0px 0px 1px;
  transition: background-position 0.1s ease 0s, box-shadow 0.1s ease 0s;
  background-blend-mode: hard-light;
  display: grid;
  width: 100%;
  ${({ isSm }) => (isSm ? 'grid-template-columns: 1fr; padding: 1rem' : '')};
`

const HeadingContainer = styles.div`
    width: 100%;
    display: flex;
    justify-content: start;
    margin: 0px 8px;
`

const StyledButton = styles.button`
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
    background: transparent;
    border: none;
    margin-top: 1px;
    margin-left: 16px;
`

const LabelWrapper = styles.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    color: ${({ theme }) => theme.colors.text};
`

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
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  min-width: 280px;
`

const TableWrapper = styled.div`
  flex-direction: row;
  flex: 1 1 auto;
  -webkit-box-pack: start;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  display: flex;
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 16px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: relative;
  overflow-x: scroll;
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${({ theme }) => theme.colors.primaryPop};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primaryPop};
  }
  &::-webkit-scrollbar {
    height: 7px;
  }
`

const TableBody = styled.tbody`
  width: fit-content;
  & tr {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    td {
      font-size: 16px;
      vertical-align: left;
    }
    th {
      vertical-align: left;
    }
  }
`

const TableRow = styled.tr`
  color: white;
`

const TableContainer = styled.div`
  position: relative;
`

const TableData = styled.td`
  width: 100px;
  margin: 5px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TableHeader = styled.th`
  width: 100px;
  margin: 15px 0px;
  font-weight: 600;
  text-align: left;
  font-size: 18px;
`

const TableText = styled(Text)`
  width: 100%;
  text-align: center;
  margin: 20px 0px;
  font-size: 16px;
`

const StyledHeading = styled(Heading)`
  color: ${({ theme }) => theme.colors.text};
`

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`

function numberWithCommas(num) {
  const values = num.toString().split('.')
  return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + (values.length == 2 ? '.' + values[1] : '')
}

const Bank: React.FC = () => {
  const web3 = useWeb3()
  const { account, chainID } = web3
  const history = useHistory()
  const { isXl, isSm } = useMatchBreakpoints()

  const animalsState = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)

  const [zooBalance, setBalance] = useState(0.0)
  const [wait, setWait] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [waitTx, setWaitTx] = useState(true)

  const zooToken = getToken(web3)
  const faucet = getFaucet(web3)

  const accountAnimals = Object.values(animalsState).filter((animal) => {
    if (!animal.owner || !account) return false
    return animal.owner && animal.owner.toLowerCase() === account.toLowerCase()
  })

  const getBalance = async () => {
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(account).call()
      const divisor = parseFloat(Math.pow(10, decimals).toString())
      const balance = rawBalance / divisor
      setBalance(balance)
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
    }
  }

  useEffect(() => {
    getBalance()
    getTransactions()
  }, [account])

  useEffect(() => {
    getBalance()
  }, [])

  const handleFaucet = () => {
    try {
      setWait(true)
      faucet.methods
        .fund(account)
        .send({ gas: 21000, from: account })
        .then(() => {
          setWait(false)
          getBalance()
        })
        .catch((e) => {
          console.error('ISSUE USING FAUCET \n', e)
          setWait(false)
        })
      getBalance() // update balance
    } catch (e) {
      console.error('ISSUE USING FAUCET \n', e)
    }
  }

  const handleFunds = () => {
    switch (chainID) {
      case 1337:
        handleFaucet()
        break
      case 97:
        handleFaucet()
        break
      default:
        // eslint-disable-next-line no-restricted-globals
        location.href = 'https://pancakeswap.info/token/0x19263f2b4693da0991c4df046e4baa5386f5735e'
    }
  }

  const getTransactions = async () => {
    console.log('GETTING TRANSACTIONS for account', account)
    try {
      const Transactions = Moralis.Object.extend('Transactions')
      const query = new Moralis.Query(Transactions)
      query.limit(1000)
      query.descending('createdAt')
      query.equalTo('from', account.toLowerCase())
      const results = await query.find()
      let transactions = []
      for (const tx of results) {
        const action = tx.get('action')
        const txHash = tx.get('transactionHash')
        const url = `https://testnet.bscscan.com/tx/${txHash}`

        // Filter out Burned Tokens
        if (action == 'Burned Token') continue

        console.log('tx', tx)
        transactions.push({
          id: tx.get('objectId'),
          from: tx.get('from'),
          action: action,
          hash: txHash,
          url: url,
          createdAt: tx.get('createdAt').toLocaleDateString(),
          blockNumber: tx.get('blockNumber'),
          timestamp: tx.get('timestamp'),
          tokenID: tx.get('tokenID'),
        })
      }
      console.log('transactions', transactions)
      setTransactions(transactions)
      setWaitTx(false)
    } catch (e) {
      console.error('ISSUE GETTING TRANSACTIONS \n', e)
    }
  }

  // Calculate yield
  const dailyYield = accountAnimals.reduce((acc, x) => acc + Number(x.yield), 0)

  // Get top ten animals
  const topTenAnimals = accountAnimals.sort((a, b) => Number(b.yield) - Number(a.yield)).slice(0, 10)

  const pageHeading = (
    <HeadingContainer>
      <StyledHeading>My Bank</StyledHeading>
      <StyledButton onClick={() => history.push('/account')}>View Account</StyledButton>
    </HeadingContainer>
  )

  return (
    <>
      <div className='w-full'>
        <Body>
          <Label style={{ marginLeft: -8, fontSize: '20px' }}>Total Daily Yield</Label>
          <Flex width='100%' alignItems='center' justifyContent='space-around' style={{ marginLeft: -16 }}>
            <ValueWrapper> {dailyYield} ZOO </ValueWrapper>
          </Flex>
          <Label style={{ marginLeft: -8, fontSize: '20px' }}>Top Earners</Label>
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
          <Label style={{ marginLeft: -8, fontSize: '20px' }}>Recent Tansactions</Label>
          {waitTx ? (
            <TableText> Loading Transactions... </TableText>
          ) : transactions.length === 0 ? (
            <TableText> No Transaction Data </TableText>
          ) : (
            <Container style={{ marginLeft: -8 }}>
              <TransactionTable Transactions={transactions} />
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
