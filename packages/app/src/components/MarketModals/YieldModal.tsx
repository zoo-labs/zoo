import React from 'react';
import Sheet from 'react-modal-sheet';

interface Props {
    onDismiss?: () => null
    item: any
    Moralis?: any
}


const YieldModal: React.FC<Props> = ({ item,   onDismiss,  Moralis }) => {
    const [isOpen, setOpen] = React.useState(true);

        return (
            <>
                <Sheet isOpen={isOpen} onClose={onDismiss} >
                    <Sheet.Container style={{height: "300px"}}>
                        <Sheet.Header />
                        <Sheet.Content>{/* content */}</Sheet.Content>
                    </Sheet.Container>

                    <Sheet.Backdrop />
                </Sheet>
            </>
        );
}
export default YieldModal
