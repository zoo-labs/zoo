import React, { useRef, useState } from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
// import anim from "../../assets/animations/TIGER_ADULT.glb";

const BabylonAnim = () => {
  let box;
  let tiger;

  const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 4, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'box' shape.
    box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

    // Move the box upward 1/2 its height

    box.position.y = 2;
  };

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    if (box !== undefined) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center ">
      <div className=" w-full h-[700px]">
        <SceneComponent
          antialias
          onSceneReady={onSceneReady}
          onRender={onRender}
          id="my-canvas"
        />
      </div>
    </div>
  );
};

export default BabylonAnim;
