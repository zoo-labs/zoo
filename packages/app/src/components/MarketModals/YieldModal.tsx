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
                    <Sheet.Container style={{height: "300px", background: "#040404"}}>
                        <Sheet.Header >
                            <Heading>
                                Yield Info
                            </Heading>

                        </Sheet.Header>
                        <Sheet.Content>
                            <Label>
                                Daily Yield
                            </Label>
                            <Text>
                                {item.yield}
                            </Text>
                            <Label>
                                Accumulated Yield
                            </Label>
                            <Text>
                                {item.yield}
                            </Text>
                        </Sheet.Content>
                    </Sheet.Container>

                    <Sheet.Backdrop/>
                </Sheet>
            </>
        );
}
export default YieldModal
