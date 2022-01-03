import React from "react";
import Image from "next/image";

const AllMyNfts = () => {
  return (
    <div className="allMyNfts mb-20">
      <h2 className="mb-8"
        style={{
          fontSize: "36px",
          fontWeight: "500",
          lineHeight: "54px",
          letterSpacing: "1.2000000476837158px",
        }}
      >
        All My Nfts
      </h2>
      <div className="allMyNfts__items flex">
        <div
          className="allMyNfts__item grid place-content-center"
          style={{
            height: "265px",
            width: "156px",
            borderRadius: "13px",
            border: "1px solid #A67CED",
            marginRight: "25px",
          }}
        >
          <Image src="/img/rhinovid.png" width={160} height={200} alt="" />
        </div>
        <div
          className="allMyNfts__item grid place-content-center"
          style={{
            height: "265px",
            width: "156px",
            borderRadius: "13px",
            border: "1px solid #A67CED",
            marginRight: "25px",
          }}
        >
          <Image src="/img/plasma.png" width={160} height={200} alt="" />
        </div>
        <div
          className="allMyNfts__item  grid place-content-center"
          style={{
            height: "265px",
            width: "156px",
            borderRadius: "13px",
            border: "1px solid #A67CED",
            marginRight: "25px",
          }}
        >
          <Image src="/img/egg1.png" width={160} height={200} alt="" />
        </div>
        <div
          className="allMyNfts__item  grid place-content-center"
          style={{
            height: "265px",
            width: "156px",
            borderRadius: "13px",
            border: "1px solid #A67CED",
            marginRight: "25px",
          }}
        >
          <Image src="/img/egg2.png" width={160} height={200} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AllMyNfts;
