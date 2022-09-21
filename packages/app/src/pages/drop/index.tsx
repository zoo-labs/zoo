/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import DaoLayout from "layouts/Dao";
import DropLayout from "layouts/Drop";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import GameFi from "pages/home/GameFi";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAvailableEggs } from "state/zoo/hooks";
import { useGetDrops } from "state/drop/hooks";
import { addDrops } from "state/drop/action";
import { AvailableEgg } from "types";
import dynamic from "next/dynamic";
import usePlayer from "hooks/usePlayer";
import { PlayCircleFilled } from "@mui/icons-material";
import { PauseCircleFilled } from "@mui/icons-material";
import { useZooKeeper } from "hooks";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const animals = [
  "Amur Leopard",
  "Siberian Tiger",
  "Javan Rhino",
  "Sumatran Elephant",
];

const gameFi = [
  {
    title: "Set Up Wallet",
    icon: "/icons/empty-wallet.svg",
    description: (
      <>
        Set up your wallet with <a className="underline">Metamask</a> and login{" "}
        <a className="underline">here</a> to view the Zoo Marketplace. Learn
        about which wallets are supported <a className="underline">here.</a>
      </>
    ),
  },
  {
    title: "Create Your Collection",
    icon: "/icons/music-playlist.svg",
    description: (
      <>
        After you have successfully logged in with your wallet you will be able
        to purchase your very first Zoo Eggs or NFTs and begin feeding your
        animal currency!
      </>
    ),
  },
  {
    title: "Mint and Breed",
    icon: "/icons/breed.svg",
    description: (
      <>
        As you feed your animal just enough $ it will actually mint an older
        version of itself. Collect the egg, baby, teen and adult version. AND
        with two adults you can breed another!
      </>
    ),
  },
  {
    title: "Marketplace",
    icon: "/icons/shop.svg",
    description: (
      <>
        The Zoo <a className="underline">Marketplace</a> not only benefits
        members through its fees but also allows you to buy, sell, make offers
        and trade for additional benefits $$.
      </>
    ),
  },
];

const Drop = ({}: AppProps & {
  Component: NextComponentType<NextPageContext>;
  Layout: (title: string) => void;
}) => {
  const { playing, setPlaying } = usePlayer("animals");
  const { availableEggs } = useSelector((state: any) => state.zoo);
  const { drops } = useSelector((state: any) => state.drop);
  const getAvailableEggs = useGetAvailableEggs();
  const getDrops = useGetDrops();
  const zookeeper = useZooKeeper();
  useEffect(() => {
    if (zookeeper) {
      getAvailableEggs();
      getDrops();
    }
  }, [zookeeper]);

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
                    <div className="flex items-end justify-center rounded-md w-56 h-[286px] transform duration-100 ease-in-out bg-black border border-33">
                      <div className="w-full h-full">
                        {_.kind === 0 || _.kind === 2 ? (
                          <video
                            src={_.animation_url}
                            autoPlay
                            loop
                            className="object-cover w-full max-h-full overflow-hidden rounded"
                          />
                        ) : (
                          // <div className="h-[450px] w-[300px]">
                          //   <ModelViewer
                          //     glb={datum?.glb_animation_url}
                          //     usdz={datum?.usdz_animation_url}
                          //   ></ModelViewer>
                          // </div>
                          <Image
                            src={_.image}
                            alt=""
                            width={298}
                            height={334}
                          />
                        )}
                      </div>
                      <Link href={`/market/egg/${_.id}`} passHref>
                        <a className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-33 bottom-2 right-2">
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
          <p className="text-center font-bold mb-[62px] text-[42px] leading-10 w-max mx-auto relative before:absolute before:h-[2.5px] before:w-[50%] before:inset-x-[28%] before:-top-3 after:h-[2.5px] after:absolute after:w-[50%] after:bg-black  after:-bottom-3 after:inset-x-[28%] before:bg-black">
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
                <button className="bg-black border border-gray-150 py-3.5 px-8 rounded-full">
                  Enter Marketplace
                </button>
              </Link>
            </div>
            <div className="relative flex-1">
              {playing ? (
                <button
                  className="player__button"
                  onClick={() => setPlaying(false)}
                >
                  <PauseCircleFilled />
                </button>
              ) : (
                <button
                  className="player__button"
                  onClick={() => setPlaying(true)}
                >
                  <PlayCircleFilled />
                </button>
              )}
              <video id="player-animals" controls={false} muted>
                <source
                  src={"/videoes/trippy_animals_short.mov"}
                  type="video/mp4"
                ></source>
              </video>
            </div>
          </div>
          <div className="w-full p-px bg-gray-150 mb-[214px]">
            <div className="relative flex flex-col justify-between px-6 pt-10 bg-black md:px-12 md:flex-row">
              <div className="flex-1 md:max-w-[75%] pb-10">
                <p className="text-[26px] leading-8 mb-3 text-white">
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
                src="/images/drop/white-egg.svg"
                alt=""
                className="md:-top-52 md:absolute -right-4"
              />
            </div>
          </div>
          <div className="md:max-w-[45%] mb-10">
            <p className="text-left font-bold mb-3 text-[42px] leading-10 w-max relative before:absolute before:h-1 before:w-[55%] before:left-0 before:-top-3 before:bg-black">
              Our Drops
            </p>
            <p className="text-sm leading-7 text-muted-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam non
              in viverra metus id. Pharetra lorem felis at vestibulum, massa
              nibh justo consectetur tristique. Vestibulum
            </p>
          </div>
          {drops.map((drop, i) => {
            console.log("droppppp", drop);
            return (
              <div
                key={i}
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center mb-11`}
              >
                <div className="bg-dropnft max-w-[464px] w-[40%] md:w-full flex items-center justify-center rounded">
                  <div className="w-full h-[435px] flex items-center justify-center">
                    {/* <video
                      src={_.animation_url}
                      autoPlay
                      loop
                      className="object-cover w-full max-h-full overflow-hidden rounded"
                    /> */}
                    {drop?.items[0].kind === 0 || drop?.items[0].kind === 2 ? (
                      <img
                        src={drop?.image}
                        className="object-cover w-full max-h-full overflow-hidden rounded"
                      />
                    ) : (
                      <div className="h-[435px] w-full">
                        <ModelViewer
                          glb={drop.glb_animation_url}
                          usdz={drop.usdz_animation_url}
                        ></ModelViewer>
                      </div>
                      // <Image src={_.image} alt="" width={298} height={334} />
                    )}
                  </div>
                </div>
                <div
                  className={`flex-1 mt-5 md:mt-0 ${
                    i % 2 === 0 ? "md:pl-14" : "md:pr-14"
                  } `}
                >
                  <p className="font-medium text-[32px] leading-8 mb-[18px]">
                    {drop.title}
                  </p>
                  <p className="mb-8 text-sm leading-7 text-muted-20">
                    {drop.description}
                  </p>
                  <Link href={`/drop/${drop.dropId}`} passHref>
                    <div className="text-left flex items-center font-normal mb-3 text-sm leading-10 w-max relative before:absolute before:h-1 before:w-[70%] before:left-0 before:-top-2 before:bg-black cursor-pointer">
                      <a className="mr-1">View {drop.name}</a>
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
            );
          })}
          <div className="flex justify-center mb-28">
            <Link href="/market" passHref>
              <button className="p-px rounded-full bg-gray-150">
                <button className="bg-black py-3.5 px-8 rounded-full">
                  View Marketplace
                </button>
              </button>
            </Link>
          </div>

          <GameFi gameFi={gameFi} />

          {/* <div className="flex flex-col-reverse mb-32 md:flex-row md:items-center">
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
          </div> */}

          <div className="flex flex-col  items-center justify-center text-center max-w-[1109px] mx-auto mt-40 mb-44">
            <p className="text-[42px] leading-10 font-bold mb-6">
              Join the Community
            </p>
            <p className="mb-10 text-lg font-light leading-8 text-muted-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate
            </p>
            <button className="bg-black p-[22px] rounded-full flex items-center text-sm font-bold w-max mx-auto">
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
