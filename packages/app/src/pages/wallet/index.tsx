import React, { useState } from "react";

import MyWalletSection from "./MyWalletSection";
import MyBidsSection from "./MyBidsSection";
import MyAuctionSection from "./MyAuctionsSections";

export default function Wallet({ children }) {
  const [category, setCategory] = useState(0);

  return (
    <section className="Hero">
      <div className="Hero__inner pt-16 pb-16 px-6 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto ">
        <div
          className="inline-block border-blue w-auto mb-8 border rounded overflow-hidden"
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
                  active ? "bg-blue text-white" : "text-gray-600"
                } text-sm font-bold py-2 px-4 cursor-pointer inline-block`}
                key={index}
              >
                {value}
              </a>
            );
          })}
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
