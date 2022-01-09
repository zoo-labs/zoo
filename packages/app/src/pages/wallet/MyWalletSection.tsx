import Image from "next/image";

import TransactionHistory from "./TransactionHistorySection";

const MyWalletSection = () => {
  return (
    <div>
      <p className="text-xl mb-8">
        Wallet Balance{" "}
        <span className="font-bold text-base text-green">11,010,000,110.1001 $ZOO</span>
      </p>
      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between mb-8">
        <div className="rounded border border-blue px-4 py-8 mb-4 lg:mb-0">
          <Image src="/img/javan-rhino.png" width={148} height={153} alt="" />
        </div>
        <div className="rounded border border-blue px-4 py-8 mb-4 lg:mb-0">
          <Image src="/img/plasma.png" width={148} height={153} alt="" />
        </div>
        <div className="rounded border border-blue px-4 py-8 mb-4 lg:mb-0">
          <Image src="/img/egg.png" width={148} height={153} alt="" />
        </div>
        <div className="rounded border border-blue px-4 py-8 mb-4 lg:mb-0">
          <Image src="/img/plasma.png" width={148} height={153} alt="" />
        </div>
        <div className="rounded border border-blue px-4 py-8 mb-4 lg:mb-0">
          <Image src="/img/dog.png" width={148} height={153} alt="" />
        </div>
      </div>
      <p className="text-center m-8 text-green">4 Eggs - 2 Animals</p>
      <div className="flex justify-center items-center">
        <a href="/market" className="bg-gradient-to-b from-purple to-blue text-white font-semibold text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full">
          Buy $ZOO
        </a>
      </div>
      <TransactionHistory />
    </div>
  );
};

export default MyWalletSection;
