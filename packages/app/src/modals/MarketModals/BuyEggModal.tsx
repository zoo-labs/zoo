import { CircularProgress } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import CloseIcon from "components/CloseIcon";
import CurrencySwitch from "components/CurrencySwitch";
import Modal from "components/Modal";
import BidModalHeader from "components/ModalHeader/BidModalHeader";
import { formatError, numberWithCommas, wait } from "functions";
import { useZooKeeper, useZooToken, useDrop } from "hooks/useContract";
import useToast from "hooks/useToast";
import { isEmpty } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Minus, Plus } from "react-feather";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "state";
import { ApplicationModal } from "state/application/actions";
import { useBuyEggModalToggle, useModalOpen } from "state/application/hooks";
import { useGasPrice } from "state/network/hooks";
import { useETHBalances } from "state/wallet/hooks";
import { useZoobalance } from "state/zoo/hooks";
import web3 from "web3";
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
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );
  const myEggs = useSelector<AppState, AppState["zoo"]["myEggs"]>(
    (state) => state.zoo.myEggs
  );
  const [zooBnbPrice, setZooBnbPrice] = useState(0);
  const [eggPrice, setEggPrice] = useState(0);
  const { account, library } = useWeb3React();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];

  useEffect(() => {
    if (amount > zooBalance) {
      setError(`You dont have enough ZOO`);
    } else if (error) {
      setError("");
    }
  }, [amount]);

  useEffect(() => {
    mount();
    getZooBnbPrice();
    getEggPrice();
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
    console.log("newEggs", newEggs);
    const eggsLength = newEggs.filter(
      (egg) => !isEmpty(egg) && egg.temporary
    ).length;
    console.log("eggsLength", eggsLength);
    wait(3000).then(
      () => (setEggs(newEggs), eggsLength === 0 && addEgg(newEggs))
    );
  };

  const addEgg = (altEggs: any) => {
    const newEggs = [...altEggs];
    const foundIndex = newEggs.findIndex((x) => isEmpty(x));
    console.log("foundIndex", foundIndex);
    newEggs[foundIndex] = { temporary: true };
    setAmount(
      360000 * newEggs.filter((egg) => !isEmpty(egg) && egg.temporary).length
    );
    console.log("adding egg", newEggs);
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
  const drop = useDrop();
  const getZooBalance = useZoobalance();
  console.log("zooKEeper --->", zooKeeper);
  const zooToken = useZooToken();

  const { toastError, toastInfo, clear } = useToast();

  const toastClear = () => {
    clear();
  };

  const getZooBnbPrice = async () => {
    // console.log("zooBnbPrice", zooKeeper);

    const price = await zooKeeper.zooPriceBNB();
    const value = web3.utils.fromWei(price.toString(), "ether");
    console.log("zooBnbPrice", value);
    setZooBnbPrice(parseFloat(value));
  };
  const getEggPrice = async () => {
    console.log("eggPrice drooop", drop);
    try {
      const price = await drop?.eggPrice();
      const value = web3.utils.fromWei(price.toString(), "ether");
      console.log("eggPrice here", value);
      setEggPrice(parseFloat(value));
    } catch (error) {
      console.log("errro in eggPrice", error);
    }
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
  const eggPriceBNB = zooBnbPrice * 500000;
  console.log("eggPriceBNB", eggPriceBNB.toFixed(8));

  return (
    <Modal isOpen={buyEggModal} onDismiss={() => null} isMax>
      <BidModalHeader
        onBack={() => toggleBuyEggModal()}
        className="absolute w-full p-6 mb-6"
        showAccount
      />
      <div className="flex flex-col px-4 lg:flex-row lg:items-center h-full max-w-7xl mx-auto overflow-y-auto">
        <div className="realtive lg:basis-1/2">
          <div className="mt-20 lg:mt-0">
            {/* <div className="flex flex-col w-full mb-6">
              <div className="text-sm font-semibold text-gray-500 mb-2">
                BUY EGGS
              </div>
              <div className="text-2xl font-bold lg:text-4xl">
                {numberWithCommas(
                  checked
                    ? userEthBalance
                      ? userEthBalance.toFixed(2)
                      : 0
                    : zooBalance.toFixed(2)
                )}{" "}
                {checked ? "BNB" : "ZOO"}
              </div>
            </div> */}
            <div className="w-full my-8 ">
              <div className="text-sm font-semibold text-gray-500 mb-2">
                BUY EGGS
              </div>
              <div className="text-2xl font-bold lg:text-4xl">
                {numberWithCommas(
                  checked
                    ? userEthBalance
                      ? userEthBalance.toFixed(2)
                      : 0
                    : zooBalance.toFixed(2)
                )}{" "}
                {checked ? "BNB" : "ZOO"}
              </div>
              <div className="flex items-center justify-center w-full rounded">
                <Image
                  src={`/img/egg.png`}
                  width={300}
                  height={300}
                  className="w-full h-full transition-transform duration-1000 rounded"
                  alt=""
                />
              </div>
              {/* <div className="flex justify-between w-full h-full px-4">
                  <div className="flex flex-col justify-center">
                    <div className="mb-2">Egg</div>
                    <div className="flex items-center mt-2 text-gray-400">
                      Qty
                      <button
                        onClick={() => setQuantitySwitch(true)}
                        className="p-1 ml-2 text-gray-300 rounded-md hover:bg-dark-800"
                        type="button"
                      >
                        <span className="flex font-semibold tex-gray-900">
                          {quantity} <RiArrowDropDownLine />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center w-auto font-semibold text-gray-400">
                    {checked
                      ? eggPriceBNB
                      : numberWithCommas(360000.0 * quantity)}{" "}
                    {checked ? "BNB" : "ZOO"}
                  </div>
                </div> */}
            </div>
            {error && (
              <div className="mb-4 text-base text-center font-semibold text-red">
                {error}
              </div>
            )}
            <h6 className="my-1 text-sm font-semibold text-center text-gray-400">
              One egg costs{" "}
              <span className="font-bold text-white">
                {" "}
                {numberWithCommas(checked ? eggPriceBNB : eggPrice)}{" "}
                {checked ? "BNB" : "ZOO"} each
              </span>
            </h6>
            <h6 className="mb-2 text-sm font-semibold text-center text-gray-400">
              A maximum of 3 eggs are allowed per account
            </h6>
          </div>
          <div className="flex flex-col items-center mt-4">
            <CurrencySwitch
              checked={checked}
              checkFunc={() => setChecked(!checked)}
            />
          </div>
        </div>
        <div className="lg:basis-1/2">
          <div className="w-1/2">
            <div className="flex">
              <button
                onClick={() => buyEggs()}
                className="inline-flex items-center justify-center w-full h-10 px-6 my-4 text-lg font-bold leading-none text-white rounded-lg bg-dark-800 hover:bg-primary"
                style={{ transition: "all .2s" }}
              >
                {disabled ? (
                  <CircularProgress color="secondary" size={20} thickness={4} />
                ) : (
                  `Pay ${
                    checked
                      ? eggPriceBNB
                      : numberWithCommas(eggPrice * quantity)
                  } ${checked ? "BNB" : "ZOO"}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal isOpen={quantitySwitch} onDismiss={() => setQuantitySwitch(false)}>
        <div className="w-full mb-4">
          <div className="flex h-20 ">
            <div className="flex items-center justify-center mr-2 rounded w-14">
              <img
                style={{ verticalAlign: "middle" }}
                src={`/static/images/basic.jpg`}
                className="w-full h-full transition-transform duration-1000 rounded"
              />
            </div>
            <div className="flex justify-between w-full h-full px-4">
              <div className="flex flex-col justify-center">
                <div className="mb-1">Update Quantity</div>
                <div className="flex items-center mt-1 font-semibold text-gray-400">
                  Egg
                </div>
              </div>
              <div className="flex items-center w-auto font-semibold text-gray-400">
                <div
                  className="p-1 bg-white rounded-full cursor-pointer"
                  onClick={() => setQuantitySwitch(false)}
                >
                  <CloseIcon color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <div
              className={`cursor-pointer h-10 w-10 rounded-full ${
                eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length > 0
                  ? "bg-dark-700"
                  : "bg-dark-800"
              }  flex justify-center items-center`}
              onClick={() => removeEgg()}
            >
              <Minus size={25} />
            </div>
            <div className="px-4 py-3 mx-6 border border-solid rounded">
              {eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length}
            </div>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-dark-700"
              onClick={() => addEgg(eggs)}
            >
              <Plus size={25} />
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => setQuantitySwitch(false)}
              className="inline-flex items-center justify-center w-full h-10 px-6 mt-4 text-lg font-bold leading-none text-white rounded-lg bg-primary-light hover:bg-primary"
              style={{ transition: "all .2s" }}
            >
              Update
            </button>
          </div>
        </div>
      </Modal> */}
    </Modal>
  );
};

export default BuyEggModal;
