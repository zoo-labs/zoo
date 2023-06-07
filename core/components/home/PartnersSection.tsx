import React from "react";
import Image from "next/image";
import Link from "next/link";

const PartnersSection = () => {
  return (
    <section className="bg-green" id="partnerships">
      <div className="flex py-6 items-center justify-between max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-2 justify-between">
          <Link
            href={
              "https://www.wcs.org/?ms=M_SEM_ADV_03_F02_stg-grant-eng-all-dtg-allndn--wildliferesponsive&utm_source=google&utm_medium=cpc&utm_campaign=stg-grant-eng-all-dtg-allndn_10759525129&utm_term=_104464437005&utm_content=wildliferesponsive_454654852027"
            }
            legacyBehavior>
            <Image
              className="cursor-pointer"
              src="/img/wcs.svg"
              width={147}
              height={104}
              alt=""
            />
          </Link>
          <div className="lg:-ml-16">
            <Link href={"https://defenders.org/"} legacyBehavior>
              <Image
                className="cursor-pointer"
                src="/img/dfw.svg"
                width={147}
                height={104}
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="mx-2">
          <Link href={"https://www.worldwildlife.org/"} legacyBehavior>
            <Image
              className="cursor-pointer"
              src="/img/wwf.svg"
              width={137}
              height={198}
              alt=""
            />
          </Link>
        </div>
        <div className="flex flex-col gap-2 lg:justify-between">
          <Link href={"https://www.zsl.org/"} legacyBehavior>
            <Image
              className="cursor-pointer"
              src="/img/zsl.svg"
              width={214}
              height={97}
              alt=""
            />
          </Link>
          <Link href={"https://www.iucn.org/"} legacyBehavior>
            <Image
              className="cursor-pointer"
              src="/img/iucn.svg"
              width={214}
              height={70}
              alt=""
            />
          </Link>
        </div>
        <Link href={"https://rhinos.org/"} legacyBehavior>
          <Image
            className="cursor-pointer"
            src="/img/irf.svg"
            width={342}
            height={166}
            alt=""
          />
        </Link>
        <Link href={"https://panthera.org/"} legacyBehavior>
          <Image
            className="cursor-pointer"
            src="/img/panthera.svg"
            width={260}
            height={192}
            alt=""
          />
        </Link>
      </div>
    </section>
  );
};

export default PartnersSection;
