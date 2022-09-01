/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import DropLayout from "layouts/Drop";
import { NullLayout } from "..";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useGetAvailableEggs } from "state/zoo/hooks";

const SingleDrop = ({}: AppProps & {
  Component: NextComponentType<NextPageContext>;
  Layout: (title: string) => void;
}) => {
  const {
    query: { id },
  } = useRouter();
  const { availableEggs } = useSelector((state: any) => state.zoo);
  const getAvailableEggs = useGetAvailableEggs();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getAvailableEggs();
  }, [getAvailableEggs]);

  useEffect(() => {
    const eggs = availableEggs?.filter((e) => Number(e.id) !== Number(id));
    setCollections(eggs);
  }, [availableEggs, id]);

  return (
    <DropLayout isMarginTop={false}>
      <div className="max-w-7xl min-h-screen mx-auto my-28">
        <div className="flex items-start min-h-screen px-4 relative">
          <div className="flex-1 w-full max-w-[700px] pl-24 pt-28 z-50">
            <div className="pl-20">
              <p className="font-medium text-[32px] leading-9 mb-4">0{id}</p>
              {/* <img src="/images/zoo-nft-drop.png" alt="" /> */}
              <p className="font-bold text-7xl mb-[17.5px] overflow-visible z-50 whitespace-nowrap">
                <span>ZOO NFT D</span>
                <span>R</span>
                <span>OP</span>
              </p>
            </div>
            <p className="text-base text-[#8F8E97] font-light pr-3 mb-10">
              <span className="font-normal text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>{" "}
              Turpis nisi, sit pellentesque praesent turpis viverra auctor
              sodales ut.Turpis nisi, sit pellentesque praesent turpis viverra
              auctor sodales ut.
            </p>
            <div className="flex items-center mb-24">
              <div className="pr-12">
                <p className="text-2xl font-bold">54</p>
                <p className="mt-0.5 text-[#BCBABA] text-xs font-light">
                  In collection
                </p>
              </div>
              <div className="px-12 relative before:absolute before:w-px before:h-full before:bg-[#22233A] before:left-0 after:absolute after:w-px after:h-full after:bg-[#22233A] after:right-0 after:top-0">
                <p className="text-2xl font-bold">346</p>
                <p className="mt-0.5 text-[#BCBABA] text-xs font-light">
                  For Sale
                </p>
              </div>
              <div className="pl-12">
                <p className="text-2xl font-bold">3.2</p>
                <p className="mt-0.5 text-[#BCBABA] text-xs font-light">
                  Floor price
                </p>
              </div>
            </div>
            <p className="mb-5">COLLECTION</p>
            {collections.map((datum) => (
              <div key={datum.id} className="w-full p-2 md:w-1/2">
                <div className="relative overflow-hidden rounded p-[2px] bg-nft-gradient parent">
                  <div className="h-[450px] w-full">
                    <video
                      autoPlay
                      loop
                      src={datum.animation_url}
                      width={"100%"}
                      height={350}
                      className="rounded overflow-hidden max-h-[450px] object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <img
            src="/images/drop/roadmap.png"
            alt=""
            className="absolute right-0"
            style={{
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </DropLayout>
  );
};

SingleDrop.Layout = NullLayout;
export default SingleDrop;
