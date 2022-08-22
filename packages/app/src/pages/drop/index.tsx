/* eslint-disable @next/next/no-img-element */
import DaoLayout from "layouts/Dao";
import DropLayout from "layouts/Drop";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import Image from "next/image";
import React from "react";

const animals = [
  "Amur Leopard",
  "Siberian Tiger",
  "Javan Rhino",
  "Sumatran Elephant",
];

const Drop = ({}: AppProps & {
  Component: NextComponentType<NextPageContext>;
  Layout: (title: string) => void;
}) => {
  return (
    <DropLayout isMarginTop={false}>
      <div className="font-made-outer-sans">
        <div className="bg-drop-tree min-h-[850px] flex flex-col items-center justify-center w-full px-4 mb-10">
          <div className="max-w-7xl">
            <div className="md:max-w-[698px] mx-auto text-center">
              <p className="font-bold text-3xl leading-10 md:leading-none md:text-6xl mb-4">
                ZOO NFT DROPS
              </p>
              <p className="font-light text-sm text-muted-20 mb-10 max-w-full overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Dictumst curabitur ullamcorper platea amet egestas suspendisse
                elementum.
              </p>
            </div>
            <div className="flex items-center justify-center gap-5 min-h-[372px]">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="relative">
                    <div className="flex items-end justify-center rounded-md w-56 h-[286px] hover:h-[372px] transform duration-100 ease-in-out bg-drop-nft before:bg-new before:w-full before:h-full before:absolute before:opacity-50 before:rounded-[4px]">
                      <Image
                        src="/images/drop/special-egg.svg"
                        alt=""
                        width={114}
                        height={160}
                      />
                      <div className="absolute bottom-2 right-2 h-10 w-10 rounded-full border flex items-center justify-center">
                        <Image
                          src="/icons/arrow-right-light.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="px-4 max-w-7xl mx-auto">
          <p className="text-center font-bold mb-[62px] text-[42px] leading-10 w-max mx-auto relative before:absolute before:h-1 before:w-[50%] before:inset-x-[28%] before:-top-3 after:h-1 after:absolute after:w-[50%] after:bg-new  after:-bottom-3 after:inset-x-[28%] before:bg-new">
            What is Zoo?
          </p>
          <div className="flex flex-col md:flex-row md:justify-between mb-44">
            <div className="flex-1 py-4 px-2 pr-5">
              <p className="font-medium text-4xl mb-4">
                Exotic animals for everyone.
              </p>
              <p className="text-sm font-normal text-muted-20 leading-7 tracking-tight mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                non in viverra metus id. Pharetra lorem felis at vestibulum,
                massa nibh justo consectetur tristique. Vestibulum et velit
                elementum molestie.Lorem ipst, consectetur adipiscing elit. Diam
                non in viverra metus id. Pharetra lor f ePharetralis at
                vestibulum, massa nibh justo consectetur triste. Vestibulum
                Pharetraet velit elementum molestie.etus i
              </p>
              <button className="p-px bg-new rounded-full">
                <button className="bg-[#13152B] py-3.5 px-8 rounded-full">
                  Enter Marketplace
                </button>
              </button>
            </div>
            <div className="flex-1">
              <img src="/images/drop/paradise.png" alt="" />
            </div>
          </div>
          <div className="w-full p-px pb-0 bg-new mb-[214px]">
            <div className="bg-[#0B192D] pt-10 px-6 md:px-12 flex flex-col md:flex-row justify-between relative">
              <div className="flex-1 md:max-w-[75%] pb-10">
                <p className="text-[26px] leading-8 mb-3 text-zoo-green-1">
                  Ready to Hatch?
                </p>
                <p className="text-sm text-muted-20">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                  non in viverra metus id. Pharetra lorem felis at vestibulum,
                  massa nibh justo consectetur tristique. Vestibulum et velit
                  elementum molestie.Lorem ipst, consectetur adipiscing elit.
                  Diam non in viverra metus id. Pharetra lor f ePharetralis at
                  vestibulum, massa nibh justo consectetur triste. Vestibulum
                  Pharetraet velit elementum molestie.etus i
                </p>
              </div>
              <img
                src="/images/drop/special-egg.svg"
                alt=""
                className="md:-top-24 md:absolute right-12"
              />
            </div>
          </div>
          <div className="md:max-w-[45%] mb-10">
            <p className="text-left font-bold mb-3 text-[42px] leading-10 w-max relative before:absolute before:h-1 before:w-[55%] before:left-0 before:-top-3 before:bg-new">
              Our Drops
            </p>
            <p className="text-muted-20 text-sm leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam non
              in viverra metus id. Pharetra lorem felis at vestibulum, massa
              nibh justo consectetur tristique. Vestibulum
            </p>
          </div>
          {animals.map((_, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center mb-11`}
            >
              <div className="">
                <img src="/images/animal.png" alt="" />
              </div>
              <div
                className={`flex-1 mt-5 md:mt-auto ${
                  i % 2 === 0 ? "md:pl-14" : "md:pr-14"
                } `}
              >
                <p className="font-medium text-[32px] leading-8 mb-[18px]">
                  {_}
                </p>
                <p className="text-sm text-muted-20 leading-7 mb-8">
                  The Siberian tiger is a tiger from a specific population of
                  the Panthera tigris tigris subspecies native to the Russian
                  Far East, Northeast China. It once ranged throughout the
                  Korean Peninsula, north China, and eastern Mongolia. The
                  population currently inhabits mainly the Sikhote-Alin mountain
                  region in southwest Primorye The population currently inhabits
                  mainly the Sikhote-Alin mountain region in southwest
                </p>
                <div className="text-left flex items-center font-normal mb-3 text-sm leading-10 w-max relative before:absolute before:h-1 before:w-[70%] before:left-0 before:-top-2 before:bg-new cursor-pointer">
                  <a className="mr-1">View Sumatran Elephant</a>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mb-28">
            <button className="p-px bg-new rounded-full">
              <button className="bg-[#13152B] py-3.5 px-8 rounded-full">
                View on Marketplace
              </button>
            </button>
          </div>

          <div className="flex flex-col-reverse md:items-center mb-32">
            <img src="/images/drop/roadmap.png" alt="" />
            <div className="md:text-right flex-1 mb-5 md:mb-auto md:pl-12">
              <div className="flex flex-col md:items-end">
                <p className="text-right flex justify-end font-bold mb-3 text-[42px] leading-10 w-max relative before:absolute before:h-1 before:w-[70%] before:left-0 md:before:left-auto before:md:right-0 before:-top-2 before:bg-new cursor-pointer">
                  Our Roadmap
                </p>
                <p className="text-sm text-muted-20 leading-7 mb-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Feugiat dolor, convallis vitae id platea faucibus. Vel
                  consectetur nunc nulla sed mattis fermentum montes, sagittis
                  eros. Ipsum scelerisque turpis nec fames donec sit tempus
                  purus. E
                </p>
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={`py-[26px] px-2 flex items-center ${
                        i === 0 ? "border-y" : "border-b"
                      } border-[#3F3F3F]`}
                    >
                      <p className="text-new-clip text-4xl mr-7">0{i + 1}</p>
                      <p className="font-light text-lg text-left">
                        High quality rendered and equally affordable dropsHigh
                        quality rendered and equally affordable drops
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col  items-center justify-center text-center max-w-[1109px] mx-auto mb-44">
            <p className="text-[42px] leading-10 font-bold mb-6">
              Join the <span className="text-new-clip">Community</span>
            </p>
            <p className="font-light text-lg text-muted-20 leading-8 mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate
            </p>
            <button className="bg-new p-[22px] rounded-full flex items-center text-sm font-bold w-max mx-auto">
              <Image src="/icons/discord.svg" alt="" width={24} height={18} />
              <a className="ml-2.5">Join Our Discord</a>
            </button>
          </div>
        </div>
      </div>
    </DropLayout>
  );
};

const NullLayout = ({ children }) => {
  return <>{children}</>;
};

Drop.Layout = NullLayout;
export default Drop;
