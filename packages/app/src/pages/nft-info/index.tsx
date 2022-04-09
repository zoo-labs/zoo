import React from "react";
import Image from "next/image";

import Modal from "../../components/Modal/";
import TransactionHistory from "../wallet/TransactionHistorySection";

const NftInfo = () => {
  const [openMoal, setOpenModal] = React.useState(false);
  return (
    <div className="">
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex flex-col lg:flex-row lg:justify-center gap-12 mb-12">
          <div className="flex flex-col border border-blue px-4 py-6 rounded mb-4 lg:mb-0 lg:px-8">
            <div style={{ minHeight: "299px" }}>
              <Image src="/img/egg.png" width={300} height={300} alt="" />
            </div>
            <button
              className="bg-gradient-to-b from-purple to-blue text-white font-semibold text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full"
              onClick={() => setOpenModal(true)}
            >
              Place bid
            </button>
            <Modal onDismiss={() => setOpenModal(false)} isOpen={openMoal}>
              <p className="text-white">Modal</p>
            </Modal>
          </div>
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Egg #4</h3>
              <p>
                Contains <span className="font-bold">1 of 16</span> Generation
                one Base Animals. To hatch or to hold…
              </p>
            </div>
            <div className="mb-8 border border-blue px-4 py-6 rounded">
              <p className="font-bold mb-2">Details</p>
              <div className="flex justify-between mb-2">
                <p>Transaction</p>
                <p className="text-purple">0x00000000…000000</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Token Id</p>
                <p>234345</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Hash</p>
                <p>4</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Token Standard</p>
                <p>ERC-721</p>
              </div>
            </div>

            <div className="details border border-blue rounded">
              <div className="px-4 pt-6 pb-2 ">
                <p className="font-bold mb-2">Proof of Authenticity</p>
                <div className="mb-2">
                  <p className="text-lg font-bold">300,000 $ZOO</p>
                </div>

                <div className="flex justify-between mb-2">
                  <p className="text-purple100">Token Standard</p>
                  <Image
                    src="/img/link-arrow-right.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex justify-between px-4 py-2 border-t border-blue">
                <p className="text-purple100">View on IPS</p>
                <Image
                  src="/img/link-arrow-right.svg"
                  width={16}
                  height={16}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <TransactionHistory />
      </div>
    </div>
  );
};

export default NftInfo;
