import { CloseIcon, Flex, Heading, IconButton, Label } from "components";
import useTheme from "hooks/useTheme";
import React from "react";
import Sheet from "react-modal-sheet";

interface Props {
   onDismiss?: () => null;
   header?: string;
   height?: string;
}

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
                  <Label
                     mt="24px"
                     mb="4px"
                     textTransform="uppercase"
                     textAlign="center"
                     fontSize="22px"
                     fontWeight="600"
                     style={{ color: "rgb(195 0 168)" }}>
                     {header}
                  </Label>
                  <IconButton onClick={onDismiss} style={{position: 'absolute', top: '10px', right: '10px'}}>
                     <CloseIcon />
                  </IconButton>
               </Sheet.Header>
               <Sheet.Content>
                  {children}
               </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop />
         </Sheet>
      </>
   );
};
export default BottomModal;
