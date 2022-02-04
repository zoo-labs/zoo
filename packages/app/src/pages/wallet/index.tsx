import React, { useState } from "react";

import { useSelector } from "react-redux";
import { AppState } from "state";
import { useWeb3React } from "@web3-react/core";
import { useBuyZoo } from "state/zoo/hooks";
import { numberWithCommas } from "functions";

import MyWalletSection from "./MyWalletSection";
import MyBidsSection from "./MyBidsSection";
import MyAuctionSection from "./MyAuctionsSections";
import { handleFunds } from "utils/handleFunds";

export default function Wallet({ children }) {
  const [category, setCategory] = useState(0);

  const { account, library, chainId } = useWeb3React();
  const buyZoo = useBuyZoo();
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );

  return (
    <section className="Hero">
      <div className="Hero__inner pt-16 pb-16 px-6 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
        {/* <div className="inline-block bg-leader-board rounded p-px  mb-28 ml-16 w-auto overflow-hidden mt-20">
          <div className="w-auto bg-black rounded" style={{ top: 10 }}>
            {['My Wallet', 'My Bids', 'My Auctions'].map((value, index) => {
              const active = category === index;
              return (
                <a
                  onClick={() => {
                    setCategory(index);
                  }}
                  className={`${
                    active ? 'bg-leader-board text-white' : 'text-gray-600'
                  } text-sm font-bold py-2 px-4 cursor-pointer inline-block`}
                  key={index}
                >
                  {value}
                </a>
              );
            })}
          </div>
        </div> */}
        <div className="pt-16 pb-8 px-6 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto flex justify-between items-center">
          <p className="text-xl md:text-4xl font-bold">
            Wallet Balance{" "}
            <span className="text-base font-bold text-green md:text-4xl font-bold">
              {" "}
              {numberWithCommas(zooBalance.toFixed(2))} $ZOO
            </span>
          </p>
          <button
            onClick={() => handleFunds(chainId, buyZoo)}
            className="px-5 py-3 text-sm font-semibold text-black rounded-full bg-green md:text-base md:px-6 md:py-4 lg:px-10"
          >
            Buy $ZOO
          </button>
          <div className="flex justify-center">
            <div
              className="flex lg:grid lg:grid-cols-3 border-green w-auto border rounded-full overflow-hidden "
              style={{ top: 10 }}
            >
              {["My Wallet", "My Bids", "My Auctions"].map((value, index) => {
                const active = category === index;
                return (
                  <a
                    onClick={() => {
                      setCategory(index);
                    }}
                    className={`${
                      active ? "bg-green text-black" : "text-gray-400"
                    } text-sm font-bold py-4 px-6 cursor-pointer inline-block border text-center border-green`}
                    key={index}
                  >
                    {value}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          {category === 0 && <MyWalletSection />}
          {category === 1 && <MyBidsSection />}
          {category === 2 && <MyAuctionSection />}
        </div>
      </div>
    </section>
  );
}

{/* from-purple to-blue bg-gradient-to-b */}