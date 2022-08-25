/* eslint-disable @next/next/no-img-element */
import React from "react";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import DropLayout from "layouts/Drop";
import { NullLayout } from "..";

const SingleDrop = ({}: AppProps & {
  Component: NextComponentType<NextPageContext>;
  Layout: (title: string) => void;
}) => {
  return (
    <DropLayout isMarginTop={false}>
      <div className="max-w-7xl min-h-screen mx-auto my-16">
        <div className="flex items-center h-screen px-4 relative">
          <div className="flex-1 w-full max-w-[700px] pl-24 ">
            <div className="pl-20">
              <p className="font-medium text-[32px] leading-9 mb-4">01</p>
              <p className="font-bold text-7xl mb-[17.5px] overflow-visible z-50 whitespace-nowrap">
                <span>ZOO NFT D</span>
                <span>R</span>
                <span>OP</span>
              </p>
            </div>
            <p className="text-base text-[#8F8E97] font-light pr-3">
              <span className="font-normal text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>{" "}
              Turpis nisi, sit pellentesque praesent turpis viverra auctor
              sodales ut.Turpis nisi, sit pellentesque praesent turpis viverra
              auctor sodales ut.
            </p>
          </div>
          <img src="/images/drop/roadmap.png" alt="" className="" />
        </div>
      </div>
    </DropLayout>
  );
};

SingleDrop.Layout = NullLayout;
export default SingleDrop;
