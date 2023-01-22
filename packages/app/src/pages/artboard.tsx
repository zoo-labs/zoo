import Image from "next/image";

const ArtBoard = () => {
  const nav = ["My Auctions", "My Bids", "My Wallet"];
  return (
    <>
      <div className="px-8 mt-16 lg:px-32">
        <p className="inline border-b border-white ">
          {nav.map((i) => (
            <span className="mr-3 cursor-pointer" key={i}>
              {i}
            </span>
          ))}
        </p>
        <div className="mt-24 mb-40">
          <div className="flex flex-col items-center justify-center h-auto md:gap-40 md:flex-row">
            <div
              className="lg:basis-1/2 "
              style={{
                padding: 1,
                background: "linear-gradient(180deg, #9757D7 0%, #3772FF 100%)",
              }}
            >
              <div className="bg-[#000] h-[750px] flex items-center justify-center">
                <Image src="/img/egg.png" alt="" width={300} height={300} />
              </div>
            </div>
            <div className="h-full lg:basis-1/2">
              <p className="font-medium text-[72px] mb-12">Egg</p>
              <div className="flex items-center justify-between mb-9">
                <div className="flex justify-between items-center gap-[6px]">
                  <Image src="/img/Oval.svg" alt="" width={51} height={51} />
                  <div className="font-medium">
                    <p className="text-[#6D7278] text-base">Owner</p>
                    <p className="text-[21px]">0xd0ae…e3e0</p>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-[6px]">
                  <Image src="/img/icon.svg" alt="" width={51} height={51} />
                  <div className="font-medium">
                    <p className="text-[#6D7278] text-base">Reserve Price</p>
                    <p className="text-[21px]">
                      <span className="text-[18px]">3.5 ETH</span>{" "}
                      <span className="text-[14px] text-[#6D7278]">$6800</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-[#1F2030] rounded-[14px] bg-[#1F2030] py-10 mb-12">
                <div className="text-center ">
                  <p className="font-medium text-[18px]">Current Bid</p>
                  <p className="font-medium text-[60px]">1.00 ETH</p>
                  <p className="text-xl font-black text-[#6D7278] mb-[6]">
                    $3,618.36
                  </p>
                  <div className="font-medium text-[18px] mb-[8px]">
                    Auction ending in
                  </div>
                  {/* <div className="flex justify-center"> */}
                  <div className="flex justify-between px-20 text-center">
                    <div className="w-1/3">
                      <h1 className="text-[44px] leading-[3rem] lg:leading-4 font-medium">01</h1>
                      <p className="text-bold text-[18] text-[#6D7278]">Hrs</p>
                    </div>
                    <div className="w-1/3">
                      <h1 className="text-[44px] leading-[3rem] lg:leading-4 font-medium">23</h1>
                      <p className="text-bold text-[18] text-[#6D7278]">Min</p>
                    </div>
                    <div className="w-1/3">
                      <h1 className="text-[44px] leading-[3rem] lg:leading-4 font-medium">17</h1>
                      <p className="text-bold text-[18] text-[#6D7278]">Sec</p>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <button className="w-full py-[14px] bg-[#9757D7] rounded-2xl mb-[16px]">
                Edit Auction
              </button>
              <button className="w-full py-[14px] border border-[#979797] rounded-2xl">
                View Item
              </button>
            </div>
          </div>
        </div>
        <div className="mt-24 mb-40">
          <div className="flex flex-col items-center justify-center h-auto md:gap-40 md:flex-row">
            <div
              className="lg:basis-1/2 "
              style={{
                padding: 1,
                background: "linear-gradient(180deg, #9757D7 0%, #3772FF 100%)",
              }}
            >
              <div className="bg-[#000] h-[750px] flex items-center justify-center">
                <Image
                  src="/img/egg-dark.png"
                  alt=""
                  width={200}
                  height={300}
                />
              </div>
            </div>
            <div className="h-full lg:basis-1/2">
              <p className="font-medium text-[72px] mb-12">Egg</p>
              <div className="flex items-center justify-between mb-9">
                <div className="flex justify-between items-center gap-[6px]">
                  <Image src="/img/Oval.svg" alt="" width={51} height={51} />
                  <div className="font-medium">
                    <p className="text-[#6D7278] text-base">Owner</p>
                    <p className="text-[21px]">0xd0ae…e3e0</p>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-[6px]">
                  <Image src="/img/icon.svg" alt="" width={51} height={51} />
                  <div className="font-medium">
                    <p className="text-[#6D7278] text-base">Reserve Price</p>
                    <p className="text-[21px]">
                      <span className="text-[18px]">3.5 ETH</span>{" "}
                      <span className="text-[14px] text-[#6D7278]">$6800</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-[#1F2030] rounded-[14px] bg-[#1F2030] py-10 mb-12">
                <div className="text-center ">
                  <p className="font-medium text-[18px]">Current Bid</p>
                  <p className="font-medium text-[60px]">1.00 ETH</p>
                  <p className="text-xl font-black text-[#6D7278] mb-[6]">
                    $3,618.36
                  </p>
                  <div className="font-medium text-[18px] mb-[8px]">
                    Auction ending in
                  </div>
                  {/* <div className="flex justify-center"> */}
                  <div className="flex justify-between px-20 text-center">
                    <div className="w-1/3">
                      <h1 className="text-[44px] leading-[3rem] lg:leading-4 font-medium">01</h1>
                      <p className="text-bold text-[18] text-[#6D7278]">Hrs</p>
                    </div>
                    <div className="w-1/3">
                      <h1 className="text-[44px] leading-[3rem] lg:leading-4 font-medium">23</h1>
                      <p className="text-bold text-[18] text-[#6D7278]">Min</p>
                    </div>
                    <div className="w-1/3">
                      <h1 className="text-[44px] leading-[3rem] lg:leading-4 font-medium">17</h1>
                      <p className="text-bold text-[18] text-[#6D7278]">Sec</p>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <button className="w-full py-[14px] bg-[#9757D7] rounded-2xl mb-[16px]">
                Edit Auction
              </button>
              <button className="w-full py-[14px] border border-[#979797] rounded-2xl">
                View Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtBoard;
