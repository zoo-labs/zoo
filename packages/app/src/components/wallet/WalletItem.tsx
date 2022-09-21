import React from "react";
import { FaHeart, FaMoneyBill, FaMoneyBillWave } from "react-icons/fa";
import { accountEllipsis, getAge, getEmoji } from "functions";
import dynamic from "next/dynamic";
import moment from "moment";
import { MyNFT } from "state/zoo/types";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

interface IndexProps {
  datum: MyNFT;
  onClick: () => void;
}

const Index: React.FC<IndexProps> = ({ datum, onClick }) => {
  console.log("DATAUM", datum);
  return (
    <div className="flex flex-col " onClick={onClick}>
      <div className="relative overflow-hidden rounded p-[2px] border border-gray-500 parent">
        <div className="h-[450px] w-full">
          {datum.kind === 0 || datum.kind === 2 ? (
            <video
              autoPlay
              loop
              src={datum.token_uri}
              width={"100%"}
              height={350}
              className="rounded overflow-hidden max-h-[450px] object-cover"
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
      </div>

      <div className="flex flex-col flex-grow py-4 no-underline cursor-pointer">
        <div className="flex flex-col flex-grow pb-4 border-b border-gray-700">
          <div className="flex mb-4 ">
            <div className="mt-1 mr-auto font-semibold">
              {datum.name || "Egg"} {datum.kind === 0 ? "(Origin)" : ""}{" "}
              <span className="text-xs text-gray-500">({datum.id || ""})</span>
            </div>
          </div>
          <div className="flex ">
            <div className="flex mt-1 mr-auto text-xs font-semibold text-gray-500">
              <div className="w-4 h-4 mr-1 rounded-full bg-gradient-to-b from-btn1 to-btn2" />
              {getAge(datum.stage)}
            </div>
            <div className="flex items-center justify-center flex-shrink-0 ml-2 text-xs font-bold uppercase rounded-sm">
              {moment(new Date(datum.timestamp * 1000), "YYYYMMDD").fromNow()}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full pt-3">
          {datum.attributes &&
            typeof datum.attributes === "object" &&
            datum.attributes.map((attr, index) => {
              // if (attr.trait_type === "Yields") return null;
              return (
                <div
                  className={`flex flex-col text-xs relative ${
                    index !== 0 &&
                    index + 1 !== datum.attributes.length &&
                    "items-center"
                  }
                ${index + 1 === datum.attributes.length && "items-end"}
                ${
                  datum.attributes.length !== index + 1 &&
                  "after:h-[24px] after:absolute after:w-px after:inset-y-[25%] after:right-0 after:bg-[#3D3D3D] after:content-[''] after:ml-0.5 "
                } w-full`}
                  key={index}
                >
                  <div>
                    <p className="text-[#797979]">{attr.trait_type}</p>
                    <p className="font-medium">{attr.value}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Index;
