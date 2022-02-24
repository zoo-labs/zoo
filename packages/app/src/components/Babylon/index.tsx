import React, { useRef, useState } from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
  Color3,
} from "babylonjs";
import "babylonjs-loaders";
import SceneComponent from "./SceneComponent";

const BabylonAnim = () => {
  let box;
  let tiger;

  const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(10, 0, 20), scene);
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 5, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1.5;
    // Our built-in 'box' shape.
    // box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    scene.useRightHandedSystem = true;

    // Move the box upward 1/2 its height

    //box.position.y = 2;

    SceneLoader.ImportMeshAsync("", "./models/", "TigerTeen.glb").then(
      (result) => {
        console.log("ImportMeshAsync", result);
        // result.meshes[0].position.x = -2;
        result.meshes[0].position.y = -4;
        // result.meshes[0].position.z = -2;
        //result.meshes[0].rotation.x = 15;
        // result.meshes[0].rotation.y = 4;
        //  result.meshes[0].rotation.z = 2;

        const myMesh1 = scene.getMeshByName("myMesh_1");
      }
    );

    // SceneLoader.AppendAsync("./models/", "test.obj", scene, (result) => {});

    return scene;
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
    <div className="h-full w-full flex flex-col justify-center items-center ">
      <div className="  h-[600px]">
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
