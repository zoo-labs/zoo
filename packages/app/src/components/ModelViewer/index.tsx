import React, { useEffect, useState } from "react";
import Image from "next/link";
import "@google/model-viewer/dist/model-viewer";

const ModelViewer = ({
  glb = "/models/tigerteen.glb",
  usdz = "/models/tigerteen.usdz",
  zoom = "auto",
}) => {
  // const animals = [
  //   "/models/tigerteen.glb",
  //   "/models/Gir.glb",
  //   "/models/Leo.glb",
  //   "/models/WOLF.glb",
  // ];
  // let index;
  // const [currentAnimal, setCurrentAnimal] = useState(animals[index]);

  // function makeAlert() {
  //   if (index > animals.length) {
  //     index = 0;
  //     setCurrentAnimal(animals[index]);
  //   } else {
  //     index++;
  //     setCurrentAnimal(animals[index]);
  //   }
  // }

  // useEffect(() => {
  //   setInterval(makeAlert, 500);
  //   return () => {};
  // }, [currentAnimal]);

  const ModelVie = `
      <model-viewer
        src=${glb}
        loading="eager"
        alt="A 3D model of an astronaut"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        autoplay
        ar
        ar-modes="webxr scene-viewer quick-look"
        reveal="auto"
        max-field-of-view=${zoom}
        
      >
          </model-viewer>`;

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
