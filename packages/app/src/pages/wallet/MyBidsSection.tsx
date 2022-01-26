import React from "react";
import Image from "next/image";
import Link from "next/link";
import PopularNftsSection from "pages/home/PopularNftsSection";

import Modal from "../../components/Modal/";

const MyBidsSection = () => {
  const [openMoal, setOpenModal] = React.useState(false);
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-center gap-12">
        <div className="flex flex-col border border-blue px-4 py-6 rounded mb-4 lg:mb-0 lg:px-8">
          <div
            style={{ minHeight: "299px" }}
            className="flex flex-col items-center justify-center"
          >
            <Image src="/img/egg.png" width={300} height={300} alt="" />
          </div>

          <Modal onDismiss={() => setOpenModal(false)} isOpen={openMoal}>
            <p className="text-white">Modal</p>
          </Modal>
        </div>
        <div className="flex flex-col basis-1/2">
          <h2 className="text-4xl lg:text-7xl mb-4">Egg</h2>
          {/* Address and Price */}
          <div className="flex justify-between mb-4">
            <div className="address flex items-center">
              <div className="mr-3">
                <Image src="/img/round-bg.svg" width={48} height={48} alt="" />
              </div>
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
            <h1 className="font-bold text-4xl lg:text-7xl mb-4">1.00 ETH</h1>
            <p className="text-green font-bold lg:text-xl mb-12">$3,618.36</p>

            <p className="text-grey mb-4">Auction ending in</p>
            <div className="flex max-w-md justify-between items-center">
              <div className="text-center">
                <p className="text-2xl lg:text-4xl font-bold mr-3">01</p>
                <p className="text-grey font-bold">Hrs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-4xl font-bold mr-3">23</p>
                <p className="text-grey font-bold">Min</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-4xl font-bold mr-3"> 17</p>
                <p className="text-grey font-bold">Sec</p>
              </div>
            </div>
          </div>
          <button
            className="bg-blue text-white rounded py-2 font-semibold mb-4"
            onClick={() => setOpenModal(true)}
          >
            Increase Auction
          </button>
          <Modal onDismiss={() => setOpenModal(false)} isOpen={openMoal}>
            <div>
              <div className="my-4">
                <p className="text-white font-bold">Increase Bid</p>
              </div>
              <div>
                <form>
                  <div className="mb-4">
                    <p className="text-xs font-bold mb-2">Current Bid</p>
                    <div className="flex flex-row justify-between items center border border-black100 rounded bg-black100 px-4 py-2">
                      <input
                        type=""
                        value="1.00 ETH"
                        className="bg-transparent outline-0 border-0"
                      />
                      <Image
                        src="/img/eth-icon.svg"
                        width={16}
                        height={16}
                        alt=""
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold mb-2">Start time</p>
                    <div className="flex justify-center gap-4 overflow-hidden">
                      <div className="border border-black100 rounded bg-black100 py-2 basis-1/2">
                        <input
                          type="text"
                          value="25 Jan 2022"
                          className="bg-transparent outline-0 border-0"
                        />
                      </div>

                      <div className="border border-black100 rounded bg-black100 py-2 basis-1/2">
                        <input
                          type="text"
                          value="12:27 PM GMT"
                          className="bg-transparent outline-0 border-0"
                        />
                      </div>
                    </div>
                  </div>

                  <button className="bg-blue text-white text-center font-bold w-full px-4 py-2 rounded mt-8">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </Modal>
          <Link href="/nft-info">
            <a className="border border-white rounded py-2 font-semibold text-center">
              View Item
            </a>
          </Link>
        </div>
        {/* <div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Egg #4</h3>
            <p>
              Contains <span className="font-bold">1 of 16</span> Generation one
              Base Animals. To hatch or to hold…
            </p>
          </div>
          <div className="mb-8 border border-blue px-4 py-6 rounded">
            <p className="font-bold mb-2">Details</p>
            <div className="flex justify-between mb-2">
              <p>Transaction</p>
              <p className="text-purple">0x00000000…000000</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Token Id</p>
              <p>234345</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Hash</p>
              <p>4</p>
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
      </div>

      <div className="py-20">
        <PopularNftsSection />
        <div className="text-center mt-12 text-xl">
          <a href="/animal-list" className="underline text-green ">
            View All
          </a>
        </div>
      </div>
    </div>
  );
};
// const MyBidsSection = () => {
//   return (
//     <div>
//       <div className="flex flex-col lg:flex-row lg:justify-between">
//         <div className="flex flex-col border border-blue px-4 py-6 rounded mb-4 lg:mb-0 lg:px-8">
//           <div style={{ minHeight: '299px' }}>
//             <Image src="/img/egg.png" width={300} height={300} alt="" />
//           </div>
//           <button className="bg-gradient-to-b from-purple to-blue text-white font-semibold text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full">
//             Increase bid
//           </button>
//         </div>
//         <div>
//           <div className="mb-8">
//             <h3 className="text-xl font-bold mb-4">Egg #4</h3>
//             <p>
//               Contains <span className="font-bold">1 of 16</span> Generation one
//               Base Animals. To hatch or to hold…
//             </p>
//           </div>
//           <div className="mb-8 border border-blue px-4 py-6 rounded">
//             <p className="font-bold mb-2">Details</p>
//             <div className="flex justify-between mb-2">
//               <p>Transaction</p>
//               <p className="text-purple">0x00000000…000000</p>
//             </div>
//             <div className="flex justify-between mb-2">
//               <p>Token Id</p>
//               <p>234345</p>
//             </div>
//             <div className="flex justify-between mb-2">
//               <p>Hash</p>
//               <p>4</p>
//             </div>
//             <div className="flex justify-between mb-2">
//               <p>Token Standard</p>
//               <p>ERC-721</p>
//             </div>
//           </div>

//           <div className="details border border-blue rounded">
//             <div className="px-4 pt-6 pb-2 ">
//               <p className="font-bold mb-2">Proof of Authenticity</p>
//               <div className="mb-2">
//                 <p className="text-lg font-bold">300,000 $ZOO</p>
//               </div>

//               <div className="flex justify-between mb-2">
//                 <p className="text-purple100">Token Standard</p>
//                 <Image
//                   src="/img/link-arrow-right.svg"
//                   width={16}
//                   height={16}
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div className="flex justify-between px-4 py-2 border-t border-blue">
//               <p className="text-purple100">View on IPS</p>
//               <Image
//                 src="/img/link-arrow-right.svg"
//                 width={16}
//                 height={16}
//                 alt=""
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="py-20">
//         <PopularNftsSection />
//         <div className="text-center mt-12 text-xl">
//           <a href="/animal-list" className="underline text-green ">
//             View All
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

export default MyBidsSection;
