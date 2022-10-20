import React from "react";

const UnimagineableExperience = () => {
  return (
    <div className="relative">
      <div className="absolute flex items-center justify-center w-full bg-giraffess min-h-[100vh]">
        <div className="relative flex items-center justify-center w-full">
          <p className="absolute z-50 max-w-4xl text-5xl font-bold text-center md:text-8xl">
            Unimaginable Experiences
          </p>
        </div>
      </div>
      <video
        autoPlay
        muted
        loop
        id="bgVideo"
        className=" h-screen object-cover min-h-screen max-h-screen w-screen min-w-[100vw]"
      >
        <source
          src={"/videoes/trippy_animals_short.mov"}
          type="video/mp4"
        ></source>
      </video>
    </div>
  );
};

export default UnimagineableExperience;
