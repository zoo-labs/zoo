import React, { useEffect, useState, useRef } from "react";
// Image isn't used in this component
// import Image from "next/image";
import "@google/model-viewer/dist/model-viewer";
// Head isn't used in this component
// import Head from "next/head";
const ModelViewer = ({
  glb = "/models/Tiger/TIGER_BABY.glb",
  usdz = "/models/Tiger/TIGER_BABY.usdz",
  zoom = "auto",
  camera_orbit = "",
  camera_target = "",
  control = true,
  ar = true,
  auto_play = true,
  usdzFile = false,
  multiple = false,
  onClick = () => {},
  className = "",
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
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [index, setindex] = useState(0);
  const [currentAnimal, setCurrentAnimal] = useState(animals[index]);

  const ModelVie = `
      <model-viewer
        ios-src=${usdz}
        src=${glb}
        loading="auto"
        reveal="auto"
        camera-orbit='${camera_orbit}'
        camera-target='${camera_target}'
        alt=""
        shadow-intensity="1"
        ${control ? 'camera-controls' : ''}
        ${auto_play ? 'auto-rotate autoplay' : ''}
        ${ar ? 'ar ar-placement="floor" ar-modes="scene-viewer webxr"' : ''}
        max-field-of-view=${zoom}
        ></model-viewer>`;

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div
        className={`w-full h-full ${className}`}
        dangerouslySetInnerHTML={{ __html: ModelVie }}
        onClick={onClick}
      ></div>
    </>
  );
};

export default ModelViewer;
