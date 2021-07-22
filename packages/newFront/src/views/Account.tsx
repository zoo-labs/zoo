import Page from 'components/layout/Page'
import React, { useState } from 'react'
import styles from 'styled-components'
import { Label, Text } from 'components/Text'
import { BorderButton, Heading, LinkButton } from 'components'
import Body from 'components/layout/Body'


const HeadingContainer = styles.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: end;
`

const LabelWrapper = styles.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`

const ValueWrapper = styles(Text)`
    color: white;
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 16px;
`

const Account: React.FC = () => {
    const [eggsOwned, setEggsOwned] = useState(0)

    const pageHeading = (<HeadingContainer >
                            <Heading >My Account</Heading>
                                <LinkButton >
                                    View Bank
                                </LinkButton>
                        </HeadingContainer>)
    return (
        <>
            <Page>
                {pageHeading}
                <Body>
                    <LabelWrapper>
                        <Label>
                            Wallet Balance
                            </Label>
                        <BorderButton>
                                Add Funds
                            </BorderButton>
                    </LabelWrapper>
                        <ValueWrapper>
                                Balance
                            </ValueWrapper>
                            
                    <LabelWrapper >
                        <Label>
                          {eggsOwned} Eggs Owned
                        </Label>
                        <BorderButton >
                            Buy Eggs
                        </BorderButton>
                         </LabelWrapper>
                    </Body>
            </Page>
        </>
    )
}

export default Account