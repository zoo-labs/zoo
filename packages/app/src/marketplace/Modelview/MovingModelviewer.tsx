import React, { useEffect, useState, useRef } from 'react'
import '@google/model-viewer'

const MovingModelviewer = ({ glb = '/models/Eggs/Egg.glb', usdz = '', zoom = 'auto', multiple = false }) => {
  const [GlbSource, setGlbSource] = useState(glb)
  const [CurrentModel, setCurrentModel] = useState(0)

  const Arr = [
    '/models/Eggs/Egg.glb',
    '/models/Tiger/TIGER_BABY.glb',
    '/models/Tiger/TIGER_TEEN.glb',
    '/models/Tiger/TIGER_ADULT.glb',
  ]

  //for all usdz files
  // ios-src=${usdz}
  const ModelVie = `
      <model-viewer
        src=${GlbSource}
        loading="auto"
        reveal="auto"
        alt=""
        slot="poster"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        autoplay
        ar
        ar-placement="floor"
        ar-modes="scene-viewer webxr quick-look"
        max-field-of-view=${zoom}
        ></model-viewer>`
  useEffect(() => {
    setTimeout(() => {
      console.log('10 seconds')
      setGlbSource(Arr[CurrentModel])
      setCurrentModel(CurrentModel + 1)

      if (CurrentModel === Arr.length) {
        setCurrentModel(0)
        setGlbSource(Arr[CurrentModel])
      }
    }, 7000)
    return () => {}
  }, [GlbSource, CurrentModel, ModelVie])

  return (
    <>
      <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: ModelVie }}></div>
    </>
  )
}

export default MovingModelviewer
