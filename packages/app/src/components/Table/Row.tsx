import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from 'hooks'
import { Text } from 'components'
import TxHash, { TxHashProps } from './TxHash'
import Farm, { FarmProps } from './Farm'
import Status, { StatusProps } from './Status'
import Details from './Details'
import Timestamp, { TimestampProps } from './Timestamp'
import TxAction, { TxActionProps } from './TxAction'
import Block, { BlockProps } from './Block'
import { DesktopColumnSchema, MobileColumnSchema } from './types'

export interface Transaction {
  txHash: string
  block: number
  timestamp: string
  status: number
  from: string
  to: string
  transactionFee: string
  gasInfo: string
  action: string
  txAction: string
  tokenTransfer: string
}

export interface RowProps {
  txHash?: TxHashProps
  status: StatusProps
  timestamp?: TimestampProps
  block: BlockProps
  details?: Transaction
  txAction: TxActionProps
  from: FromProps
  to: ToProps
  isLastIndex?: boolean
}
export interface FromProps {
  from: string
}
export interface ToProps {
  to: string
}

const cells = {
  txHash: TxHash,
  farm: Farm,
  status: Status,
  details: Details,
  timestamp: Timestamp,
  block: Block,
  txAction: TxAction,
}

const Action = styled.div`
  font-size: 10px;
  font-weight: 350;
  color: ${(props) => props.theme.colors.data};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #2b7eff;
  border-radius: 20px;
  color: #2b7eff;
  padding: 2px 4px;
  transition: all 0.2s;

  ${({ theme }) => theme.mediaQueries.lg || theme.mediaQueries.xl} {
    font-size: 18px;
    padding: 3px 9px;
  }
  ${({ theme }) => theme.mediaQueries.sm || theme.mediaQueries.md} {
    font-size: 14px;
    padding: 3px 6px;
  }

  &:hover {
    transition: all 0.2s;
    color: ${({ theme }) => theme.colors.secondaryDark};
    border: ${({ theme }) => `2px solid ${theme.colors.secondaryDark}`};
  }
`

const StyledTr = styled.tr<{ isLastIndex: boolean }>`
  border-bottom: ${({ isLastIndex, theme }) => (isLastIndex ? 'transparent' : `2px solid ${theme.colors.inputSecondary}`)};
  padding-left: 24px;
  display: flex;
  justify-content: space-around;
  text-align: left;
  width: 100%;
  align-items: start;
  flex-direction: row;

  ${({ theme }) => theme.mediaQueries.lg || theme.mediaQueries.xl} {
    padding-left: 32px;
    padding-right: 0px;
  }
`

const ValueContainer = styled.td`
  vertical-align: middle;
  align-items: center;
  display: flex;
  height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: end;
  width: 100%;
  font-size: 14px;

  ${({ theme }) => theme.mediaQueries.lg || theme.mediaQueries.xl} {
    height: 100px;
    font-size: 18px;
  }
`

const Row: React.FunctionComponent<RowProps> = (props) => {
  const { details, isLastIndex } = props
  const [actionPanelToggled, setActionPanelToggled] = useState(false)

  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }

  const { isXl } = useMatchBreakpoints()

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    // {React.createElement(cells[key], props[key])}
    // if (!isXs) {
    return (
      <StyledTr isLastIndex={isLastIndex} onClick={toggleActionPanel}>
        {Object.keys(props).map((key) => {
          const value = props[key][key] ? props[key][key] : props[key]
          console.log(value)
          console.log('props key:', props[key])
          const columnIndex = columnNames.indexOf(key)
          if (columnIndex === -1) {
            return null
          }

          /* switch (key) {
              case 'details':
                return (
                  <ValueContainer style={{width: "50%", paddingRight: `${isMobile ? "16px" : "32px"}`}} key={tableSchema[columnIndex].label}>
                        <Details actionPanelToggled={actionPanelToggled} />
                  </ValueContainer>
                )
              case 'farm':
                return null
              case 'txHash':
                return (
                  <ValueContainer align="left" style={{width: "100%", display: "flex", alignItems: "center", }} key={tableSchema[columnIndex].label}>
                        <TxHash {...props.txHash} />
                  </ValueContainer>
                )
              default: */
          return (
            <ValueContainer
              align='left'
              style={{ width: '100%', display: 'flex', overflow: 'hidden', textOverflow: 'ellipsis', alignItems: 'center' }}
              key={tableSchema[columnIndex].label}>
              <Text>{value}</Text>
            </ValueContainer>
          )
          // }
        })}
      </StyledTr>
    )
  }

  return <>{handleRenderRow()}</>
}

export default Row
