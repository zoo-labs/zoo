import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import { LinkExternal, LinkExternalCustom, Text, ChevronRightIcon, Flex } from 'toolkitUI'
import { updateOne as updateTransaction } from 'state/zapTransactions/actions'
import useWeb3 from 'hooks/useWeb3'
import { useAppDispatch, AppState} from 'state'
import { useSelector } from 'react-redux'
import { Transaction } from '../../../../../state/types'
import { TxHashProps } from '../TxHash'
import { TimestampProps } from '../Timestamp'
import { BlockProps } from '../Block'
import { ActionContainer, ActionTitles, ActionContent, Subtle } from './styles'


export interface ActionPanelProps {
  txHash: TxHashProps
  timestamp: TimestampProps
  block: BlockProps
  details: Transaction
  farm
  status
}

const AnimationDiv = styled.div`
  box-shadow: 0 4px 10px 0 rgba(33, 33, 33, 0.15);
  border-radius: 4px;
  height: 23px;
  position: relative;
  overflow: hidden;
  width: 30px;
  background-color: ${({ theme }) => theme.colors.background === "#F0F6FF" ? "#e9e5e5" : "#101b29"};
  /* #c5c5c5; */
  &::before{
    content: '';
    display: block;
    position: absolute;
    left: -50px;
    top: 0;
    height: 100%;
    width: 30px;
    background: ${({ theme }) => theme.colors.background === "#F0F6FF" ? "linear-gradient(to right, transparent 0%, #babcbe 50%, transparent 100%)" : "linear-gradient(to right, transparent 0%, #1d4271 50%, transparent 100%)"};
    animation: load 1.5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
  }
  @keyframes load {
    from {
        left: -50px;
    }
    to   {
        left: 10px;
    }
  }
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  min-width: 200px;
  flex-direction: column;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.innerTableInset};

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const StyledLinkExternalCustom = styled(LinkExternalCustom)`
  font-weight: 400;
`

const FromToContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const ValueContainer = styled.div`
  display: block;
  margin-left: 10px;
  margin-top: 15px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0px;
    margin-left: 30px;
  }
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, txHash, block }) => {
  const transaction: any = details
  const TranslateString = useI18n()
  const dispatch = useAppDispatch()
  const transactions = useSelector<AppState, AppState['zapTransactions']['transactionsList']>((state) => state.zapTransactions.transactionsList)

  console.log(transactions, "HERE")

  const scannerLinks = {
    1: `https://etherscan.io`,
    42: `https://kovan.etherscan.io`,
    56: 'https://bscscan.com',
    97: 'https://testnet.bscscan.com'
  }
  
  const { chainId } = useWeb3React()
  const web3 = useWeb3()
  const base = scannerLinks[chainId] ? scannerLinks[chainId] :  `https://etherscan.io`

  const esc = `${base}/tx/${txHash.txHash}`
  const escBlock = `${base}/block/${block.block}`
  const escFrom = `${base}/address/${transaction.from.toLowerCase()}`

  const escTo = `${base}/address/${transaction.to.toLowerCase()}`

  const BSC = chainId === 56 || chainId === 97

  const updateGas = async() => {
    const temp = transactions[transaction.txHash]
    console.log(temp)
    try {
      const gasInfoOb = await web3.eth.getTransactionReceipt(transaction.txHash)
      const gasPriceOB = await web3.eth.getTransaction(transaction.txHash)
      const gasInfo = (gasInfoOb === null || gasInfoOb === undefined ) ? "-" : `${gasInfoOb.gasUsed} gas used`
      const transactionFee =
            (gasInfoOb === null || gasInfoOb === undefined || gasPriceOB === null || gasPriceOB === undefined )
            ? "0"
            :  (Number(web3.utils.fromWei(String(Number(gasPriceOB.gasPrice) * Number(gasInfoOb.gasUsed)),'ether'))).toString()
          dispatch<any>(updateTransaction({ one: {...temp, gasInfo, transactionFee } }))
      
    } catch (error) {
      console.log('Error occured !!!', error, transaction.txHash)
    }
  }

  React.useEffect(()=>{
    updateGas()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  function abbreviateAddress(address = "", lengthStart = 6, lengthEnd = 4) {
    return `${address.substring(0, lengthStart)}...${address.substring(
      address.length - lengthEnd,
      address.length
    )}`;
  }

  return (
    <Container>
      <ActionContainer>
        <ActionTitles>
          <FromToContainer>
            <StyledLinkExternalCustom href={escFrom}>{abbreviateAddress(transaction.from.toLowerCase())}</StyledLinkExternalCustom>
            <ChevronRightIcon />
            <StyledLinkExternalCustom href={escTo}>{abbreviateAddress(transaction.to.toLowerCase())}</StyledLinkExternalCustom>
          </FromToContainer>
          <Subtle>{TranslateString(999, 'Transaction Fee:')}</Subtle>
          {
            (transaction.transactionFee === "")
            ? <AnimationDiv/>
            : (<Text>{BSC ? `${transaction.transactionFee} BNB`:`${transaction.transactionFee} ether`}</Text>)
          }
          {/* <Text>{BSC ? `${Number(transaction.transactionFee).toString()} BNB`:`${Number(transaction.transactionFee).toString()} ether`}</Text> */}
          <Subtle>{TranslateString(999, 'Token Transfer:')}</Subtle>
          <Text>{transaction.tokenTransfer}</Text>
          <Subtle>{TranslateString(999, 'Gas Info:')}</Subtle>
          {
            (transaction.gasInfo === "")
            ? <AnimationDiv/>
            : (<Text>{transaction.gasInfo}</Text>)
          }
          {/* <Text>{transaction.gasInfo}</Text> */}
        </ActionTitles>
        <ActionContent>
          {/* <UnlockButton width="100%" /> */}
        </ActionContent>
      </ActionContainer>
      <Flex width="40%" alignItems="center">
        <ValueContainer>
          <StyledLinkExternal href={esc}>{TranslateString(999, 'View Transaction Hash')}</StyledLinkExternal>
          <StyledLinkExternal href={escBlock}>{TranslateString(999, 'View Block')}</StyledLinkExternal>
        </ValueContainer>
      </Flex>
    </Container>
  )
}

export default ActionPanel
