import Image from "next/image";
import Link from "next/link";
import React from "react";

const GrabAnimal = ({ grabAnimal, grabAnimal2 }) => {
  return (
    <section className="AnimalFamily">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h1 className="mb-4 text-[44px] leading-[3rem] lg:leading-4 font-bold md:text-center">
          Or Grab an animal straightaway
        </h1>
        <div className="grid gap-x-60  ">
          {grabAnimal.map((_, i) => (
            <div
              className="w-4/5 mx-auto mt-24 border-[#6D7278] border-b-[2px] pb-8"
              key={i}
            >
              <div
                className={`w-full flex flex-col md:flex-row items-center md:justify-between mb-11 bg-red-100`}
              >
                <div className="flex-1 w-full md:w-1/2">
                  <div className="!w-full mx-auto bg-black justify-center  rounded-xl h-[364px] flex items-center ">
                    <div className="relative lg:w-[550px] h-80 overflow-y-hidden bg-[#151516] ">
                      {_.icon && (
                        <Image
                          src={_.icon}
                          width="100%"
                          height="100%"
                          alt=""
                          layout="fill"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="font-bold text-2xl md:text-[44px] text-center w-[40%] md:leading-[64px] mb-3 md:mb-[18px] mx-auto">
                    {_.title}
                  </p>

                  <Link href="/coming-soon" passHref>
                    <div className="px-5 py-3 text-[16px] font-semibold bg-black text-white flex items-center rounded-full w-max md:text-lg md:px-6 md:py-4 lg:px-10 hover:cursor-pointer mx-auto">
                      <span className="mr-2">Buy Now</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-16 mt-32 w-4/5 mx-auto">
          {grabAnimal2.map((_, i) => (
            <div key={i}>
              <div className="mx-auto bg-black justify-center  rounded-xl h-[364px] flex items-center ">
                <div className="relative lg:w-[400px] h-64 overflow-y-hidden bg-[#151516] ">
                  {_.icon && (
                    <Image
                      src={_.icon}
                      width="100%"
                      height="100%"
                      alt=""
                      layout="fill"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <p className="font-bold text-2xl md:text-[44px] text-left mt-16 md:leading-[64px] mb-3 md:mb-[18px] mx-auto">
                {_.title}
              </p>
              <p className="text-sm sm:text-base mt-4 mb-24 sm:mt-8 sm:mb-8 text-left">
                {_.description}
              </p>
              <div className="px-5 py-3 text-[16px] font-semibold bg-black text-white flex items-center rounded-full w-max md:text-lg md:px-6 md:py-4 lg:px-10 hover:cursor-pointer">
                <span className="mr-2">Learn More</span>
                <Image
                  src="/icons/forward-arrow.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrabAnimal;
