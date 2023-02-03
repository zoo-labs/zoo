import React, { useCallback, useEffect, useState } from "react";
import { FaHeart, FaMoneyBill, FaMoneyBillWave } from "react-icons/fa";
import { useRouter } from "next/router";
import { accountEllipsis, getEmoji } from "functions";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Auction } from "types";
import moment from "moment";
import Web3 from "web3";
import { useZooKeeper } from "hooks";
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
  const [zooBnbPrice, setZooBnbPrice] = useState(0);
  const zooKeeper = useZooKeeper();

  const getZooBnbPrice = useCallback(async () => {
    const price = await zooKeeper.BNBPrice();
    const value = Web3.utils.fromWei(price.toString(), "ether");
    setZooBnbPrice(parseFloat(value));
  }, [zooKeeper]);

  useEffect(() => {
    getZooBnbPrice();
  }, [getZooBnbPrice]);

  const amountBNB = zooBnbPrice * Number(datum?.amount);
  const reservePriceBNB = zooBnbPrice * Number(datum?.reservePrice);

  console.log(datum, "datum");

  return (
    // <div
    //   className="flex flex-col "
    //   onClick={() =>
    //     router.push({
    //       pathname: `/market/${datum.tokenID}/info`,
    //     })
    //   }
    // >
    //   <div className="relative overflow-hidden rounded p-[2px] border border-gray-500 parent bg-black">
    //     <div className="h-[450px] w-full">
    //       {datum.kind === 0 || datum.kind === 2 ? (
    //         <video
    //           autoPlay
    //           loop
    //           src={datum.animation_url}
    //           width={"100%"}
    //           height={350}
    //           className="rounded overflow-hidden max-h-[450px] object-cover"
    //         />
    //       ) : (
    //         <div className="h-[450px] min-w-[300px]">
    //           <ModelViewer
    //             glb={datum?.glb_animation_url}
    //             usdz={datum?.usdz_animation_url}
    //           ></ModelViewer>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   <div className="flex flex-col flex-grow py-4 no-underline cursor-pointer">
    //     <div className="flex flex-col flex-grow border-b border-gray-700 pb-4">
    //       <div className="flex mb-4 ">
    //         <div className="mt-1 mr-auto font-semibold">
    //           {datum.name || "Egg"} {datum.kind === 0 ? "(Origin)" : ""}{" "}
    //           <span className="text-xs text-gray-500">
    //             ({datum.tokenID || ""})
    //           </span>
    //         </div>
    //         <div
    //           className="flex items-center justify-center flex-shrink-0 px-2 ml-2 text-xs font-bold uppercase rounded-sm primary"
    //           style={{ boxShadow: "inset 0 0 0 1px rgb(140, 79, 248)" }}
    //         >
    //           {datum?.reservePrice} ZOO
    //         </div>
    //       </div>
    //       <div className="flex ">
    //         <div className="flex mt-1 mr-auto text-xs font-semibold text-gray-500">
    //           <div className="w-4 h-4 mr-1 rounded-full bg-gradient-to-b from-btn1 to-btn2" />
    //           {accountEllipsis(datum.tokenOwner || "")}
    //         </div>
    //         <div className="flex items-center justify-center flex-shrink-0 ml-2 text-xs font-bold uppercase rounded-sm">
    //           {moment(
    //             new Date(new Date().getTime() + datum.duration * 1000),
    //             "YYYYMMDD"
    //           ).fromNow()}
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex w-full items-center justify-between pt-3">
    //       {datum.attributes &&
    //         typeof datum.attributes === "object" &&
    //         datum.attributes.map((attr, index) => {
    //           // if (attr.trait_type === "Yields") return null;
    //           return (
    //             <div
    //               className={`flex flex-col text-xs relative ${
    //                 index !== 0 &&
    //                 index + 1 !== datum.attributes.length &&
    //                 "items-center"
    //               }
    //               ${index + 1 === datum.attributes.length && "items-end"}
    //               ${
    //                 datum.attributes.length !== index + 1 &&
    //                 "after:h-[24px] after:absolute after:w-px after:inset-y-[25%] after:right-0 after:bg-[#3D3D3D] after:content-[''] after:ml-0.5 "
    //               } w-full text-ellipsis whitespace-nowrap overflow-clip`}
    //               key={index}
    //             >
    //               <div>
    //                 <p className="text-[#797979]">{attr.trait_type}</p>
    //                 <p className="font-medium">{attr.value}</p>
    //               </div>
    //             </div>
    //           );
    //         })}
    //     </div>
    //     <div className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-800 border-t border-gray-700 border-solid ">
    //       <div className="flex items-center text-xs font-semibold text-gray-500">
    //         <div className="mr-1">
    //           <FaMoneyBillWave />
    //         </div>
    //         Highest bid
    //       </div>
    //       <div className="text-xs font-semibold text-gray-500">
    //         {datum?.amount} ZOO
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <></>

    <div>
      <div className="border border-t border-[#333333] rounded-xl p-4">
        <div className=" h-12">
          {datum?.attributes && (
            <div
              className={`flex items-center w-12 h-12 z-30 sticky ${
                datum?.attributes[0]?.value[0] == "E"
                  ? "bg-[#333333] intials-backdrop-e"
                  : "bg-[#FF592C] intials-backdrop "
              } rounded-full uppercase justify-center`}
            >
              <p className="text-3xl font-bold">
                {datum.attributes[0]?.value[0]}
              </p>
            </div>
          )}
        </div>
        <div className="h-[250px] w-[250px]">
          {datum.kind === 0 || datum.kind === 2 ? (
            <video
              autoPlay
              loop
              src={datum.animation_url}
              width={"100%"}
              height={350}
              className="rounded overflow-hidden max-h-[250px] object-cover"
            />
          ) : (
            <div className="h-[250px] w-[250px] bg-black">
              <ModelViewer
                glb={datum?.glb_animation_url}
                usdz={datum?.usdz_animation_url}
              ></ModelViewer>
            </div>
          )}
        </div>
        <p className="text-sm text-center">
          {moment(
            new Date(new Date().getTime() + datum.duration * 1000),
            "YYYYMMDD"
          ).fromNow()}
          <span className="font-bold text-[#333333]">
          </span>
        </p>
        <p className="mt-1 font-bold text-center">
          {datum.name || "Egg"} {datum.kind === 0 ? "(Origin)" : ""}{" "}
          <span className="text-xs text-gray-500">({datum.tokenID})</span>
        </p>
        <div className="flex justify-center items-center bg-[#333333] py-2 rounded-lg mt-4">
          <p className="w-6 h-6 bg-white rounded-full text-[#333333] text-[10px] font-semibold flex items-center justify-center">
            ZOO
          </p>
          <p className="ml-2 text-sm font-bold">{datum?.reservePrice}</p>
        </div>
      </div>
      <div
        className="flex items-center justify-center mt-4 cursor-pointer"
        onClick={() =>
          router.push({
            pathname: `/market/${datum.tokenID}/info`,
          })
        }
      >
        <span className="mr-2 text-lg">View Item</span>
        <Image src="/icons/link-white.svg" alt="" width={15} height={15} />
      </div>
    </div>
  );
};

export default Index;
