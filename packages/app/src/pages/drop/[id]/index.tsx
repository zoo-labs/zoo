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
  const [collections, setCollections] = useState([]);
  const [drop, setDrop] = useState<any>({});
  const { drops } = useSelector((state: any) => state.drop);
  const getDrops = useGetDrops();
  useEffect(() => {
    getDrops();
  }, [getDrops]);

  useEffect(() => {
    const eggs = drops?.filter((e) => Number(e.id) !== Number(id));
    const drop_ = drops?.find((e) => Number(e.id) === Number(id));
    setCollections(eggs);
    setDrop(drop_);
  }, [drops, id]);

  return (
    <DropLayout isMarginTop={false}>
      <div className="max-w-7xl min-h-screen mx-auto my-28">
        <div className="flex items-start min-h-screen px-4 relative">
          <div className="flex-1 w-full max-w-[650px] pl-24 pt-28 z-50">
            <div className="pl-20">
              <p className="font-medium text-[32px] leading-9 mb-4">
                {Number(id) < 9 && 0}
                {id}
              </p>
              {/* <img src="/images/zoo-nft-drop.png" alt="" /> */}
              <p className="font-bold text-7xl mb-[17.5px] overflow-visible z-50 whitespace-nowrap">
                {drop?.name}
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
                <p className="text-2xl font-bold">-</p>
                <p className="mt-0.5 text-[#BCBABA] text-xs font-light">
                  In collection
                </p>
              </div>
              <div className="px-12 relative before:absolute before:w-px before:h-full before:bg-[#22233A] before:left-0 after:absolute after:w-px after:h-full after:bg-[#22233A] after:right-0 after:top-0">
                <p className="text-2xl font-bold">
                  {Number(id) === 100 ? "-" : drop?.supply - drop?.minted}
                </p>
                <p className="mt-0.5 text-[#BCBABA] text-xs font-light">
                  For Sale
                </p>
              </div>
              <div className="pl-12">
                <p className="text-2xl font-bold">
                  {Number(id) === 100 ? "-" : drop?.price}
                </p>
                <p className="mt-0.5 text-[#BCBABA] text-xs font-light">
                  Floor price
                </p>
              </div>
            </div>
            <p className="mb-5">COLLECTION</p>
            {collections.map((datum) => (
              <Link key={datum.id} href={`/drop/${datum.id}`} passHref>
                <div className="w-full p-2 md:w-1/2 cursor-pointer">
                  <div className="relative overflow-hidden rounded p-[2px] bg-nft-gradient parent">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            className="absolute right-0 lg:w-[613px] lg:h-[780px]"
            style={{
              zIndex: 1,
              background: "url(/images/drop/roadmap-bg.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <img src="" alt="" /> */}
            {drop?.kind === 0 || drop?.kind === 2 ? (
              <video
                autoPlay
                loop
                src={drop?.animation_url}
                width={"100%"}
                height={350}
                className="rounded overflow-hidden max-h-[780px] object-cover"
              />
            ) : (
              <div className="h-[780px] w-full">
                <ModelViewer
                  glb={drop?.glb_animation_url}
                  usdz={drop?.usdz_animation_url}
                ></ModelViewer>
              </div>
            )}
            <div className="absolute right-5 bottom-5">
              {Number(id) === 100 ? (
                <div className="h-36 w-36 rounded-full border-2 flex items-center justify-center font-medium text-sm">
                  COMING SOON
                </div>
              ) : (
                <Link href={`/market/egg/${id}`} passHref>
                  <div className="h-24 w-24 rounded-full border-2 flex items-center justify-center font-medium text-sm cursor-pointer">
                    BUY
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </DropLayout>
  );
};

SingleDrop.Layout = NullLayout;
export default SingleDrop;
