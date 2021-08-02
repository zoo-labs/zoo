import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Modal as Existing, Text, Flex, Label, Button } from "components";
import BorderButton from "components/Button/BorderButton";
import { useModal, BottomModal } from "components/Modal";
import Confirmation from "./ConfirmationModal";
import Moralis from "moralis";
import { useWeb3React } from "@web3-react/core";
import { Animal } from "entities/zooentities";

interface Props {
   onDismiss?: () => null;
   item: Animal;
}

const BidInput = styled.input.attrs({
   type: "number",
   min: 1,
})`
   width: 80%;
   /* margin: auto; */
   font-size: 23px;
   align-items: center;
   background: ${({ theme }) => theme.colors.modalBackground};
   text-transform: uppercase;
   color: ${({ theme }) => theme.colors.text};
   border-radius: 4px;
   transition: all 0.2s;
   display: inline-block;
   text-shadow: x-offset y-offset blur color;
   text-decoration: none;
   border: 1px solid #230616;
   -webkit-box-shadow: inset 0px 1px 0px 0px #461e34;
   -moz-box-shadow: inset 0px 1px 0px 0px #461e34;
   box-shadow: inset 0px 1px 0px 0px #461e34;
   -moz-appearance: textfield;
   ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
   ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
   padding-left: 4px;
`;

const ArrowBottom = styled.div`
   width: 0;
   height: 0;
   border-left: calc(0.9rem - 2px) solid transparent;
   border-right: calc(0.9rem - 2px) solid transparent;
   border-top: calc(0.9rem - 2px) solid #925677;
   font-size: 0;
   line-height: 0;
   position: absolute;
   right: calc(15% - 2px);
   margin-top: calc(0.9rem + 5px);
   &:hover {
      cursor: pointer;
   }
   box-shadow: 0px -1px 0px #461e34;
`;

const ArrowUp = styled.div`
   width: 0;
   height: 0;
   border-left: calc(0.9rem - 2px) solid transparent;
   border-right: calc(0.9rem - 2px) solid transparent;
   border-bottom: calc(0.9rem - 2px) solid #925677;
   font-size: 0;
   line-height: 0;
   position: absolute;
   margin-top: -1px;
   right: calc(15% - 2px);
   &:hover {
      cursor: pointer;
   }
   box-shadow: 0px 1px 0px #461e34;
`;

const StyledRow = styled.div`
   display: flex;
   flex-direction: row;
`;

const ButtonContent = styled(Flex)`
   justify-content: space-around;
   margin-top: 35px;
`;

const BidModal: React.FC<Props> = ({ onDismiss = () => null, item }) => {
   const [value, setValue] = React.useState(parseInt(item.currentBid) + 1);
   const { account, chainId } = useWeb3React();
   const dispatch = useDispatch();

   Moralis.initialize(
      chainId === 97
         ? "16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy"
         : "cIGUkzL7pyhM8aC8gIcDiH46QGpsEutO5SAQzTgy"
   );
   Moralis.serverURL =
      chainId === 97
         ? "https://dblpeaqbqk32.usemoralis.com:2053/server"
         : "https://j0ixlvmwc1kz.usemoralis.com:2053/server";

   const confirmBuy = async () => {
      const toSet: Animal = { ...item };
      // toSet.listed = true;
      // toSet.owner = account;
      // dispatch(addAnimal(toSet));
      const animalId = parseInt(item.tokenId)
      console.log(animalId)
      const queryObject = Moralis.Object.extend("FinalAnimals")
      const query = new Moralis.Query(queryObject)
      query.limit(1000)
      query.equalTo("AnimalID", animalId)
      const results = await query.find()
      const currentObject = results[0]
      console.log(currentObject.attributes)
      currentObject.set("Listed", false)
      currentObject.set("Owner", account)
      await currentObject.save()

      const TransOb = Moralis.Object.extend("Transactions")
      const newTrans = new TransOb

      newTrans.set("From", account)
      newTrans.set("Action", "Bought")
      newTrans.set("AnimalTokenID", currentObject.attributes.AnimalID)
      newTrans.set("AnimalName", currentObject.attributes.Name)
      newTrans.set("BuyAmount", currentObject.attributes.BuyNow)
      newTrans.save()
      onDismiss();

      onDismiss();
   };
   const confirmBid = async () => {
      const queryObject = Moralis.Object.extend("FinalAnimals")
      const query = new Moralis.Query(queryObject)
      query.limit(1000)
      console.log(item)
      query.equalTo("AnimalID", parseInt(item.tokenId))
      const results = await query.find()
      const currentObject = results[0]
      console.log(currentObject)
      currentObject.set("CurrentBid", String(value))
      currentObject.set("BuyNow", String(value + 100))
      currentObject.save()

      const TransOb = Moralis.Object.extend("Transactions")
      const newTrans = new TransOb

      newTrans.set("From", account)
      newTrans.set("Action", "Bid")
      newTrans.set("AnimalTokenID", currentObject.attributes.AnimalID)
      newTrans.set("AnimalName", currentObject.attributes.Name)
      newTrans.set("BidAmount", currentObject.attributes.CurrentBid)
      newTrans.save()
      onDismiss();
      // const toSet: Animal = { ...item };
      // toSet.currentBid = value.toString();
      // toSet.buyNow = (value + 100).toString();
      // dispatch(addAnimal(toSet));
      onDismiss();
   };

   const [onConfirmBuy] = useModal(
      <Confirmation
         confirmation={confirmBuy}
         onDismiss={() => null}
         action="Buy"
         name={item.name}
         amount={parseFloat(item.buyNow)}
      />
   );
   const [onConfirmBid] = useModal(
      <Confirmation
         confirmation={confirmBid}
         onDismiss={() => null}
         action="Bid"
         name={item.name}
         amount={parseFloat(item.currentBid)}
         submission={value}
      />
   );

   const changed = () => (e) => {
      const newVal = e.target.value;
      if (newVal > value) {
         setValue(parseInt(newVal));
      }
   };

   const increaseEgg = () => {
      setValue(value + 100);
   };

   const decreaseEgg = () => {
      if (value <= 100) {
         return;
      }
      setValue(value - 100);
   };

   return (
      <>
         <BottomModal
            header={`${item.name}`}
            onDismiss={onDismiss}
            height={`370px`}>
            <Flex
               width="100%"
               justifyContent="center"
               alignContent="center"
               flexDirection="column"
               pl="20px"
               pr="20px">
               <Label fontSize="22px" color="text" fontWeight="550">
                  Current Bid
               </Label>
               <Text
                  bold
                  ml="16px"
                  mt="4px"
                  mb="16px"
                  fontSize="22px"
                  color="text">
                  {item.currentBid}
               </Text>
               <Label fontSize="22px" color="text" fontWeight="550">
                  Buy Now
               </Label>
               <Text
                  bold
                  ml="16px"
                  mt="4px"
                  mb="16px"
                  fontSize="22px"
                  color="text">
                  {item.buyNow}
               </Text>
               <StyledRow>
                  <BidInput type="number" onChange={changed()} value={value} />
                  <ArrowBottom onClick={decreaseEgg} />
                  <ArrowUp onClick={increaseEgg} />
               </StyledRow>
               <ButtonContent>
                  <BorderButton
                     scale="md"
                     width="120px"
                     onClick={() => onConfirmBuy()}>
                     Buy Now
                  </BorderButton>
                  <BorderButton
                     scale="md"
                     width="120px"
                     onClick={() => onConfirmBid()}>
                     Bid
                  </BorderButton>
               </ButtonContent>
            </Flex>
         </BottomModal>
      </>
   );
};

export default BidModal;
