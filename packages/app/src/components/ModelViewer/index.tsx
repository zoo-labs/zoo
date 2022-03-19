import React, { useEffect, useState, useRef } from "react";
import Image from "next/link";
import "@google/model-viewer/dist/model-viewer";
import Head from "next";
const ModelViewer = ({
  glb = "/models/Tiger/tigerteen.glb",
  usdz = "/models/Tiger/TIGER_BABY.usdz",
  zoom = "auto",
  usdzFile = false,
  multiple = false,
}) => {
  const animals = [
    "/models/Wolf/WOLF.glb",
    "/models/Tiger/tigerteen.glb",
    "/models/Leopard/LEOPARD_YOUNG_TEEN.glb",
    "/models/Elephant/ELEPHTEEN.glb",
    "/models/Giraffe/GIRAFFE_YOUNG_TEEN.glb",
    "/models/Hippo/HIPPO_YOUNG_TEEN.glb",
    "/models/Rhino/RHINO_YOUNG_TEEN.glb",
  ];
  const elementRef = useRef();
  const [index, setindex] = useState(0);
  const [currentAnimal, setCurrentAnimal] = useState(animals[index]);

  const ModelVie = `
      <model-viewer
        ${usdzFile ? `usdz=${usdz}` : ``}
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
        ></model-viewer>`;

  useEffect(() => {
    // setInterval(() => {
    //   if (index < 6) {
    //     setindex((index) => index + 1);
    //     console.log(animals[index]);
    //     setCurrentAnimal(animals[index]);
    //   } else {
    //     setindex(0);
    //     console.log(animals[index]);
    //     setCurrentAnimal(animals[index]);
    //   }
    // }, 15000);

    return () => {};
  }, []);

  return (
    <>
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: ModelVie }}
      ></div>
    </>
  );
};

export default ModelViewer;
