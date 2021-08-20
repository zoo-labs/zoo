import React from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from 'hooks'
import { Text } from 'components'

const HeaderOutline = styled.tr<{ fromTop: string; current: boolean }>`
  transition: opacity 0.2s ease-in;
  background: ${({ theme }) => theme.colors.tableHeader};
  border-bottom: ${({ theme }) => `3px solid ${theme.colors.borderColor}`};
  box-shadow: #3c6ebd57 0px 3px 8px -2px;
  border-radius: 16px 16px 0px 0px;
  position: ${(props) => (props.current ? null : 'sticky')};
  width: 100%;
  height: 60px;
  padding-left: 16px;
  top: ${(props) => props.fromTop};
  align-items: center;
  z-index: 99;
`

const variants = {
  SM: 'sm',
  LG: 'lg',
}

export interface TableHeaderRowProps {
  labels?: any
  actionColumnName?: string
  actionButtonScale?: string
  scrollingUp?: boolean
}

const TableHeaderRow: React.FunctionComponent<TableHeaderRowProps> = (props) => {
  const { isXl, isXs, isSm } = useMatchBreakpoints()
  const { scrollingUp, labels, actionColumnName, actionButtonScale } = props
  const isMobile = isSm || isXs
  const actionButtonSize = actionButtonScale === variants.LG ? '100%' : '50%'

  return (
    <>
      <HeaderOutline current={labels.length === 2} fromTop={scrollingUp ? (isMobile ? '15%' : '8%') : '0'}>
        {labels.map((col) => {
          console.log('col', col)
          return col.label.length > 0 || actionColumnName === col.name ? (
            <th
              style={{
                display: 'flex',
                width: `${actionColumnName === col.name ? actionButtonSize : '100%'}`,
                justifyContent: `${isMobile ? 'space-evenly' : 'space-between'}`,
                paddingLeft: '32px', // `${isMobile ? "28px" : "16px"}`,
              }}
              key={col.label}>
              <Text textAlign='center' fontWeight='550' color='label' textTransform='lowercase' fontSize={!isXl && labels.length > 3 ? '14px' : '16px'}>
                {col.label}
              </Text>
            </th>
          ) : (
            <></>
          )
        })}
      </HeaderOutline>
    </>
  )
}

export default TableHeaderRow
