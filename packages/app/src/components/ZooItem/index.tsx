import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
  infoTitle: string;
  infoDesc: string;
  authenticityPrice: string;
};

const ZooItem: NextPage<Props> = ({
  src,
  infoTitle,
  infoDesc,
  authenticityPrice,
}) => {
  return (
    <div style={{ display: "flex", marginBottom: "72px" }}>
      <div
        className="zooItem__nft"
        style={{
          height: "500px",
          width: "300px",
          border: "1px solid #9757D7",
          borderRadius: "14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "50px",
        }}
      >
        <Image src={src} width={200} height={250} alt="" />
        <button
          className="zooItem__offer"
          style={{
            height: "40px",
            width: "122px",
            left: "0px",
            top: "0px",
            borderRadius: "90px",
            background: "#9757D7",
          }}
        >
          Make Offer
        </button>
      </div>

      <div className="zooItem__info" style={{ width: "379px" }}>
        <h3
          className="zooItem__info--title"
          style={{
            fontSize: "24px",
            fontWeight: "500",
            letterSpacing: "-0.47999998927116394px",
            marginBottom: "20px",
          }}
        >
          {infoTitle}
        </h3>
        <p
          className="zooItem__info--desc"
          style={{ marginBottom: "20px", fontSize: "16px" }}
        >
          {infoDesc}
        </p>
        <div
          className="zooItem__details"
          style={{
            height: "163px",
            width: "100%",
            border: "1px solid #9757D7",
            borderRadius: "12px",
            marginBottom: "20px",
            padding: "9px 25px",
          }}
        >
          <h4 className="zooItem__details--title">details</h4>
          <ul className="zooItem__details--info">
            <li>
              Transaction Hash{" "}
              <small className="right">0x00000000…000000</small>
            </li>
            <li>
              Token ID <small className="right">4</small>
            </li>
            <li>
              Token Standard <small className="right">ERC-7210</small>
            </li>
          </ul>
        </div>
        <div
          className="zooItem__authenticity"
          style={{
            width: "100%",
            border: "1px solid #9757D7",
            borderRadius: "12px",
            paddingTop: "33px",
          }}
        >
          <h4
            className="zooItem__authenticity--title"
            style={{ marginBottom: "9px" }}
          >
            Proof of Authenticity
          </h4>
          <p
            className="zooItem__authenticity--price"
            style={{
              fontSize: "21px",
              fontWeight: "500",
              letterSpacing: "0px",
              marginBottom: "9px",
            }}
          >
            {authenticityPrice}
          </p>
          <Link href="/">Etherscan transaction</Link>
          <div
            className="zooItem__authenticity--bottom"
            style={{ borderTop: "1px solid #462AF4", padding: "20px" }}
          >
            <Link href="/">View on IPS</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZooItem;
