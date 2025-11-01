import React, { useEffect } from "react";
import Link from "next/link";

// animation
import { fadeInOnScroll } from "animation";

const ComingSoon = () => {
  const comingSoonRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fadeInOnScroll(comingSoonRef.current);
  }, []);
  return (
    <div className="">
      <div className="max-w-7xl mx-auto py-20 px-4">
        <div
          className="flex flex-col items-center justify-center text-center "
          ref={comingSoonRef}
        >
          <h1 className="text-4xl lg:text-[44px] leading-[3rem] lg:leading-4 font-bold mb-8">
            Coming Soon
          </h1>
          <p>
            Go back to the{" "}
            <Link href="/" className="text-green underline">
              homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
