import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 200px;
    padding-right: 200px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 150px;
    padding-right: 150px;
  }
`

export default Container
