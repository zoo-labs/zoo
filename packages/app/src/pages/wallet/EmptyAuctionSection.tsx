import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Modal from "../../components/Modal/";

import { fadeInOnScroll } from "animation";

const EmptyAuctionSection = () => {
  const comingSoonRef = useRef();

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
          <h1 className="mb-8 text-4xl font-bold lg:text-[44px] leading-4">
            You have no Auction
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
  );
};
export default EmptyAuctionSection;
