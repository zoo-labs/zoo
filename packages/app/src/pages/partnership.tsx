import React from "react";
import Image from "next/image";

const Partnership = () => {
  return (
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
  );
};

export default Partnership;
