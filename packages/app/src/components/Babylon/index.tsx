import React, { useRef, useState } from "react";
import { SceneLoader } from "babylonjs";
import "babylonjs-loaders";
import SceneComponent from "./SceneComponent";

const BabylonAnim = ({
  animal = "TigerTeen.glb",
  upperRadius = 40,
  lowerRadius = 14,
}) => {
  const animalModel = useRef(null);
  let tiger;
  const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    // var camera = new FreeCamera("camera1", new Vector3(10, 0, 13), scene);
    // // This targets the camera to scene origin
    // camera.setTarget(Vector3.Zero());

    // Parameters: name, alpha, beta, radius, target position, scene
    var camera2 = new BABYLON.ArcRotateCamera(
      "Camera",
      0,
      0,
      5,
      new BABYLON.Vector3(0, 5, 0),
      scene
    );

    // Positions the camera2 overwriting alpha, beta, radius
    //camera2.setPosition(new BABYLON.Vector3(0, 20, 20));

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera2 to the canvas
    camera2.attachControl(canvas, true);

    scene.useRightHandedSystem = true;

    //Set gravity for the scene (G force like, on Y-axis)
    //  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    tiger = SceneLoader.ImportMeshAsync("", "./models/", animal, scene).then(
      (result) => {
        console.log("ImportMeshAsync", result);

        scene.createDefaultCamera(true, true, true);
        scene.activeCamera.useAutoRotationBehavior = false;

        scene.activeCamera.lowerRadiusLimit = lowerRadius;
        scene.activeCamera.upperRadiusLimit = upperRadius;

        scene.activeCamera.setPosition(new BABYLON.Vector3(5, 5, 16));

        scene.lights[0].dispose();
        // var light = new BABYLON.DirectionalLight(
        //   "light1",
        //   new BABYLON.Vector3(0, 0, 0),
        //   scene
        // );
        // light.position = new BABYLON.Vector3(3, 6, 9);
        // light.intensity = 1.5;

        var light2 = new BABYLON.HemisphericLight(
          "light21",
          new BABYLON.Vector3(0, 0, 10),
          scene
        );

        light2.intensity = 1.3;

        // var generator = new BABYLON.ShadowGenerator(512, light2);
        // generator.useBlurExponentialShadowMap = true;
        // generator.blurKernel = 32;

        // for (var i = 0; i < scene.meshes.length; i++) {
        //   generator.addShadowCaster(scene.meshes[i]);
        // }

        let myPet = result.meshes[0];

        var helper = scene.createDefaultEnvironment({
          enableGroundMirror: true,
          groundShadowLevel: 1,
        });

        //helper.setMainColor(new BABYLON.Color4(0.01, 0.01, 0.01, 0));
        helper.setMainColor(new BABYLON.Color4(0, 0, 0, 0));
      }
    );

    return scene;
  };

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    if (tiger !== undefined) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-center items-center ">
      <div className="w-full  h-[500px]">
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