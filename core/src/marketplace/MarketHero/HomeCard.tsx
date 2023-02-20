import React from 'react'
import dynamic from 'next/dynamic'

const MovingModelviewer = dynamic(() => import('../Modelview/MovingModelviewer'), {
  ssr: false,
})

const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false,
})

const HomeCard = ({
  glb = '/models/Tiger/TIGER_BABY.glb',
  CollectionName = 'Collection Name',
  TopOffer = 2,
  NftName = 'Tiger (2932)',
}) => {
  return (
    <div className=" mt-5 lg:mt-2 mb-2">
      <div className="w-[300px] h-[300px] borderGrad">
        <div className="w-full h-full bg-black rounded-[0.225rem]">
          <MovingModelviewer />
        </div>
      </div>

      <div className="w-[250px] grid grid-cols-2 mt-2  ">
        <div className="text-center ">
          <h1>{CollectionName}</h1>
        </div>

        <div className="text-center">
          <h1>TopOffer</h1>
        </div>
      </div>

      <div className="w-[250px] grid grid-cols-2 mt-2 ">
        <div className="text-center">
          <h1> {NftName}</h1>
        </div>

        <div className="text-center">
          <h1>{TopOffer}</h1>
        </div>
      </div>
    </div>
  )
}

export default HomeCard
