/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  ${({ theme }) => theme.mediaQueries.xs} {
    text-align: center;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    text-align: left;
  }
`

const ContentContainer = styled.div`
  vertical-align: middle;
  align-items: center;
  display: flex;
  height: 40px;
  justify-content: space-around;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg || theme.mediaQueries.xl} {
    height: 60px;
  }
`
// min-height: 24px;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   text-align: left;
//   line-height: 1.5;
//   overflow: ellipsis;
interface CellLayoutProps {
  label?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children }) => {
  // const header = (label && <Label>{label}</Label>)
  return (
    <>
      <ContentContainer>{children}</ContentContainer>
    </>
  )
}

export default CellLayout
