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
import CustomTooltip from "components/CustomTooltip";
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
    <div>
      <div className="border border-t border-[#333333] rounded-xl p-4">
        <div className=" h-12">
          {datum?.attributes && (
            <CustomTooltip title={datum?.attributes[0]?.value}>
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
            </CustomTooltip>
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
          <span className="font-bold text-[#333333]"></span>
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
