import Image from "next/image";
import Link from "next/link";
import React from "react";
import dynamic from 'next/dynamic'

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const GrabAnimal = ({ grabAnimal, grabAnimal2 }) => {
  return (
    <section className="AnimalFamily md:mt-40">
      <div className="px-6 py-8 md:py-20 mx-auto max-w-7xl">
        <h1 className="mb-4 text-3xl md:text-[44px] leading-[3rem] lg:leading-4 font-bold text-center">
          Or Grab an animal straightaway
        </h1>
        <div className="grid gap-x-60  ">
          {grabAnimal.map((_, i) => (
            <div
              className="w-full md:w-4/5 mx-auto md:mt-24 border-[#6D7278] border-b-[2px] pb-8"
              key={i}
            >
              <div
                className={`w-full flex flex-col md:flex-row items-center md:justify-between mb-11`}
              >
                <div className="flex-1 w-full md:w-1/2">
                  <div className="!w-full mx-auto bg-black justify-center  rounded-xl h-[364px] flex items-center ">
                    <div className="relative lg:w-[550px] h-80 overflow-y-hidden  ">
                      {_.icon && (
                        <Image
                          src={_.icon}
                          width="100%"
                          height="100%"
                          alt=""
                          layout="fill"
                          className="md:object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="font-bold text-2xl md:text-[44px] text-center w-[80%] md:w-[40%] md:leading-[58px] mb-3 md:mb-[18px] mx-auto mt-4 md:mt-0">
                    {_.title}
                  </p>

                  <Link href="/coming-soon" passHref>
                    <div className="px-5 py-3 text-[16px] font-semibold bg-black text-white flex items-center rounded-full w-max md:text-lg lg:px-16 hover:cursor-pointer mx-auto mt-4 md:mt-0">
                      <span className="">Buy Now</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 md:gap-16 mt-16 md:mt-32 md:w-4/5 mx-auto">
          {grabAnimal2?.map((_, i) => (
            <div key={i}>
              <div className="mx-auto bg-black justify-center  rounded-xl md:h-[364px] flex items-center ">
                <div className="relative lg:w-[400px] h-64 overflow-y-hidden  ">
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
              <p className="font-bold text-2xl md:text-[44px] mt-4 md:mt-16 md:leading-[64px] mb-3 md:mb-[18px] mx-auto text-center md:text-left">
                {_.title}
              </p>
              <p className="text-sm sm:text-base mt-4 mb-4 sm:mt-8 sm:mb-8 text-center md:text-left text-[#A4A7AE] text-[20px] leading-[24px]">
                {_.description}
              </p>
              <div className="px-5 py-3 text-[16px] font-semibold bg-black text-white flex items-center rounded-full w-max md:text-lg mb-8 md:px-6 md:py-4 lg:px-10 hover:cursor-pointer mx-auto md:ml-0">
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
