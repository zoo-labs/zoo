import React from "react";
import { FaHeart, FaMoneyBill, FaMoneyBillWave } from "react-icons/fa";
import { accountEllipsis, getEmoji } from "functions";
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
    <div
      className="flex flex-col w-full md:w-[24%] lg:w-[16%]"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded bg-bid-gradient p-[2px] parent w-full">
        <div className="w-full h-full">
          {datum.kind === 0 || datum.kind === 2 ? (
            <video
              autoPlay
              loop
              src={datum.token_uri}
              width={"100%"}
              height={"100%"}
              className="rounded overflow-hidden max-h-[450px] object-cover"
            />
          ) : (
            <div className="h-[345px] w-full bg-black rounded">
              <ModelViewer
                glb={datum?.glb_animation_url}
                usdz={datum?.usdz_animation_url}
              ></ModelViewer>
            </div>
          )}
        </div>
      </div>

      <div className="flex-col flex-grow hidden py-4 no-underline cursor-pointer">
        <div className="flex flex-col flex-grow border-b border-[#797979] pb-2">
          <div className="flex mb-4 ">
            <div className="mt-1 mr-auto font-semibold">
              {datum.name?.toUpperCase()} {datum.kind === 0 && "(Origin)"}{" "}
              <span className="text-xs text-gray-500">({datum.id})</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex mt-1 mr-auto text-xs font-semibold text-gray-500">
              <div className="w-4 h-4 mr-1 rounded-full bg-gradient-to-b from-btn1 to-btn2" />
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
              if (datum.kind === 0 || datum.kind === 2) {
                if (attr.trait_type === "Rarity") return null;
              }
              return (
                <div
                  className={`flex flex-col text-xs relative ${
                    datum.kind !== 0 &&
                    datum.kind !== 2 &&
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
