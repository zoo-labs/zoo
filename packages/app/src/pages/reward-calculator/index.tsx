import { MarketTypeSlider, PrettoSlider } from "components/Slider";
import React, { useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Month 1",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Month 2",
    pv: 1398,
    amt: 10000,
  },
  {
    name: "Month 3",
    pv: 9800,
    amt: 18000,
  },
  {
    name: "Month 4",
    pv: 3908,
    amt: 25000,
  },
  {
    name: "Month 5",
    pv: 4800,
    amt: 30000,
  },
  {
    name: "Month 6",
    pv: 3800,
    amt: 40000,
  },
];

const RewardCalculator = () => {
  const [earning, setEarning] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  return (
    <div className="px-6 pt-16 pb-16 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
      <div className="flex flex-col items-center mb-16">
        <h1 className="mb-5 text-2xl md:text-5xl text-bold">
          NFT Reward Calculator
        </h1>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-4 md:mb-8">
        <div className="w-full">
          <p className="mb-2.5 text-sm font-light md:text-base md:font-normal">
            Collateral Amount
          </p>
          <input
            type="text"
            className="w-full bg-black border border-33 py-3.5 px-4 rounded"
          />
        </div>
        <div className="w-full">
          <p className="mb-2.5 text-sm font-light md:text-base md:font-normal">
            Term
          </p>
          <select className="w-full bg-black border border-33 py-3.5 px-4 rounded outline-none">
            <option value="Val">6 months</option>
            <option value="Val">12 months</option>
            <option value="Val">18 months</option>
          </select>
        </div>
        <div className="w-full">
          <p className="mb-2.5 text-sm font-light md:text-base md:font-normal">
            Animal
          </p>
          <select className="w-full bg-black border border-33 py-3.5 px-4 rounded outline-none">
            <option value="Val">Baby Origin Nubian Giraffe</option>
            <option value="Val">Baby Origin Hippo</option>
            <option value="Val">Javan Rhinoceros</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="mb-4 ">Zoo Earning Outlook</p>
          <div className="w-full rounded-2xl border border-33 bg-black py-6 h-[305px]">
            <ResponsiveContainer width={"100%"} height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  color="#333333"
                  opacity={0.24}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  // minTickGap={10}
                  padding={{ left: 25 }}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, "auto"]}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="amt" stroke="#fff" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <p className="mb-4 ">Market Type</p>
          <div className="w-full rounded-2xl border border-33 bg-black py-6">
            <MarketTypeSlider
              onChange={(value, number) => {
                setEarning(Number(number));
              }}
              value={earning}
              valueLabelDisplay="auto"
              aria-label="slider"
              step={12}
              defaultValue={10}
              min={0}
              max={maxPrice}
            />
            <div className="mt-[18px] pl-3 grid grid-cols-7 gap-1 text-[10px] md:text-sm">
              <div className="flex flex-col items-center h-full justify-between text-center">
                <p>Super Bearish</p>
                <p>- 50%</p>
              </div>
              <div className="flex flex-col items-center h-full justify-between text-center">
                <p>Bearish</p>
                <p>- 25%</p>
              </div>
              <div className="flex flex-col items-center h-full justify-between text-center">
                <p>Current</p>
              </div>
              <div className="flex flex-col items-center h-full justify-between text-center">
                <p>Bullish</p>
                <p>+50%</p>
              </div>
              <div className="flex flex-col items-center h-full justify-between text-center">
                <p>Very Bullish</p>
                <p>+100%</p>
              </div>
              <div className="flex flex-col items-center h-full justify-between text-center">
                <p>Super Bullish</p>
                <p>+500%</p>
              </div>
              <div className="flex flex-col items-center h-full justify-between text-center">
                <p>Moon</p>
                <p>+1000%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCalculator;
