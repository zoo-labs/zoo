import React from "react";

import "@google/model-viewer/dist/model-viewer";

const ModelViewer = ({
  glb = "/models/tigerteen.glb",
  usdz = "/models/tigerteen.usdz",
}) => {
  const ModelVie = `
      <model-viewer
        src=${glb}
        ios-src=${glb}
        loading="eager"
        poster="/img/loadingtiger.png"
        alt="A 3D model of an astronaut"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        autoplay
        ar
        ar-modes="webxr scene-viewer quick-look"
      ></model-viewer>`;

  return (
    <>
      <div
        className="w-full h-[400px]"
        dangerouslySetInnerHTML={{ __html: ModelVie }}
      ></div>
    </>
  );
};

export default ModelViewer;
