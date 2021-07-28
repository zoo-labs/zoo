import React from "react";
import { Label, Text, Flex } from "components";
import { BottomModal } from "components/Modal";

interface Props {
   onDismiss?: () => null;
   item?: any;
}
// rgb(254 29 135) Darker PINK
const YieldModal: React.FC<Props> = ({ item, onDismiss }) => {
   return (
      <>
         <BottomModal header="Yield Info" height="300px" onDismiss={onDismiss}>
            <Flex
               justifyContent="center"
               alignContent="center"
               flexDirection="column"
               ml="20px"
               mt="20px">
               <Label fontSize="22px" color="text" fontWeight="550">
                  Daily Yield
               </Label>
               <Text  bold ml="16px" mt="4px" mb="16px" fontSize="22px" color="text">
                  {item.yield}
               </Text>
               <Label fontSize="22px" color="text" fontWeight="550">
                  Accumulated Yield
               </Label>
               <Text bold ml="16px" mt="4px" mb="16px" fontSize="22px" color="text">
                  {Math.floor(item.yield * (Math.random() * (12 - 1) + 1))}
               </Text>
            </Flex>
         </BottomModal>
      </>
   );
};
export default YieldModal;
