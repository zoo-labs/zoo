import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
// format
import { capitalize } from "functions/format";
// animation
import { fadeInFromLeft, fadeInOnScroll } from "animation";

const HeroSection = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const slides = [
    {
      id: 0,
      title: " Exotic Animals",
      video: "/videoes/videoplayback.mp4",
      price: 129,
      type: "",
      uri: "/drop",
    },
    {
      id: 1,
      title: "Siberian Tiger",
      video: "/videoes/videoplayback.mp4",
      price: 129,
      type: "tiger",
      uri: "/drop",
    },
    {
      id: 2,
      title: "Sumatran Elephant",
      video: "/videoes/videoplayback.mp4",
      price: 129,
      type: "elephant",
      uri: "/drop",
    },
    {
      id: 3,
      title: "Nubian Giraffe",
      video: "/videoes/videoplayback.mp4",
      price: 129,
      type: "giraffe",
      uri: "/drop",
    },
    {
      id: 4,
      title: "Leopards + More",
      video: "/videoes/videoplayback.mp4",
      price: 129,
      type: "more",
      uri: "/drop",
    },
    {
      id: 5,
      title: "Genesis Eggs",
      video: "/videoes/videoplayback.mp4",
      price: 129,
      type: "eggs",
      uri: "/drop",
    },
  ];
  const videoRef = useRef(null);
  const videoCurrent = videoRef?.current || null;
  useEffect(() => {
    if (videoCurrent) {
      videoCurrent.addEventListener("timeupdate", handleVideoUpdate);
      return () =>
        videoCurrent.removeEventListener("timeupdate", handleVideoUpdate);
    }
  }, [videoCurrent]);

  const handleVideoUpdate = (event) => {
    const time = event.target.currentTime;

    const activeSwitch = (time: number): number => {
      switch (true) {
        case time < 9:
          return 0;
        case time > 9 && time < 17:
          return 1;
        case time > 17 && time < 21:
          return 2;
        case time > 21 && time < 29:
          return 3;
        case time > 29 && time < 33:
          return 2;
        case time > 33 && time < 38:
          return 3;
        case time > 38 && time < 46:
          return 5;
        case time > 46 && time < 54:
          return 4;
        case time > 54:
          return 5;
        default:
          return 0;
      }
    };
    // console.log("activeSwitch", activeSwitch(time), time);
    activeSlideIndex !== activeSwitch(time) &&
      setActiveSlideIndex(() => activeSwitch(time));
  };

  return (
    <div className="absolute flex items-center justify-center md:relative Hero bg-zooo">
      <div className="relative m-0 -mt-5 overflow-hidden w-ful">
        <div
          className={`flex w-[100vw] absolute  h-full transition duration-1000 ease-in whitespace-nowrap mt-4 `}
          style={
            {
              // transform: `translate3d(${-activeSlideIndex * 100}%, 0, 0)`,
              // display:
            }
          }
        >
          {slides.map((slide, index) => {
            return (
              <div
                key={index}
                className={`${
                  slide.id === activeSlideIndex ? "inline-block" : "hidden"
                } w-screen h-full transition-all duration-1000 ease-in`}
                style={{
                  transitionProperty: "display",
                }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <div className="w-[80vw] px-4 py-4">
                    <h1
                      className="mb-3 text-4xl font-bold break-all transition-opacity duration-1000 ease-in delay-100 opacity-100 lg:text-9xl lg:mb-6 item-animate-down"
                      onMouseOut={() => videoCurrent?.play()}
                      onMouseOver={() => videoCurrent?.pause()}
                    >
                      {slide.title}
                    </h1>

                    <Link href={slide.uri} passHref>
                      <button
                        onMouseOut={() => videoCurrent?.play()}
                        onMouseOver={() => videoCurrent?.pause()}
                        className="px-5 py-3 text-sm font-semibold text-white bg-transparent border-2 border-white rounded-full w-max md:text-lg md:px-6 md:py-4 lg:px-10 hover:cursor-pointer item-animate-up"
                      >
                        {slide.type
                          ? `Buy ${capitalize(slide.type)}  - $${slide.price}`
                          : "Explore the Zoo"}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <video
          autoPlay
          loop
          ref={videoRef}
          muted
          id="bgVideo"
          className="w-screen md:h-screen md:min-h-screen min-w-[100vh]"
        >
          <source src="/videoes/videoplayback.mp4" type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
