import React from "react";
import { FaHeart, FaMoneyBill, FaMoneyBillWave } from "react-icons/fa";
import { useHistory } from "react-router";
import { accountEllipsis, getEmoji } from "functions";

interface IndexProps {
  datum: any;
  applyMaxWidth: boolean;
  placeBid: () => void;
}

const Index: React.FC<IndexProps> = ({ datum, applyMaxWidth, placeBid }) => {
  const history = useHistory();
  return (
    <div className="flex flex-col ">
      <div className="relative overflow-hidden rounded parent">
        <img
          style={{ verticalAlign: "middle" }}
          src={`${datum.imageUrl || "/static/video/egg.gif"}`}
          className="w-full transition-transform duration-1000 "
        />
        <div className="absolute top-0 left-0 invisible w-full h-full transition-all duration-300 rounded opacity-0 hover:visible hover:opacity-100">
          <div className="absolute px-2 py-1 text-xs font-bold uppercase rounded top-6 left-3 bg-primary ">
            {datum.bloodline || (datum.basic ? "BASIC" : "HYBRID")}
          </div>
          {/* <div className='absolute flex items-center justify-center w-8 h-8 rounded-full cursor-pointer  top-6 right-3 bg-dark-800'>
            <FaHeart fill='white' style={{ fontSize: 10 }} />
          </div> */}
          <a
            onClick={() => placeBid()}
            className="absolute inline-flex items-center justify-center h-10 px-4 text-sm transition-all duration-300 transform rounded-full cursor-pointer left-1/2 bottom-6 min-w-max bg-primary -translate-x-2/4"
          >
            <span>Place a bid</span>
          </a>
        </div>
      </div>

      <a
        onClick={() =>
          history.push(`/feed/${datum.owner}/${datum.tokenID}`, {
            item: datum,
          })
        }
        className="flex flex-col flex-grow py-4 no-underline cursor-pointer"
      >
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
              500K Z00
            </div>
          </div>
          <div className="flex ">
            <div className="flex mt-1 mr-auto text-xs font-semibold text-gray-500">
              <div className="w-4 h-4 mr-1 rounded-full bg-gradient-to-b from-btn1 to-btn2"></div>
              {accountEllipsis(datum.owner || "")}
            </div>
            <div className="flex items-center justify-center flex-shrink-0 ml-2 text-xs font-bold uppercase rounded-sm">
              3 days Left
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-800 border-t border-gray-700 border-solid ">
          <div className="flex items-center text-xs font-semibold text-gray-500">
            <div className="mr-1">
              <FaMoneyBillWave />
            </div>
            Highest bid <span className="ml-1">1M ZOO</span>
          </div>
          <div className="text-xs font-semibold text-gray-500">
            {datum.yield
              ? `${datum.yield} Yields/Day ${getEmoji(datum.rarity)}`
              : ""}{" "}
          </div>
        </div>
      </a>
    </div>
  );
};

export default Index;
