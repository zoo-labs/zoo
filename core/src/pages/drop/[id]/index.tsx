/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import DropLayout from "layouts/Drop";
import { NullLayout } from "..";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useGetAvailableEggs } from "state/zoo/hooks";
import { useGetDrops } from "state/drop/hooks";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Drop } from "types";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const SingleDrop = ({}: AppProps & {
  Component: NextComponentType<NextPageContext>;
  Layout: (title: string) => void;
}) => {
  const {
    query: { id },
  } = useRouter();
  const getDrops = useGetDrops();
  const [drop, setDrop] = useState<Drop>();
  const [activeDrop, setActiveDrop] = useState(0);
  const { drops } = useSelector((state: any) => state.drop);

  useEffect(() => {
    getDrops();
  }, [getDrops]);

  useEffect(() => {
    if (drops.length > 0) {
      const newDrop = drops.filter((drop) => drop.dropId === Number(id))[0];
      setDrop(newDrop);
    }
  }, [drops, id]);

  return (
    <DropLayout isMarginTop={false}>
      <div className="min-h-screen mx-auto max-w-7xl my-28">
        <div className="relative flex flex-col-reverse items-start min-h-screen px-4 lg:flex-row">
          <div className="flex-1 w-full lg:max-w-[650px] lg:pl-24 lg:pt-28 z-50">
            <div className=" lg:pl-20">
              <p className="font-medium text-[32px] leading-9 mb-4">
                {Number(id) < 9 && 0}
                {id}
              </p>
              {/* <img src="/images/zoo-nft-drop.png" alt="" /> */}
              <p className="font-bold text-4xl lg:text-7xl mb-[17.5px] overflow-visible z-50 lg:whitespace-nowrap">
                {drop?.title}
                {/* <span>ZOO NFT D</span>
                <span>R</span>
                <span>OP</span> */}
              </p>
            </div>
            <p className="text-base text-[#8F8E97] font-light pr-3 mb-10">
              {drop?.description}
            </p>
            <div className="flex items-center mb-24">
              <div className="pr-12">
                <p className="text-2xl font-bold">{drop?.dropSupply}</p>
                <p className="mt-0.5 text-[#BCBABA] text-xs font-light">
                  In collection
                </p>
              </div>
              <div className="px-12 relative before:absolute before:w-px before:h-full before:bg-[#22233A] before:left-0 after:absolute after:w-px after:h-full after:bg-[#22233A] after:right-0 after:top-0">
                <p className="text-2xl font-bold">
                  {drop?.supply - drop?.minted}
                </p>
                <p className="mt-0.5 text-[#BCBABA] text-xs font-light">
                  For Sale
                </p>
              </div>
              <div className="pl-12">
                {drop && (
                  <p className="text-2xl font-bold">
                    {Math.min(
                      ...drop?.items.map((item) => item.price.toFixed(2))
                    )}{" "}
                    -{" "}
                    {Math.max(
                      ...drop?.items.map((item) => item.price.toFixed(2))
                    )}
                  </p>
                )}

                <p className="mt-0.5 text-[#BCBABA] text-xs font-light">
                  Floor price
                </p>
              </div>
            </div>
            <p className="mb-5">COLLECTION</p>
            <div className="flex flex-wrap">
              {drop?.items?.map((datum, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveDrop(datum.id)}
                  onMouseLeave={() => setActiveDrop(0)}
                  className="w-full p-2 cursor-pointer md:w-1/2"
                >
                  <div className="relative overflow-hidden rounded p-[2px] parent">
                    <div className="h-[450px] w-full">
                      {datum.kind === 0 || datum.kind === 2 ? (
                        <video
                          autoPlay
                          loop
                          src={datum.animation_url}
                          width={"100%"}
                          height={350}
                          className="rounded overflow-hidden max-h-[450px] object-cover"
                        />
                      ) : (
                        <div className="h-[450px] w-full">
                          <ModelViewer
                            glb={datum?.glb_animation_url}
                            usdz={datum?.usdz_animation_url}
                          ></ModelViewer>
                        </div>
                      )}
                    </div>
                    <div
                      className={`${
                        activeDrop === datum.id ? "visible" : "hidden"
                      } absolute right-5 top-5`}
                    >
                      {Number(id) === 100 ? (
                        <div className="flex items-center justify-center text-sm font-medium border-2 rounded-full h-36 w-36">
                          Coming Soon
                        </div>
                      ) : (
                        <Link href={`/market/egg/${datum.id}`} passHref>
                          <div className="flex items-center justify-center w-20 h-20 text-sm font-medium border-2 rounded-full cursor-pointer">
                            BUY
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="lg:absolute right-0 w-full  lg:w-[613px] lg:h-[780px] mb-16 lg:mb-0"
            style={{
              zIndex: 1,
              background: "url(/images/drop/roadmap-bg.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              className="rounded overflow-hidden max-h-[370px]  lg:max-h-[780px] object-cover"
              src={drop?.image}
              alt=""
            />
          </div>
        </div>
      </div>
    </DropLayout>
  );
};

SingleDrop.Layout = NullLayout;
export default SingleDrop;
