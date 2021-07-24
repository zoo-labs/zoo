import React from 'react';
import Sheet from 'react-modal-sheet';
import styled from 'styled-components';
import { Heading, Label, Text, Flex } from 'components'

interface Props {
    onDismiss?: () => null
    item?: any
    Moralis?: any
}


const YieldModal: React.FC<Props> = ({ item,   onDismiss,  Moralis }) => {
    const [isOpen, setOpen] = React.useState(true);

        return (
            <>
                <Sheet isOpen={isOpen} onClose={onDismiss} >
                    <Sheet.Container style={{height: "300px", background: "#040404cf"}}>
                        <Sheet.Header >
                            <Heading ml="8px" mt="8px" textAlign ="center" fontSize="32px">
                                Yield Info
                            </Heading>

                        </Sheet.Header>
                        <Sheet.Content>
                            <Flex justifyContent="center" alignContent="center" flexDirection="column" ml="20px" mt="20px">
                                <Label fontSize="22px">
                                    Daily Yield
                                </Label>
                                <Text bold fontSize="22px">
                                    {item.yield}
                                </Text>
                                <Label fontSize="22px">
                                    Accumulated Yield
                                </Label>
                                <Text bold fontSize="22px">
                                    {Math.floor(item.yield * (Math.random() * (12 - 1) + (1)))}
                                </Text>

                            </Flex>
                        </Sheet.Content>
                    </Sheet.Container>

                    <Sheet.Backdrop/>
                </Sheet>
            </>
        );
}
export default YieldModal
