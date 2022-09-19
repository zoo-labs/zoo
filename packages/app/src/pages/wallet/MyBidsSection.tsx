import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PopularNftsSection from "pages/home/PopularNftsSection";

import Modal from "../../components/Modal/";

import { fadeInOnScroll } from "animation";
import { Auction } from "types";

const MyBidsSection = () => {
  const [openMoal, setOpenModal] = React.useState(false);
  const comingSoonRef = React.useRef();

  useEffect(() => {
    fadeInOnScroll(comingSoonRef.current);
  }, []);

  return (
    <div className="">
      <div className="px-4 py-20 mx-auto max-w-7xl">
        <div
          className="flex flex-col items-center justify-center text-center "
          ref={comingSoonRef}
        >
          <h1 className="mb-8 text-4xl font-bold lg:text-5xl">
            You have no Bids
          </h1>
          <p>
            Go to the{" "}
            <Link href="/market">
              <a className="underline text-green">Marketplace</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
    // <>
    //   <section className="flex flex-col gap-24 lg:flex-row lg:justify-between lg:px-48">
    //     <div className="border border-gray-500 p-0.5 flex flex-col basis-1/2 justify-center rounded-xl">
    //       <div className="flex flex-col justify-center h-full bg-black rounded-xl">
    //         <Image
    //           src="/img/egg.png"
    //           width={200}
    //           height={400}
    //           alt=""
    //           objectFit="contain"
    //         />
    //       </div>
    //     </div>
    //     <div className="flex flex-col basis-1/2">
    //       <h2 className="mb-4 text-4xl lg:text-6xl">Egg</h2>
    //       {/* Address and Price */}
    //       <div className="flex justify-between mb-4">
    //         <div className="flex items-center address">
    //           <div className="w-12 h-12 mr-3 rounded-full border border-gray-500" />
    //           <div className="owner">
    //             <p className="text-grey">Owner</p>
    //             <p>0xd0ae…e3e0</p>
    //           </div>
    //         </div>
    //         <div className="flex money">
    //           <Image
    //             src="/img/reserved-price.png"
    //             width={51}
    //             height={51}
    //             alt=""
    //           />
    //           <div className="ml-3">
    //             <p className="text-grey">Reserve Price</p>
    //             <p className="font-bold">
    //               3.5 ETH <span className="text-green">$6800</span>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       {/* Card */}
    //       <div className="flex flex-col items-center px-4 py-8 mb-6 rounded card bg-black100">
    //         <p className="mb-6 text-xs">Current Bid</p>
    //         <h1 className="mb-4 text-4xl font-bold lg:text-6xl">1.00 ETH</h1>
    //         <p className="font-bold text-green lg:text-xl mb-9">$3,618.36</p>

    //         <p className="mb-2 font-medium text-white">Auction ending in</p>
    //         <div className="flex items-center justify-between max-w-md">
    //           <div className="mr-3 text-center">
    //             <p className="text-2xl font-medium lg:text-4xl ">01</p>
    //             <p className="font-medium text-grey">Hrs</p>
    //           </div>
    //           <div className="mr-3 text-center">
    //             <p className="text-2xl font-medium lg:text-4xl ">23</p>
    //             <p className="font-medium text-grey">Min</p>
    //           </div>
    //           <div className="text-center">
    //             <p className="text-2xl font-medium lg:text-4xl"> 17</p>
    //             <p className="font-medium text-grey">Sec</p>
    //           </div>
    //         </div>
    //       </div>
    //       <button
    //         className="py-2 mb-4 font-semibold text-white rounded bg-blue"
    //         onClick={() => setOpenModal(true)}
    //       >
    //         Increase Bid
    //       </button>
    //       <Link href="/nft-info" passHref>
    //         <button className="py-2 font-semibold border border-white rounded">
    //           View Item
    //         </button>
    //       </Link>
    //     </div>
    //     <Modal onDismiss={() => setOpenModal(false)} isOpen={openMoal}>
    //       <div>
    //         <div className="my-4">
    //           <p className="font-bold text-white">Increase Bid</p>
    //         </div>
    //         <div>
    //           <form>
    //             <div className="mb-4">
    //               <p className="mb-2 text-xs font-bold">Current Bid</p>
    //               <div className="flex flex-row justify-between px-4 py-2 border rounded items center border-black100 bg-black100">
    //                 <input
    //                   type=""
    //                   value="1.00 ETH"
    //                   className="bg-transparent border-0 outline-0"
    //                 />
    //                 <Image
    //                   src="/img/eth-icon.svg"
    //                   width={16}
    //                   height={16}
    //                   alt=""
    //                 />
    //               </div>
    //             </div>

    //             <div>
    //               <p className="mb-2 text-xs font-bold">Start time</p>
    //               <div className="flex justify-center gap-4 overflow-hidden">
    //                 <div className="py-2 border rounded border-black100 bg-black100 basis-1/2">
    //                   <input
    //                     type="text"
    //                     value="25 Jan 2022"
    //                     className="bg-transparent border-0 outline-0"
    //                   />
    //                 </div>

    //                 <div className="py-2 border rounded border-black100 bg-black100 basis-1/2">
    //                   <input
    //                     type="text"
    //                     value="12:27 PM GMT"
    //                     className="bg-transparent border-0 outline-0"
    //                   />
    //                 </div>
    //               </div>
    //             </div>

    //             <button className="w-full px-4 py-2 mt-8 font-bold text-center text-white rounded bg-blue">
    //               Save Changes
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     </Modal>
    //   </section>
    //   <div className="py-20">
    //     <PopularNftsSection />
    //     <div className="mt-12 text-xl text-center">
    //       <a href="/animal-list" className="underline text-green ">
    //         View All
    //       </a>
    //     </div>
    //   </div>
    // </>
  );
};

// const MyBidsSection = () => {
//   return (
//     <div>
//       <div className="flex flex-col lg:flex-row lg:justify-between">
//         <div className="flex flex-col px-4 py-6 mb-4 border rounded border-blue lg:mb-0 lg:px-8">
//           <div style={{ minHeight: '299px' }}>
//             <Image src="/img/egg.png" width={300} height={300} alt="" />
//           </div>
//           <button className="px-5 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 md:py-4 lg:px-10">
//             Increase bid
//           </button>
//         </div>
//         <div>
//           <div className="mb-8">
//             <h3 className="mb-4 text-xl font-bold">Egg #4</h3>
//             <p>
//               Contains <span className="font-bold">1 of 16</span> Generation one
//               Base Animals. To hatch or to hold…
//             </p>
//           </div>
//           <div className="px-4 py-6 mb-8 border rounded border-blue">
//             <p className="mb-2 font-bold">Details</p>
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

//           <div className="border rounded details border-blue">
//             <div className="px-4 pt-6 pb-2 ">
//               <p className="mb-2 font-bold">Proof of Authenticity</p>
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
//         <div className="mt-12 text-xl text-center">
//           <a href="/animal-list" className="underline text-green ">
//             View All
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

export default MyBidsSection;
