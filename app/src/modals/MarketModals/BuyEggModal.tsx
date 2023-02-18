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
import { useActiveWeb3React } from "hooks";
import Web3 from "web3";

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
  const { account, library } = useActiveWeb3React();
  const getZooBalance = useZoobalance();
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
      // await Web3?.eth.getBalance(account).then((val) => {
      //   const divisor = parseFloat(Math.pow(10, 18).toString());
      //   const balance = parseFloat(val) / divisor;
      //   setBnbBalance(parseFloat(balance.toFixed(4)));
      // });
    } catch (e) {
      console.error("ISSUE LOADING BNB BALANCE \n", e);
    }
  };

  const getZooBnbPrice = async () => {
    const price = await zooKeeper.zooPriceBNB();
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
            value: Web3.utils.toWei(eggPriceBNB),
          })
          .then((res) => {
            toastClear();
            toastInfo("Transaction submitted.");

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
    // dispatch(addEggs(testEggs))
    // toggleBuyEggModal()
  };

  const quantity = eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length;
  const eggPriceBNB = new BigNumber(10 ** 18)
    .times(420000 * quantity)
    .div(zooBnbPrice)
    .div(10 ** 18)
    .toFixed(4);

  return (
    <Modal isOpen={buyEggModal} onDismiss={() => null} isMax>
      <BidModalHeader
        onBack={() => toggleBuyEggModal()}
        className="absolute w-full p-6 "
      />
      <div className="flex flex-wrap h-full">
        <div className="relative flex flex-col items-center justify-center w-full shadow-lg md:w-1/2">
          <div className="w-4/5 max-w-2xl p-4 lg:w-1/2">
            <div className="flex flex-col w-full MB-6">
              <div className="text-sm font-semibold text-gray-500">
                BUY EGGS
              </div>
              <div className="text-2xl font-bold lg:text-4xl">
                {numberWithCommas(
                  checked ? bnbBalance.toFixed(2) : zooBalance.toFixed(2)
                )}{" "}
                {checked ? "BNB" : "ZOO"}
              </div>
            </div>
            <div className="w-full my-8 ">
              <div className="flex h-20 ">
                <div className="flex items-center justify-center mr-2 rounded w-14">
                  <Image
                    layout="fill"
                    src={`/static/images/basic.jpg`}
                    className="w-full h-full transition-transform duration-1000 rounded"
                  />
                </div>
                <div className="flex justify-between w-full h-full px-4">
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
                </div>
              </div>
            </div>
            {error && (
              <div className="mb-1 text-xs font-semibold text-red-500">
                {error}
              </div>
            )}
            <h6 className="my-1 text-xs font-semibold text-gray-400">
              One egg costs{" "}
              <span className="font-bold text-white">
                {" "}
                {numberWithCommas(
                  checked ? (zooBnbPrice * 360000).toFixed(2) : 360000.0
                )}{" "}
                {checked ? "BNB" : "ZOO"} each
              </span>
            </h6>
            <h6 className="mb-2 text-xs font-semibold text-gray-400">
              A maximum of 3 eggs are allowed per account
            </h6>
          </div>
          <div className="absolute lg:bottom-60 bottom-10 left-50">
            <CurrencySwitch
              checked={checked}
              checkFunc={() => setChecked(!checked)}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-modal-dark">
          <div className="w-1/2">
            <div className="flex">
              <button
                onClick={() => buyEggs()}
                className="inline-flex items-center justify-center w-full h-10 px-6 my-4 text-lg font-bold leading-none text-white rounded-lg bg-primary-light hover:bg-primary"
                style={{ transition: "all .2s" }}
              >
                {disabled ? (
                  <CircularProgress color="secondary" size={20} thickness={4} />
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={quantitySwitch} onDismiss={() => setQuantitySwitch(false)}>
        <div className="w-full mb-4">
          <div className="flex h-20 ">
            <div className="flex items-center justify-center mr-2 rounded w-14">
              <Image
                layout="fill"
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
      </Modal>
    </Modal>
  );
};

export default BuyEggModal;
