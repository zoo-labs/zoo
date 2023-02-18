import Image from "next/image";
import Link from "next/link";
import React from "react";

const ReliableGovernance = () => {
  return (
    <div className="max-w-7xl mx-auto">
    <div className="w-5/6 mx-auto mt-24">
    <div
      className={`w-full flex flex-col-reverse md:flex-row items-center md:justify-between mb-11`}
    >
      <div className="md:w-1/2">
        <p className="font-bold text-center lg:text-left mt-8 text-2xl md:text-[44px] md:leading-none mb-3 md:mb-[18px]">
          Reliable Governance
        </p>
        <p className="mb-5 md:mb-8 font-medium text-sm md:text-[20px] leading-7 text-muted-40 text-center lg:text-left mt-4">
          Our DAO leverages holographic consensus and quadratic voting.
        </p>
        <Link href="/coming-soon" passHref>
          <div className="px-5 py-3 text-[16px] font-semibold bg-black text-white flex items-center justify-between rounded-full w-48 md:text-lg md:px-6 lg:px-4 hover:cursor-pointer mx-auto lg:ml-0 mt-8">
            <span className="mr-2">Learn More</span>
            <Image
              src="/icons/forward-arrow.svg"
              width={24}
              height={24}
              alt=""
            />
          </div>
        </Link>
      </div>
      <div className="flex-1 w-full md:w-1/2 ">
        <div className="w-full bg-black  rounded-xl h-[364px] flex items-center justify-center">
          <img src={"/img/partnership.svg"} alt="" />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ReliableGovernance;
