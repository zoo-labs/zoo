import React from "react";
import { FaHeart, FaMoneyBill, FaMoneyBillWave } from "react-icons/fa";
import { useRouter } from "next/router";
import { accountEllipsis, getEmoji } from "functions";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Auction } from "types";
import moment from "moment";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

interface IndexProps {
  datum: Auction;
  applyMaxWidth: boolean;
  placeBid: () => void;
}

const Index: React.FC<IndexProps> = ({ datum, applyMaxWidth, placeBid }) => {
  const router = useRouter();
  console.log("DATAUM", datum);
  return (
    <div
      className="flex flex-col "
      onClick={() =>
        router.push({
          pathname: `/market/${datum.tokenID}/info`,
        })
      }
    >
      <div className="relative overflow-hidden rounded bg-nft-gradient parent">
        <div className="h-[450px] w-[300px]">
          {datum.kind === 0 ? (
            <video
              autoPlay
              loop
              src={datum.animation_url}
              width={300}
              height={350}
            />
          ) : (
            <div className="h-[450px] w-[300px]">
              <ModelViewer
                glb={datum?.glb_animation_url}
                usdz={datum?.usdz_animation_url}
              ></ModelViewer>
            </div>
          )}
        </div>

        <div className="absolute top-0 left-0 invisible w-full h-full transition-all duration-300 rounded opacity-0 hover:visible hover:opacity-100">
          <div className="absolute px-2 py-1 text-xs font-bold uppercase rounded top-6 left-3 bg-primary ">
            {/* {datum.bloodline || (datum.basic ? "BASIC" : "HYBRID")} */}
          </div>

          {/* <a
            onClick={() => placeBid()}
            className="absolute inline-flex items-center justify-center h-10 px-4 text-sm transition-all duration-300 transform rounded-full cursor-pointer left-1/2 bottom-6 min-w-max bg-primary -translate-x-2/4"
          >
            <span>Place a bid</span>
          </a> */}
        </div>
      </div>

      <div className="flex flex-col flex-grow py-4 no-underline cursor-pointer">
        <div className="flex flex-col flex-grow">
          <div className="flex mb-4 ">
            <div className="mt-1 mr-auto font-semibold">
              {datum.name || "Egg"}{" "}
              <span className="text-xs text-gray-500">
                ({datum.tokenID || ""})
              </span>
            </div>
            <div
              className="flex items-center justify-center flex-shrink-0 px-2 ml-2 text-xs font-bold uppercase rounded-sm primary"
              style={{ boxShadow: "inset 0 0 0 1px rgb(140, 79, 248)" }}
            >
              {datum.reservePrice} Z00
            </div>
          </div>
          <div className="flex ">
            <div className="flex mt-1 mr-auto text-xs font-semibold text-gray-500">
              <div className="w-4 h-4 mr-1 rounded-full bg-gradient-to-b from-btn1 to-btn2" />
              {accountEllipsis(datum.tokenOwner || "")}
            </div>
            <div className="flex items-center justify-center flex-shrink-0 ml-2 text-xs font-bold uppercase rounded-sm">
              {moment(
                new Date(new Date().getTime() + datum.duration * 1000),
                "YYYYMMDD"
              ).fromNow()}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-800 border-t border-gray-700 border-solid ">
          <div className="flex items-center text-xs font-semibold text-gray-500">
            <div className="mr-1">
              <FaMoneyBillWave />
            </div>
            Highest bid <span className="ml-1">{datum.amount} ZOO</span>
          </div>
          <div className="text-xs font-semibold text-gray-500">
            {datum?.attributes &&
              datum?.attributes.filter(
                (attr) => attr.trait_type === "Yields"
              )[0].value}{" "}
            Yields/Day
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
