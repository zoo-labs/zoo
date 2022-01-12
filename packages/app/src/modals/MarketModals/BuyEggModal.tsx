import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { formatError, numberWithCommas, wait } from "functions";
import { useZooKeeper, useZooToken } from "hooks/useContract";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Minus, Plus } from "react-feather";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "state";
import { ApplicationModal } from "state/application/actions";
import { useBuyEggModalToggle, useModalOpen } from "state/application/hooks";
import { useGasPrice } from "state/network/hooks";
import Modal from "components/Modal";
import BidModalHeader from "components/ModalHeader/BidModalHeader";
import useToast from "hooks/useToast";
import { CircularProgress } from "@mui/material";
import CloseIcon from "components/CloseIcon";
import { useZoobalance } from "state/zoo/hooks";
import CurrencySwitch from "components/CurrencySwitch";
import Image from "next/image";
import BuyNftCard from "../../components/BuyNftCard";

interface BuyEggModalProps {}

const BuyEggModal: React.FC<BuyEggModalProps> = ({}) => {
  const buyEggModal = useModalOpen(ApplicationModal.BUYEGG);
  const toggleBuyEggModal = useBuyEggModalToggle();
  const [amount, setAmount] = useState(0);
  const gasPrice = useGasPrice();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [eggs, setEggs] = useState<Array<any>>([]);
  const [checked, setChecked] = useState(true);
  const [quantitySwitch, setQuantitySwitch] = useState(false);
  const [bnbBalance, setBnbBalance] = useState(0);
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );

  const myEggs = useSelector<AppState, AppState["zoo"]["myEggs"]>(
    (state) => state.zoo.myEggs
  );

  const [zooBnbPrice, setZooBnbPrice] = useState(0);
  const { account, library } = useWeb3React();
  const getZooBalance = useZoobalance();

  // check if user has enough ZOO balance
  useEffect(() => {
    if (amount > zooBalance) {
      setError(`You dont have enough ZOO`);
    } else if (error) {
      setError("");
    }
  }, [amount]);

  useEffect(() => {
    mount();
    getBnbBalance();
    getZooBnbPrice();
  }, [myEggs]);

  const mount = async () => {
    const newEggs = [];
    await Object.values(myEggs).forEach((egg) => {
      newEggs.push(egg);
    });
    console.log("");
    const emptyLength = 3 - newEggs.length;
    for (let index = 0; index < emptyLength; index++) {
      newEggs.push({});
    }
    const eggsLength = newEggs.filter(
      (egg) => !isEmpty(egg) && egg.temporary
    ).length;
    wait(3000).then(
      () => (setEggs(newEggs), eggsLength === 0 && addEgg(newEggs))
    );
  };

  const addEgg = (altEggs: any) => {
    const newEggs = [...altEggs];
    const foundIndex = newEggs.findIndex((x) => isEmpty(x));
    newEggs[foundIndex] = { temporary: true };
    setAmount(
      360000 * newEggs.filter((egg) => !isEmpty(egg) && egg.temporary).length
    );
    setEggs(newEggs);
  };

  const removeEgg = () => {
    const newEggs = [...eggs];
    const foundIndex = newEggs.reverse().findIndex((x) => x.temporary);
    newEggs[foundIndex] = {};
    const finalEggs = newEggs.reverse();
    setAmount(
      360000 * finalEggs.filter((egg) => !isEmpty(egg) && egg.temporary).length
    );
    setEggs(finalEggs);
  };

  const zooKeeper = useZooKeeper();
  const zooToken = useZooToken();

  const { toastError, toastInfo, clear } = useToast();

  const toastClear = () => {
    clear();
  };

  const getBnbBalance = async () => {
    if (!account) return;
    try {
      await library.eth.getBalance(account).then((val) => {
        const divisor = parseFloat(Math.pow(10, 18).toString());
        const balance = parseFloat(val) / divisor;
        console.log("bnb balance is", balance);
        setBnbBalance(parseFloat(balance.toFixed(4)));
      });
    } catch (e) {
      console.error("ISSUE LOADING BNB BALANCE \n", e);
    }
  };

  const getZooBnbPrice = async () => {
    const price = await zooKeeper.zooPriceBNB();
    console.log("getZooBnbPrice", price);
    setZooBnbPrice(price);
  };

  const dispatch = useDispatch();
  const buyEggs = async () => {
    setDisabled(true);
    const eggsLength = eggs.filter(
      (egg) => !isEmpty(egg) && egg.temporary
    ).length;
    const eggPriceBNB = new BigNumber(10 ** 18)
      .times(420000 * quantity)
      .div(zooBnbPrice)
      .div(10 ** 18)
      .toFixed(4);

    if (checked) {
      try {
        zooKeeper.methods
          .buyEggsBNB(1, eggsLength) // buy from first drop
          .send({
            from: account,
            gasPrice: gasPrice,
            value: library.utils.toWei(eggPriceBNB),
          })
          .then((res) => {
            toastClear();
            toastInfo("Transaction submitted.");
            console.log("bought egg in bnb", res);

            setDisabled(false);
            dispatch(getZooBalance());
            toggleBuyEggModal();
          })
          .catch((err) => {
            const message = formatError(err);
            setDisabled(false);
            toastClear();
            toastError(message);
            console.error(message);
            toggleBuyEggModal();
          });
      } catch (err) {
        console.error(err);
        toastClear();
        setDisabled(false);
        toastError("Unable to purchase eggs. Try again later.");
      }
    } else {
      try {
        zooKeeper.methods
          .buyEggs(1, eggsLength) // buy from first drop
          .send({ from: account, gasPrice: gasPrice })
          .then((res) => {
            toastClear();
            toastInfo("Transaction submitted.");
            console.log("bought egg", res);

            setDisabled(false);
            dispatch(getZooBalance());
            toggleBuyEggModal();
          })
          .catch((err) => {
            const message = formatError(err);
            setDisabled(false);
            toastClear();
            toastError(message);
            console.error(message);
            toggleBuyEggModal();
          });
      } catch (err) {
        console.error(err);
        toastClear();
        setDisabled(false);
        toastError("Unable to purchase eggs. Try again later.");
      }
    }
    // console.log(testEggs)
    // dispatch(addEggs(testEggs))
    // toggleBuyEggModal()
  };

  const quantity = eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length;
  const eggPriceBNB = new BigNumber(10 ** 18)
    .times(420000 * quantity)
    .div(zooBnbPrice)
    .div(10 ** 18)
    .toFixed(4);
  console.log("eggPriceBNB", eggPriceBNB);

  console.log("ZOO BnB price!!!", zooBnbPrice);

  return (
    <Modal
      isOpen={buyEggModal}
      onDismiss={() => null}
      isMax
      maxWidth={1200}
      maxHeight={80}
      scrollable={true}
    >
      <div>
        <div className="flex flex-col items-center overflow-y-scroll">
          {/* Head */}
          <BidModalHeader
            onBack={() => toggleBuyEggModal()}
            className="absolute w-full p-6 "
            showAccount
          />

          {/* Body */}
          <div className="flex flex-col items-center justify-between w-full lg:flex-row lg:gap-4 mt-24">
            <div className="flex flex-col items-center max-w-sm mx-auto lg:basis-1/2">
              <BuyNftCard
                image={
                  <Image
                    src="/img/egg-dark.png"
                    width={300}
                    height={400}
                    alt=""
                    className="object-fit"
                  />
                }
                name="Egg"
                price="2.45"
                days="3"
                address="0x8733...94483"
                currency="ETH"
              />
            </div>

            <div className="flex flex-col lg:basis-1/2 py-12">
              <div className="flex flex-col items-start justify-between mb-4">
                <p className="text-grey">
                  Your balance:{" "}
                  <span className="text-white font-bold">
                    {numberWithCommas(zooBalance.toFixed(2))}
                  </span>{" "}
                  ZOO
                  {console.log("EGGG PRICE!", myEggs)}
                </p>
              </div>
              <div className="flex justify-between w-64 px-2 py-2 mb-4 font-bold bg-transparent border border-white rounded">
                <p>{numberWithCommas(zooBalance.toFixed(2))}</p>
                <p>ZOO</p>
              </div>
              <div></div>
              <a className="font-bold text-purple">How do auctions work?</a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BuyEggModal;
