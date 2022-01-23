import React, {useEffect} from "react";
import Image from "next/image";

// animation
import {fadeInOnScroll} from '../../animation'

const ZooNewsSection = () => {
  const zooRef = React.useRef()
  useEffect(() => {
    fadeInOnScroll(zooRef.current)
  }, []);
  return (
    <section className="ZooNews" ref={zooRef}>
      <div className="flex flex-col items-center px-6 pb-20 mx-auto max-w-7xl">
        <div className="mb-6 text-center lg:mb-8">
          <h2 className="mb-6 text-3xl font-bold text-center lg:text-5xl">
            ZOO News
          </h2>
          <p className="max-w-2xl text-white text-opacity-70">
            Track your workouts, get better results, and be the best version of
            you. Less thinking, more lifting.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xl mx-auto lg:flex-row lg:items-stretch lg:max-w-5xl">
          <div className="overflow-hidden rounded-2xl lg:basis-1/2">
            <Image src="/img/story-image.png" width={565} height={516} alt="" />
          </div>
          <div className="flex flex-col justify-center lg:basis-1/2 bg-black100 rounded-2xl lg:-ml-2 -mt-3 lg:-mt-0">
            <div className="max-w-sm mx-auto py-8 lg:py-0 px-4 lg:px-0">
              <p className="bg-green text-white px-2 py-1 rounderd mb-6 inline-block text-xs font-bold uppercase rounded-sm">New</p>
              <h2 className="mb-3 text-2xl lg:text-3xl font-bold">
                Stories From Our Community: Kohaku &amp; Moyo Shiro
              </h2>
              <p className="mb-6">
                How the ZOO foundation helped save over 100,000 acres of
                elephant habitat to date.{" "}
              </p>
              <a
                className="bg-gradient-to-b from-purple to-blue text-white  text-sm md:text-base font-bold px-8 py-3 md:px-6 lg:px-16 rounded-full"
                href="/blog"
              >
                Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// px-4 py-4 -mt-4 lg:py-0 bg-black100 rounded-b-2xl lg:rounded-2xl lg:-ml-1 

export default ZooNewsSection;
