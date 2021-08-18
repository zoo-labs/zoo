import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
    padding-right: 32px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 48px;
    padding-right: 48px;
  }
`

export default Container
