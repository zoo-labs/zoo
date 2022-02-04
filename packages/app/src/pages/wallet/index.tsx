import React, { useState } from "react";

import MyWalletSection from "./MyWalletSection";
import MyBidsSection from "./MyBidsSection";
import MyAuctionSection from "./MyAuctionsSections";

export default function Wallet({ children }) {
  const [category, setCategory] = useState(0);

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
        <div className="pt-16 pb-8 px-6 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto ">
          <div className="flex justify-center">
            <div
              className="flex lg:grid lg:grid-cols-3 border-blue w-auto  mb-8 border rounded overflow-hidden lg:w-1/3"
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
                      active ? "bg-blue text-white" : "text-gray-400"
                    } text-sm font-bold py-4 px-6 cursor-pointer inline-block border text-center border-blue`}
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
