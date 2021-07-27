import React from "react";
import styled from "styled-components";
import { Label, Text, Flex, IconButton } from "components";
import { BottomModal } from "components/Modal";
import BorderButton from "components/Button/BorderButton";

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
               <Label fontSize="22px" color="rgb(195 0 168)" fontWeight="550">
                  Daily Yield
               </Label>
               <Text bold ml="16px" mb="16px" fontSize="22px" color="text">
                  {item.yield}
               </Text>
               <Label fontSize="22px" color="rgb(195 0 168)" fontWeight="550">
                  Accumulated Yield
               </Label>
               <Text bold ml="16px" mb="16px" fontSize="22px" color="text">
                  {Math.floor(item.yield * (Math.random() * (12 - 1) + 1))}
               </Text>
            </Flex>
         </BottomModal>
      </>
   );
};
export default YieldModal;
