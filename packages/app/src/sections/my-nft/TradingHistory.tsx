import React from "react";
import Image from "next/image";

const TradingHistory = () => {
  return (
    <div className="tradingHistory">
      <h3 className="mb-12">Trading History</h3>

      <div className="mb-28">
        <ul className="flex mb-6">
          <li className="mr-28">ACTION</li>
          <li className="mr-28">BLOCK</li>
          <li className="mr-28">TOKEN ID</li>
          <li>HASH</li>
        </ul>

        <div
          className="rounded-xl tracking-tight not-italic py-8 px-3.5 text-xs leading-4 font-bold text-center bg-trading-history">
          <ul className="flex pb-8 border-b border-trading-history-border-b">
            <li className="mr-24">BOUGHT EGG</li>
            <li className="mr-24">12054184</li>
            <li className="mr-24">6</li>
            <li>0xd8e1c294da833a8db</li>
          </ul>
          <ul className="flex mt-8">
            <li className="mr-24">BOUGHT EGG</li>
            <li className="mr-24">12054184</li>
            <li className="mr-24">6</li>
            <li>0xd8e1c294da833a8db</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TradingHistory;