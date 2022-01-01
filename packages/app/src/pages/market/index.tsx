import { numberWithCommas } from "functions";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "state";
import { useBuyZoo } from "state/zoo/hooks";

interface MarketProps {}

const Market: React.FC<MarketProps> = ({}) => {
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );
  const [wait, setWait] = useState(false);

  const buyZoo = useBuyZoo();
  return (
    <div>
      <div className="flex items-end">
        <div>
          <div className="mb-2 text-xl font-bold  currentColor">
            Wallet Balance
          </div>
          <div className="text-2xl font-bold  currentColor">
            <span className="text-2xl">
              {numberWithCommas(zooBalance.toFixed(2))} ZOO
            </span>
          </div>
        </div>
        <div className="relative inline-flex ml-4 rounded-md shadow-sm">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => buyZoo()}
          >
            <span
              className={`flex items-center justify-center ml-2 py-2 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis font-bold border rounded-xl text-high-emphesis bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary ${
                zooBalance === 0 && "gradient-border"
              }`}
              style={{
                width: "120px",
                minHeight: "36px",
                marginBottom: "-2px",
              }}
            >
              {wait ? "Processing" : "Get ZOO"}
            </span>
          </div>
          {zooBalance === 0 && (
            <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
              <span className="absolute inline-flex w-full h-full bg-purple-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
            </span>
          )}
        </div>
        {/*
                <div className={`flex flex-wrap justify-center`}>
                  {keepApprove || !allowance ? (
                    <div className={'ml-2'}>
                      <button
                        disabled={disableApprove || allowance}
                        style={{ width: '120px', minHeight: '36px', marginBottom: '-2px' }}
                        className={`border rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primary border-gray-800 hover:bg-opacity-100  disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full  bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary ${
                          balance !== 0 && 'gradient-border'
                        }`}
                        onClick={approve}>
                        {allowance ? 'Approved' : disableApprove ? 'Processing' : 'Approve'}
                        {balance !== 0 && (
                          <span className='absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1'>
                            <span className='absolute inline-flex w-full h-full bg-purple-400 rounded-full opacity-75 animate-ping'></span>
                            <span className='relative inline-flex w-3 h-3 bg-white rounded-full'></span>
                          </span>
                        )}
                      </button>
                    </div>
                  ) : currentEggsOwned > 2 ? (
                    <div></div>
                  ) : (
                    <div className={'ml-2'}>
                      <button
                        disabled={disable || !allowance}
                        className={` rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primaryhover:bg-opacity-100 focus:ring-offset-dark-700 disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary ${
                          balance !== 0 && currentEggsOwned < 1 && 'gradient-border'
                        }`}
                        style={{ width: '120px', minHeight: '36px', marginBottom: '-2px' }}
                        onClick={buyEgg}>
                        {currentEggsOwned > 2 ? 'Market' : disable ? 'Processing' : 'Buy Eggs'}
                        {balance !== 0 && currentEggsOwned < 1 && (
                          <span className='absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1'>
                            <span className='absolute inline-flex w-full h-full bg-purple-400 rounded-full opacity-75 animate-ping'></span>
                            <span className='relative inline-flex w-3 h-3 bg-white rounded-full'></span>
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div> */}
      </div>
    </div>
  );
};
export default Market;
