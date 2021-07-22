
import React, { memo } from 'react'
import styled from 'styled-components'
import  useMatchBreakpoints  from '../../../hooks/useMatchBreakpoints'
import loadingCoinGif from "../Gifs/LoadingCoinGif.gif"

const LoadingCoinWrapper = styled.img<{isMobileView: boolean}>`
    width: 60px;
    height: 60px;
`
// (property) JSX.IntrinsicElements.img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
// const LoadingCoin: React.FC = memo(() => {
//     const { isXl } = useMatchBreakpoints()
//     const gifCoin = (<img src={loadingCoinGif} alt="loading data..." />)
//     return (
//         <LoadingCoinWrapper src={loadingCoinGif} alt='loading data...' isMobileView={!isXl} />
//         <Image src={loadingCoinGif} alt='loading data...' width={60} height={60} />
//     )
// })
  
const LoadingCoin: React.FC = () => {
     const { isXl } = useMatchBreakpoints()
   
    return (
           <img style={{width: '25%', height: '25%'}} src={loadingCoinGif} alt="loading data..." />
    )
}

export default LoadingCoin
