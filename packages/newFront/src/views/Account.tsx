import BorderButton from 'components/Button/BorderButton'
import Page from 'components/layout/Page'
import React from 'react'
import styles from 'styled-components'
import { Text } from 'components/Text'


const HeadingContainer = styles.div`
    width: 100%;
    display: flex;
    justify-content: start;
    text-transform: uppercase;
`

const StyledButton = styles.button`
    text-decoration: underline;
    text-transform: uppercase;
`

const LabelWrapper = styles(Text)`
    color: white;
    font-weight: 600;
`

const ValueWrapper = styles(Text)`
    color: white;
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 16px;
`
// style={{textTransform: "uppercase", background: "transparent", border: "none", color: "white", marginLeft: "8px",  width: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}
const RowWrapper = styles.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const BodyContainer = styles.div`
    width: 100%;
    position: relative;
    padding: 16px 32px;
    background: black;
`

{/* <button style={{ color: "white", fontFamily: 'Space Mono, sans-serif', position: "absolute", display: "flex", right: "0", top: "0", border: "none", background: "transparent"}}> */}
const Account: React.FC = () => {

    const logoHeader = (<div style={{ display: "flex", position: "relative", width: "100%", justifyContent: "center" }}>
                            {/* <img src={logo} alt="small logo" height="100px" width="100px" /> */}
                                <BorderButton position="absolute" left="0" display="flex">
                                    {/* {state.account ? state.account[0] : 0} */}
                                <span style={{marginLeft: "4px"}}>Log Out</span>
                            </BorderButton>
                        </div>)
    
    const pageLabel = (<HeadingContainer >
                            <LabelWrapper fontWeight="550" style={{letterSpacing: "3px"}}>My Account</LabelWrapper>
                                <StyledButton style={{background: "transparent", border: "none", color: "white", marginLeft: "8px"}}>
                                    View Bank
                                </StyledButton>
                        </HeadingContainer>)
    return (
        <>
            <Page>
                {/* <div style={{ width: "100%", height: "100%", padding: "16px 32px", backgroundColor: "black"}}>        */}
                <BodyContainer>
                    {logoHeader}
                    {pageLabel}
                    {/* <h4>Chain: {chainId}</h4> */}
                    
                    <LabelWrapper>Wallet Balance</LabelWrapper>
                    <RowWrapper>
                        <ValueWrapper>
                            Balance
                        </ValueWrapper>
                        <BorderButton>
                            Add Funds
                        </BorderButton>
                    </RowWrapper>
                    <LabelWrapper >Eggs Owned </LabelWrapper>
                    <RowWrapper >
                        <ValueWrapper >
                        0
                        </ValueWrapper>
                        <BorderButton >
                            Buy Eggs
                        </BorderButton>
                    </RowWrapper>
                    {/* </div> */}
                    </BodyContainer>
            </Page>
        </>
    )
}

export default Account