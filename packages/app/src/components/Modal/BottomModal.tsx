import { CloseIcon, Flex, Heading, IconButton, Label } from "components";
import useTheme from "hooks/useTheme";
import React from "react";
import Sheet from "react-modal-sheet";
import styled from "styled-components";

interface Props {
   onDismiss?: () => null;
   header?: string;
   height?: string;
}

const HeaderOutline = styled.div`
   width: 100%;
   justify-content: center;
   display: flex;
   border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderColor}`};
   margin-bottom: 16px;
`

const BottomModal: React.FC<Props> = ({
   children,
   header,
   onDismiss,
   height,
}) => {
   const [isOpen, setOpen] = React.useState(true);
   const theme = useTheme();

   return (
      <>
         <Sheet isOpen={isOpen} onClose={onDismiss}>
            <Sheet.Container
               style={{
                  height: height ? height : "300px",
                  background: "black",
               }}>
               {/* <Sheet.Header /> */}
               <Sheet.Header>
                  <HeaderOutline>
                  <Label
                     mt="16px"
                     mb="8px"
                     textTransform="uppercase"
                     textAlign="center"
                     fontSize="22px"
                     fontWeight="600"
                  >
                     {header}
                     </Label>
                     </HeaderOutline>
                  <IconButton onClick={onDismiss} style={{position: 'absolute', background: "transparent", top: '10px', right: '10px'}}>
                     <CloseIcon />
                  </IconButton>
               </Sheet.Header>
               <Sheet.Content>
                  {children}
               </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop onTap={onDismiss} />
         </Sheet>
      </>
   );
};
export default BottomModal;
