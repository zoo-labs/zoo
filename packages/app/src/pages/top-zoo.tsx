import type { NextPage } from "next";

// layouts
import ZooItem from "../sections/top-zoo/ZooItem";

// sections

const Topzoo: NextPage = () => {
  return (
    <>
      <div className="topzoo">
        <div className="topzoo__container">
          <ZooItem
            src="/img/egg1.png"
            infoTitle="Egg #4"
            infoDesc="Contains 1 of 16 Generation one Base Animals. To hatch or to hold…"
            authenticityPrice="300,000 $ZOO"
          />
          <ZooItem
            src="/img/egg2.png"
            infoTitle="Egg #320"
            infoDesc="Contains 1 of 16 Generation one Base Animals. To hatch or to hold…"
            authenticityPrice="500,000 $ZOO"
          />
          <ZooItem
            src="/img/tiger2.png"
            infoTitle="Mature Siberian Tiger #50"
            infoDesc="Contains 1 of 16 Generation one Base Animals. To hatch or to hold…"
            authenticityPrice="1,000,000 $ZOO"
          />
        </div>
      </div>
    </>
  );
};

export default Topzoo;