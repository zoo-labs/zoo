import Link from "next/link";
import React from "react";

const StartCollecting = () => {
  return (
    <div className="flex flex-col px-6 mx-auto -mb-32 max-w-7xl gap-10 mt-6 lg:gap-36 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex-1">
        <p className="text-3xl md:text-6xl font-bold mb-4 md:mb-9">
          It all starts with one egg.
        </p>
        <Link href="/drop" passHref>
          <div className="px-5 py-3 text-sm font-medium text-white bg-33 rounded-full md:text-lg md:px-6 md:py-4 lg:px-10 hover:cursor-pointer w-max">
            Start Collecting
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-1 h-full max-h-[198px] md:max-h-[583px] border border-33 rounded-2xl max-w-max mx-auto bg-black">
        <video
          src="https://zoolabs.mypinata.cloud/ipfs/QmeoB3GHivCqzvX27E5RZE4nwNXkikdkbv5iiqyqUW3Qwu"
          autoPlay
          loop
          className="object-contain md:object-cover w-full min-w-[85vw] md:min-w-[521px] h-full max-h-[196px] md:max-h-[583px] overflow-hidden rounded-2xl"
        />
      </div>
    </div>
  );
};

export default StartCollecting;
