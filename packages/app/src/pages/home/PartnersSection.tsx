import React from "react";
import Image from "next/image";

const PartnersSection = () => {
  return (
    <section className="bg-green" id="partnerships">
      <div className="flex py-6 items-center justify-between max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-2 justify-between">
          <Image src="/img/wcs.svg" width={147} height={104} alt="" />
          <div className="lg:-ml-16">
            <Image src="/img/dfw.svg" width={147} height={104} alt="" />
          </div>
        </div>
        <div className="mx-2">
          <Image src="/img/wwf.svg" width={137} height={198} alt="" />
        </div>
        <div className="flex flex-col gap-2 lg:justify-between">
          <Image src="/img/zsl.svg" width={214} height={97} alt="" />
          <Image src="/img/iucn.svg" width={214} height={70} alt="" />
        </div>

        <Image src="/img/irf.svg" width={342} height={166} alt="" />
        <Image src="/img/panthera.svg" width={260} height={192} alt="" />
      </div>
    </section>
  );
};

export default PartnersSection;
