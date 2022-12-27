import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// animation
import { fadeInOnScroll } from "animation";

const Partnership = () => {
  const partnerRef = React.useRef();

  useEffect(() => {
    fadeInOnScroll(partnerRef.current);
  }, []);
  return (
    <section>
      <div className="flex flex-row py-8 items-center max-w-7xl mx-auto px-6 ">
        <div className="w-7/12" ref={partnerRef}>
          <h1 className="text-3xl lg:text-6xl mb-8 font-bold mt-10 w-11/12 leading-loose">
            Join the
            <br />
            ZooLabs Foundation’s journey to save the endangered animals.
          </h1>
          <p className="text-left text-[#8A8A8A] text-sm lg:text-lg max-w-5xl">
            Protect mother nature and her species before its too late.
          </p>
        </div>

        <div className="w-5/12">
          {/* <Image src={"/images/sheep.png"} alt="" width={200} height={200}/>
           */}
          <div className="relative w-full h-96 overflow-y-hidden">
            <Image
              src={"/images/sheep.png"}
              width="100%"
              height="100%"
              alt=""
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row py-8 items-center max-w-7xl mx-auto px-6 ">
        <div className="w-full">
          <div className="hidden border-t border-[#333333] lg:block pt-8 w-full">
            <p className="uppercase text-2xl font-bold">A ZOO SANCTUARY</p>
            <p className="mt-4 text-lg">
              “It is our driving purpose to deepen the connection humans have
              with animals by creating sustainable animal sanctuaries for
              endangered species. Share the Zoo Sanctuary with local visitors,
              educators, host fundraisers/events, and get the Zoo Community as
              involved as possible to saving endangered animals all over the
              world. You could save a life today w/ a monthly donation or a
              one-time contribution. “
            </p>
          </div>
          <div className="hidden border-t border-[#333333] lg:block pt-8 w-full mt-16 mb-8">
            <p className="uppercase text-2xl font-bold">MAKE A DONATION</p>
            <p className="mt-4 text-lg">
              Once we have tax-exemption status you will be able to write off up
              to 100% of your donation.
            </p>
          </div>
        </div>
      </div>
      {/* <div
        className="bg-white"
        id="partnerships"
        style={{ marginBottom: "96px" }}
      >
        <div className="flex py-6 items-center justify-between max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-2 justify-between">
            <Link
              href={
                "https://www.wcs.org/?ms=M_SEM_ADV_03_F02_stg-grant-eng-all-dtg-allndn--wildliferesponsive&utm_source=google&utm_medium=cpc&utm_campaign=stg-grant-eng-all-dtg-allndn_10759525129&utm_term=_104464437005&utm_content=wildliferesponsive_454654852027"
              }
            >
              <Image
                className="cursor-pointer"
                src="/img/wcs.svg"
                width={147}
                height={104}
                alt=""
              />
            </Link>{" "}
            <div className="lg:-ml-16">
              <Link href={"https://defenders.org/"}>
                <Image
                  className="cursor-pointer"
                  src="/img/dfw.svg"
                  width={147}
                  height={104}
                  alt=""
                />
              </Link>{" "}
            </div>
          </div>
          <div className="mx-2">
            <Link href={"https://www.worldwildlife.org/"}>
              <Image
                className="cursor-pointer"
                src="/img/wwf.svg"
                width={137}
                height={198}
                alt=""
              />
            </Link>{" "}
          </div>
          <div className="flex flex-col gap-2 lg:justify-between">
            <Link href={"https://www.zsl.org/"}>
              <Image
                className="cursor-pointer"
                src="/img/zsl.svg"
                width={214}
                height={97}
                alt=""
              />
            </Link>
            <Link href={"https://www.iucn.org/"}>
              <Image
                className="cursor-pointer"
                src="/img/iucn.svg"
                width={214}
                height={70}
                alt=""
              />
            </Link>{" "}
          </div>
          <Link href={"https://rhinos.org/"}>
            <Image
              className="cursor-pointer"
              src="/img/irf.svg"
              width={342}
              height={166}
              alt=""
            />
          </Link>
          <Link href={"https://panthera.org/"}>
            <Image
              className="cursor-pointer"
              src="/img/panthera.svg"
              width={260}
              height={192}
              alt=""
            />
          </Link>{" "}
        </div>
      </div> */}
    </section>
  );
};

export default Partnership;

/*
<>
      <div style={{ margin: "105px 200px 0 200px" }}>
        <p
          style={{
            display: "flex",
            width: "50%",
            fontSize: 60,
            fontWeight: "bold",
          }}
        >
          ZOO Foundation
        </p>
        <p style={{ fontSize: 30, letterSpacing: 3.2 }}>
          The ZOO foundation donates 10% of all gaming fees in efforts to save
          endangered species. Every animal in our game is a representation of an
          animal that is endangered. We have commited our donations to the
          following organizations. Click any of them to visit their website.
        </p>
      </div>
      <div
        className="footer"
        style={{
          background: "linear-gradient(180deg, #4232A2 0%, #0F00FF 100%)",
          padding: "92px 0px 10px 0px",
          height: 400,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column-reverse",
          }}
        >
          <Image src="/img/dfw.png" alt="" width={120} height={120} />
          <div style={{ paddingLeft: 100 }}>
            <Image src="/img/wcs.png" alt="" width={100} height={100} />
          </div>
        </div>
        <div>
          <Image
            alt=""
            src="/img/1200px-WWF_logo.svg.png"
            width={120}
            height={140}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Image alt="" src="/img/irf.png" width={220} height={120} />
          <Image alt="" src="/img/IUCN-Logo.png" width={60} height={60} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Image alt="" src="/img/zsl.png" width={40} height={60} />
          <Image alt="" src="/img/panthera.png" width={220} height={220} />
        </div>
      </div>
    </>
*/
