import Image from 'next/image';

const MyAuctionSection = () => {
  return (
    <>
      <section className="flex flex-col lg:flex-row lg:justify-between gap-24 lg:px-48">
        <div className="bg-nft-gradient p-0.5 flex flex-col basis-1/2 justify-center rounded-xl">
          <div className="h-full flex flex-col justify-center bg-black rounded-xl">
            <Image
              src="/img/egg.png"
              width={200}
              height={400}
              alt=""
              objectFit="contain"
            />
          </div>
        </div>
        <div className="flex flex-col basis-1/2">
          <h2 className="text-4xl lg:text-6xl mb-4">Egg</h2>
          {/* Address and Price */}
          <div className="flex justify-between mb-4">
            <div className="address flex items-center">
              <div className="h-12 w-12 bg-nft-gradient rounded-full mr-3" />
              <div className="owner">
                <p className="text-grey">Owner</p>
                <p>0xd0ae…e3e0</p>
              </div>
            </div>
            <div className="money flex">
              <Image
                src="/img/reserved-price.png"
                width={51}
                height={51}
                alt=""
              />
              <div className="ml-3">
                <p className="text-grey">Reserve Price</p>
                <p className="font-bold">
                  3.5 ETH <span className="text-green">$6800</span>
                </p>
              </div>
            </div>
          </div>
          {/* Card */}
          <div className="card bg-black100 px-4 py-8 rounded flex flex-col items-center mb-6">
            <p className="text-xs mb-6">Current Bid</p>
            <h1 className="font-bold text-4xl lg:text-6xl mb-4">1.00 ETH</h1>
            <p className="text-green font-bold lg:text-xl mb-9">$3,618.36</p>

            <p className="text-white font-medium mb-2">Auction ending in</p>
            <div className="flex max-w-md justify-between items-center">
              <div className="text-center mr-3">
                <p className="text-2xl lg:text-4xl font-medium ">01</p>
                <p className="text-grey font-medium">Hrs</p>
              </div>
              <div className="text-center mr-3">
                <p className="text-2xl lg:text-4xl font-medium ">23</p>
                <p className="text-grey font-medium">Min</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-4xl font-medium"> 17</p>
                <p className="text-grey font-medium">Sec</p>
              </div>
            </div>
          </div>
          <button className="bg-blue text-white rounded py-2 font-semibold mb-4">
            Edit Auction
          </button>
          <button className="border border-white rounded py-2 font-semibold">
            View Item
          </button>
        </div>
      </section>
      {/* <div className="py-20">
        <PopularNftsSection />
        <div className="text-center mt-12 text-xl">
          <a href="/animal-list" className="underline text-green ">
            View All
          </a>
        </div>
      </div> */}
    </>
  );
};
// const MyAuctionSection = () => {
//   return (
//     <section className="flex flex-col lg:flex-row lg:justify-between">
//       <div className="flex flex-col basis-1/2 justify-center">
//         <Image src="/img/egg.png" width={200} height={400} alt="" objectFit="contain" />
//       </div>
//       <div className="flex flex-col basis-1/2">
//         <h2 className="text-4xl lg:text-7xl mb-4">Egg</h2>
// 				{/* Address and Price */}
//         <div className="flex justify-between mb-4">
//           <div className="address flex items-center">
//             <div className="mr-3">
//               <Image src="/img/round-bg.svg" width={48} height={48} alt="" />
//             </div>
//             <div className="owner">
//               <p className="text-grey">Owner</p>
//               <p>0xd0ae…e3e0</p>
//             </div>
//           </div>
//           <div className="money flex">
//             <Image
//               src="/img/reserved-price.png"
//               width={51}
//               height={51}
//               alt=""
//             />
//             <div className="ml-3">
//               <p className="text-grey">Reserve Price</p>
//               <p className="font-bold">
//                 3.5 ETH <span className="text-green">$6800</span>
//               </p>
//             </div>
//           </div>
//         </div>
// 				{/* Card */}
//         <div className="card bg-black100 px-4 py-8 rounded flex flex-col items-center mb-6">
//           <p className="text-xs mb-6">Current Bid</p>
//           <h1 className="font-bold text-4xl lg:text-7xl mb-4">1.00 ETH</h1>
//           <p className="text-green font-bold lg:text-xl mb-12">$3,618.36</p>

//           <p className="text-grey mb-4">Auction ending in</p>
//           <div className="flex max-w-md justify-between items-center">
//             <div className="text-center">
//               <p className="text-2xl lg:text-4xl font-bold mr-3">01</p>
//               <p className="text-grey font-bold">Hrs</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl lg:text-4xl font-bold mr-3">23</p>
//               <p className="text-grey font-bold">Min</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl lg:text-4xl font-bold mr-3"> 17</p>
//               <p className="text-grey font-bold">Sec</p>
//             </div>
//           </div>
//         </div>
//         <button className="bg-blue text-white rounded py-2 font-semibold mb-4">
//           Edit Auction
//         </button>
//         <button className="border border-white rounded py-2 font-semibold">
//           View Item
//         </button>
//       </div>
//     </section>
//   );
// };

export default MyAuctionSection;
