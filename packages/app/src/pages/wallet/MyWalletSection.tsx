import React, { useRef, useEffect } from "react";
import { ChainId, Currency, NATIVE, SUSHI_ADDRESS } from "@zoolabs/sdk";
import { numberWithCommas } from "functions";
import Image from "next/image";
import Link from "next/link";
import ComingSoon from "components/ComingSoon";
import { useSelector } from "react-redux";
import { AppState } from "state";

import TransactionHistory from "./TransactionHistorySection";
import { handleFunds } from "utils/handleFunds";
import { useWeb3React } from "@web3-react/core";
import { useBuyZoo } from "state/zoo/hooks";

import { useLingui } from "@lingui/react";
import Web3Status from "../../components/Web3Status";
import { useETHBalances } from "../../state/wallet/hooks";

import { fadeInOnScroll } from "animation";

const MyWalletSection = () => {
  const { account, library, chainId } = useWeb3React();
  const buyZoo = useBuyZoo();
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];

  const comingSoonRef = React.useRef();

  useEffect(() => {
    fadeInOnScroll(comingSoonRef.current);
  }, []);

  return (
    <div>
      <div className="">
        <div className="max-w-7xl mx-auto py-20 px-4">
          <div
            className="flex flex-col items-center justify-center text-center "
            ref={comingSoonRef}
          >
            {!account ? (
              <h1 className="text-4xl lg:text-5xl font-bold mb-8">
                Wallet Not Connected
              </h1>
            ) : <h1 className="text-4xl lg:text-5xl font-bold mb-8">Wallet Connected</h1>}
            <div className="w-auto flex items-center rounded hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
              {account && chainId && userEthBalance && (
                <>
                  <div className="px-3 py-2 text-primary text-bold">
                    {userEthBalance?.toFixed(3)}{" "}
                    {NATIVE[chainId]?.symbol || "ETH"}
                  </div>
                </>
              )}
              <Web3Status
                title={`Connect Wallet`}
                className="font-bold bg-black  underline text-green"
              />
            </div>
            {/* <p>
              Connect wallet{" "}
              <Link href="/">
                <a className="text-green underline">home page</a>
              </Link>
            </p> */}
          </div>
        </div>
      </div>
      {/* <p className="mb-8 text-xl md:text-2xl">
        Wallet Balance{" "}
        <span className="text-base font-bold text-green md:text-2xl">
          {" "}
          {numberWithCommas(zooBalance.toFixed(2))} $ZOO
        </span>
      </p> */}

      {/* <>
      <div className="flex flex-col items-center justify-center mb-8 lg:flex-row lg:justify-between">
        <div className="px-4 py-8 mb-4 border rounded border-blue lg:mb-0">
          <Image src="/img/javan-rhino.png" width={148} height={153} alt="" />
        </div>
        <div className="px-4 py-8 mb-4 border rounded border-blue lg:mb-0">
          <Image src="/img/plasma.png" width={148} height={153} alt="" />
        </div>
        <div className="px-4 py-8 mb-4 border rounded border-blue lg:mb-0">
          <Image src="/img/egg.png" width={148} height={153} alt="" />
        </div>
        <div className="px-4 py-8 mb-4 border rounded border-blue lg:mb-0">
          <Image src="/img/plasma.png" width={148} height={153} alt="" />
        </div>
        <div className="px-4 py-8 mb-4 border rounded border-blue lg:mb-0">
          <Image src="/img/dog.png" width={148} height={153} alt="" />
        </div>
      </div>
      <p className="m-8 text-center text-green">4 Eggs - 2 Animals</p>
      <div className="flex items-center justify-center">
        <a
          href="/market"
          className="px-5 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 md:py-4 lg:px-10"
        >
          Buy $ZOO
        </a>
      </div>
      <TransactionHistory />
      </> */}

      {/* <div className="flex items-center justify-center">
        <button
          onClick={() => handleFunds(chainId, buyZoo)}
          className="px-5 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 md:py-4 lg:px-10"
        >
          Buy $ZOO
        </button>
      </div> */}
      {/* <ComingSoon /> */}
    </div>
  );
};

export default MyWalletSection;
