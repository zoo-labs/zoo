import { Heading, Label } from 'components';
import useTheme from 'hooks/useTheme';
import React from 'react';
import Sheet from 'react-modal-sheet';

interface Props {
    onDismiss?: () => null
    header?: string
}


const BottomModal: React.FC<Props> = ({ children, header,  onDismiss }) => {
    const [isOpen, setOpen] = React.useState(true);
    const theme = useTheme();

        return (
            <>
                <Sheet isOpen={isOpen} onClose={onDismiss} >
                    <Sheet.Container style={{height: "300px", background: "black"}}>
                        <Sheet.Header />
                           <Sheet.Header>
                             <Label  mt="8px" mb="4px" textTransform="uppercase" textAlign="center" fontSize="22px" fontWeight="600" style={{color: "#C82064"}}>
                                {header}
                            </Label>
                        </Sheet.Header>
                        <Sheet.Content>
                            {children}
                        </Sheet.Content>
                    </Sheet.Container>

                    <Sheet.Backdrop />
                </Sheet>
            </>
        );
}
export default BottomModal
