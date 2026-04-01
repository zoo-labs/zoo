import {
  Engine,
  Scene,
  SceneLoader,
  FreeCamera,
  Vector3,
  Color4,
} from "babylonjs";
//import { Color3 } from "babylonjs/Maths/math.color";
import React, { useEffect, useRef } from "react";

export default (props) => {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    clearColor = new BABYLON.Color4(0, 0, 0, 0),
    ...rest
  } = props;

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      const scene = new Scene(engine, sceneOptions);

      scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

      if (scene.isReady()) {
        props.onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
  }, [reactCanvas]);

  return <canvas className="h-full w-full " ref={reactCanvas} {...rest} />;
};
