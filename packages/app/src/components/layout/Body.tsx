import React from 'react'
import styles from 'styled-components'

const BodyContainer = styles.div`
    width: 100%;
    // position: relative;
    padding: 16px;
    // background: ${({ theme }) => theme.colors.card};;
`

const Body: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <BodyContainer {...props}>{children}</BodyContainer>
    </>
  )
}

export default Body
