import React from "react";

import "@google/model-viewer/dist/model-viewer";

const ModelViewer = ({
  glb = "/models/tigerteen.glb",
  usdz = "/models/tigerteen.usdz",
}) => {
  return (
    <div className="w-full h-[400px]">
      <model-viewer
        src={glb}
        ios-src={glb}
        // loading="eager"
        poster="/img/plasma.png"
        alt="A 3D model of an astronaut"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        autoplay
        ar
        ar-modes="webxr scene-viewer quick-look"
      >
        <button
          slot="ar-button"
          className="p-2  bg-white border-4 absolute top-16 right-10"
        >
          👋 Activate AR
        </button>
      </model-viewer>
    </div>
  );
};

export default ModelViewer;
