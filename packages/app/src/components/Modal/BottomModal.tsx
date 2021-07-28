import { CloseIcon, Flex, Heading, IconButton, Label } from "components";
import useTheme from "hooks/useTheme";
import React from "react";
import Sheet from "react-modal-sheet";
import styled, { keyframes } from "styled-components";

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

const animatebottom = keyframes`
   from {
     bottom: -300px;
     opacity: 0;
   }

   to {
     bottom: 0;
     opacity: 1;
   }
`

const animateup = keyframes`
   from {
      bottom: 0;
     opacity: 1;
   }

   to {
      bottom: -300px;
     opacity: 0;
   }
`

const CustomSheet = styled(Sheet)<{ ismodalopen? : boolean}>`
   position: relative;
   animation: ${(props) => (props.ismodalopen ? animatebottom :  animateup)} 0.4s;
`

const BottomModal: React.FC<Props> = ({
   children,
   header,
   onDismiss,
   height,
}) => {
   const [isOpen, setOpen] = React.useState(true);
   const [ismodalopen, setIsModalOpen] = React.useState(true);
   const theme = useTheme();
   
   const onClose = () => {
      setIsModalOpen(false);
      setTimeout(function(){
         setOpen(false);
         onDismiss();
      }, 300);
   }

   return (
      <>
         <CustomSheet isOpen={isOpen} onClose={onClose} ismodalopen={ismodalopen}>
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
                  <IconButton onClick={onClose} style={{position: 'absolute', background: "transparent", top: '10px', right: '10px'}}>
                     <CloseIcon />
                  </IconButton>
               </Sheet.Header>
               <Sheet.Content>
                  {children}
               </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop onTap={onClose} />
         </CustomSheet>
      </>
   );
};
export default BottomModal;
