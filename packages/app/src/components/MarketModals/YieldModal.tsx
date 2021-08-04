import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "hooks/useWeb3";
import { Label, Text, Flex } from "components";
import BorderButton from "components/Button/BorderButton";
import { BottomModal } from "components/Modal";
import { getZooKeeper } from "util/contractHelpers";

interface Props {
   onDismiss?: () => null;
   item?: any;
   animalGroup?: { [key: string]: number };
}
// rgb(254 29 135) Darker PINK
const YieldModal: React.FC<Props> = ({ item, onDismiss, animalGroup }) => {
   const [pendingTsx, setPending] = useState(false);
   const { account, chainId } = useWeb3React();
   const web3 = useWeb3();
   const zooKeeper = getZooKeeper(web3, chainId);
   const multiplier = animalGroup[item.name];
   const canFree = item.owner === account;

   useEffect(() => {
      return null;
   }, [account]);

   const callFreeAnimal = () => {
      try {
         setPending(true);
         const tknId = web3.utils.toBN(item.tokenId);
         zooKeeper.methods
            .freeAnimal(tknId)
            .send({ from: account })
            .then(() => {
               setPending(false);
            })
            .catch((e) => {
               console.error("THERE WAS AN ISSUE FREEING THE ANIMAL \n", e);
               setPending(false);
            });
      } catch (e) {
         console.error("THERE WAS AN ISSUE FREEING THE ANIMAL \n", e);
         setPending(false);
      }
   };

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
               <Text
                  bold
                  ml="16px"
                  mt="4px"
                  mb="16px"
                  fontSize="22px"
                  color="text">
                  {multiplier
                     ? `${multiplier} x ${Number(item.yield)} = ${
                          multiplier * Number(item.yield)
                       }`
                     : `${Number(item.yield)}`}
               </Text>
               <Label fontSize="22px" color="text" fontWeight="550">
                  Accumulated Yield
               </Label>
               <Text
                  bold
                  ml="16px"
                  mt="4px"
                  mb="16px"
                  fontSize="22px"
                  color="text">
                  {Math.floor(item.yield * (Math.random() * (12 - 1) + 1))}
               </Text>
               {canFree && (
                  <Flex flexDirection="row" justifyContent="space-around">
                     <BorderButton onClick={()=>callFreeAnimal()} scale="md">
                        Free Animal
                     </BorderButton>
                  </Flex>
               )}
            </Flex>
         </BottomModal>
      </>
   );
};
export default YieldModal;
