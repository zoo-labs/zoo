/* eslint-disable @next/next/no-img-element */
import DaoLayout from "layouts/Dao";
import DropLayout from "layouts/Drop";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAvailableEggs } from "state/zoo/hooks";
import { AvailableEgg } from "types";

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
  const { availableEggs } = useSelector((state: any) => state.zoo);
  const getAvailableEggs = useGetAvailableEggs();

  useEffect(() => {
    getAvailableEggs();
  }, [getAvailableEggs]);

  return (
    <DropLayout isMarginTop={false}>
      <div className="">
        <div className="bg-drop-tree min-h-[850px] flex flex-col items-center justify-center w-full px-4 mb-10">
          <div className="max-w-7xl">
            <div className="md:max-w-[698px] mx-auto text-center">
              <p className="mb-4 text-3xl font-bold leading-10 md:leading-none md:text-6xl">
                ZOO NFT DROPS
              </p>
              <p className="max-w-full mb-10 overflow-hidden text-sm font-light text-muted-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Dictumst curabitur ullamcorper platea amet egestas suspendisse
                elementum.
              </p>
            </div>
            <div className="flex items-center justify-center gap-5 min-h-[372px]">
              {availableEggs.length ? (
                availableEggs?.map((_: AvailableEgg) => (
                  <div key={_.id} className="relative">
                    <div className="flex items-end justify-center rounded-md w-56 h-[286px] transform duration-100 ease-in-out bg-drop-nft before:bg-new before:w-full before:h-full before:absolute before:opacity-50 before:rounded-[4px]">
                      <div className="w-full h-full">
                        <video
                          src={_.animation_url}
                          autoPlay
                          loop
                          className="object-cover w-full max-h-full overflow-hidden rounded"
                        />
                      </div>
                      <Link href={`/market/egg/${_.id}`} passHref>
                        <a className="absolute flex items-center justify-center w-10 h-10 border rounded-full bottom-2 right-2">
                          <Image
                            src="/icons/arrow-right-light.svg"
                            alt=""
                            width={20}
                            height={20}
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-12 ">
                  <p className="text-lg text-center lg:text-3xl">
                    No eggs available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 mx-auto max-w-7xl">
          <p className="text-center font-bold mb-[62px] text-[42px] leading-10 w-max mx-auto relative before:absolute before:h-1 before:w-[50%] before:inset-x-[28%] before:-top-3 after:h-1 after:absolute after:w-[50%] after:bg-new  after:-bottom-3 after:inset-x-[28%] before:bg-new">
            What is Zoo?
          </p>
          <div className="flex flex-col md:flex-row md:justify-between mb-44">
            <div className="flex-1 px-2 py-4 pr-5">
              <p className="mb-4 text-4xl font-medium">
                Exotic animals for everyone.
              </p>
              <p className="mb-6 text-sm font-normal leading-7 tracking-tight text-muted-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                non in viverra metus id. Pharetra lorem felis at vestibulum,
                massa nibh justo consectetur tristique. Vestibulum et velit
                elementum molestie.Lorem ipst, consectetur adipiscing elit. Diam
                non in viverra metus id. Pharetra lor f ePharetralis at
                vestibulum, massa nibh justo consectetur triste. Vestibulum
                Pharetraet velit elementum molestie.etus i
              </p>
              <Link href="/market" passHref>
                <button className="p-px rounded-full bg-new">
                  <button className="bg-[#13152B] py-3.5 px-8 rounded-full">
                    Enter Marketplace
                  </button>
                </button>
              </Link>
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
            <p className="text-sm leading-7 text-muted-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam non
              in viverra metus id. Pharetra lorem felis at vestibulum, massa
              nibh justo consectetur tristique. Vestibulum
            </p>
          </div>
          {availableEggs.map((_, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center mb-11`}
            >
              <div className="bg-dropnft max-w-[464px] w-[40%] md:w-full flex items-center justify-center rounded">
                <div className="w-full h-[380px]">
                  <video
                    src={_.animation_url}
                    autoPlay
                    loop
                    className="object-cover w-full max-h-full overflow-hidden rounded"
                  />
                </div>
              </div>
              <div
                className={`flex-1 mt-5 md:mt-0 ${
                  i % 2 === 0 ? "md:pl-14" : "md:pr-14"
                } `}
              >
                <p className="font-medium text-[32px] leading-8 mb-[18px]">
                  {_.name}
                </p>
                <p className="mb-8 text-sm leading-7 text-muted-20">
                  The Siberian tiger is a tiger from a specific population of
                  the Panthera tigris tigris subspecies native to the Russian
                  Far East, Northeast China. It once ranged throughout the
                  Korean Peninsula, north China, and eastern Mongolia. The
                  population currently inhabits mainly the Sikhote-Alin mountain
                  region in southwest Primorye The population currently inhabits
                  mainly the Sikhote-Alin mountain region in southwest
                </p>
                <Link href={`/drop/${_.id}`} passHref>
                  <div className="text-left flex items-center font-normal mb-3 text-sm leading-10 w-max relative before:absolute before:h-1 before:w-[70%] before:left-0 before:-top-2 before:bg-new cursor-pointer">
                    <a className="mr-1">View {_.name}</a>
                    <Image
                      src="/icons/arrow-right.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </div>
                </Link>
              </div>
            </div>
          ))}
          <div className="flex justify-center mb-28">
            <Link href="/href" passHref>
              <button className="p-px rounded-full bg-new">
                <button className="bg-[#13152B] py-3.5 px-8 rounded-full">
                  View on Marketplace
                </button>
              </button>
            </Link>
          </div>

          <div className="flex flex-col-reverse mb-32 md:flex-row md:items-center">
            <img src="/images/drop/roadmap.png" alt="" />
            <div className="flex-1 mb-5 md:text-right md:mb-0 md:pl-12">
              <div className="flex flex-col md:items-end">
                <p className="text-right flex justify-end font-bold mb-3 text-[42px] leading-10 w-max relative before:absolute before:h-1 before:w-[70%] before:left-0 md:before:left-auto before:md:right-0 before:-top-2 before:bg-new cursor-pointer">
                  Our Roadmap
                </p>
                <p className="mb-10 text-sm leading-7 text-muted-20">
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
                      <p className="text-4xl text-new-clip mr-7">0{i + 1}</p>
                      <p className="text-lg font-light text-left">
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
            <p className="mb-10 text-lg font-light leading-8 text-muted-20">
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

export const NullLayout = ({ children }) => {
  return <>{children}</>;
};

Drop.Layout = NullLayout;
export default Drop;
