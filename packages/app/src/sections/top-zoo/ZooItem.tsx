import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string,
  infoTitle: string,
  infoDesc: string,
  authenticityPrice: string
}

const ZooItem: NextPage<Props> = ({ src, infoTitle, infoDesc, authenticityPrice }) => {
  return (
    <div className="zooItem">
      <div className="zooItem__nft">
        <Image src={src} width={200} height={250} alt="" />
        <button className="zooItem__offer">Make Offer</button>
      </div>

      <div className="zooItem__info">
        <h3 className="zooItem__info--title">{infoTitle}</h3>
        <p className="zooItem__info--desc">
          {infoDesc}
        </p>
        <div className="zooItem__details">
          <h4 className="zooItem__details--title">details</h4>
          <ul className="zooItem__details--info">
            <li>Transaction Hash <small className="right">0x00000000…000000</small></li>
            <li>Token ID <small className="right">4</small></li>
            <li>Token Standard <small className="right">ERC-7210</small></li>
          </ul>
        </div>
        <div className="zooItem__authenticity">
          <h4 className="zooItem__authenticity--title">
            Proof of Authenticity
          </h4>
          <p className="zooItem__authenticity--price">{authenticityPrice}</p>
          <Link href="/">Etherscan transaction</Link>
          <div className="zooItem__authenticity--bottom">
            <Link href="/">View on IPS</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZooItem;