import React, { useEffect, useRef } from "react";
import Link from "next/link";

// animation
import { fadeInOnScroll } from "animation";

const ComingSoon = () => {
  const comingSoonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (comingSoonRef.current) {
      // @ts-ignore
      fadeInOnScroll(comingSoonRef.current);
    }
  }, []);
  return (
    <div className="">
      <div className="px-4 py-20 mx-auto max-w-7xl">
        <div
          className="flex flex-col items-center justify-center text-center "
          ref={comingSoonRef}
        >
          <h1 className="text-4xl lg:text-[44px] leading-[3rem] lg:leading-4 font-bold mb-8">Coming Soon</h1>
          <p>
            Go back to the{" "}
            <Link href="/" className="underline text-green">
              home page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
