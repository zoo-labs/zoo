import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const SingleAnimal = ({ data }) => {
  const [category, setCategory] = React.useState("baby");

  const renderAnimal = useMemo(() => {
    switch (category) {
      case "baby":
        return (
          <ModelViewer usdz={data.usdz_baby} glb={data.glb_baby}></ModelViewer>
        );
      case "teen":
        return (
          <ModelViewer usdz={data.usdz_teen} glb={data.glb_teen}></ModelViewer>
        );
      case "adult":
        return <ModelViewer usdz={data.usdz} glb={data.glb}></ModelViewer>;
      default:
        return <ModelViewer usdz={data.usdz} glb={data.glb}></ModelViewer>;
    }
  }, [category, data]);
  return (
    <div className="overflow-hidden rounded relative w-full">
      <div className=" w-[100%] h-[400px]">{renderAnimal}</div>
      <div className="absolute  left-0 right-0 bottom-2 max-w-[245px] mx-auto w-full flex items-center rounded-full bg-glass-50">
        <div
          onClick={() => setCategory("baby")}
          className={`flex-1 rounded-full py-2.5 cursor-pointer ${
            category === "baby" && "bg-bid-gradient"
          } `}
        >
          <p className="text-base font-medium text-center">Baby</p>
        </div>
        <div
          onClick={() => setCategory("teen")}
          className={`flex-1 rounded-full py-2.5 cursor-pointer ${
            category === "teen" && "bg-bid-gradient"
          } `}
        >
          <p className="text-base font-medium text-center">Teen</p>
        </div>
        <div
          onClick={() => setCategory("adult")}
          className={`flex-1 rounded-full py-2.5 cursor-pointer ${
            category === "adult" && "bg-bid-gradient"
          } `}
        >
          <p className="text-base font-medium text-center">Adult</p>
        </div>
      </div>
    </div>
  );
};

export default SingleAnimal;
