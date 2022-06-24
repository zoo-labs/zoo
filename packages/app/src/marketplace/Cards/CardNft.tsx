import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false,
})

const CardNft = ({
  TokenId = 1,
  glb,
  animalName = 'Siberian Tiger(2312)',
  ownerAdd = '8xbkdbsk',
  daysLeft = 3,
  bids = 1,
  yields = 100,
  price = 500,
  className = '',
}) => {
  return (
    <div className={`flex flex-col w-[300px] lg:w-[400px] h-[600px] justify-center items-center  ${className}`}>
      <div>
        <div className="h-[350px] w-[250px]  borderGrad p-2 m-2">
          <div className="w-full h-full bg-black rounded-[0.225rem]">
            <ModelViewer glb={glb}></ModelViewer>
          </div>
        </div>

        <div className="flex items-center py-2 pr-2 mt-2 w-full justify-between">
          <div className="text-left">
            <h1 className="text-sm text-white p-2 font-semibold">{animalName}</h1>
          </div>

          <div className="text-center ">
            <Link
              href={{
                pathname: '/marketplace/[animalNFT]',
                query: { animalNFT: animalName, id: TokenId, glb: glb },
              }}
              passHref
            >
              <button className="text-xs  bg-transparent w-full border-solid border-[#06047a] hover:bg-[#06047a] transition ease-in-out border-2 p-2 hover:bg-gradient-to-r from-gray-700 via-gray-900 to-black">
                {price}K ZOO
              </button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between h-[50px] py-2 px-2">
          <div className="text-center flex ">
            <span
              className="dot p-2 mt-[10px]"
              style={{
                background: 'linear-gradient(180deg, #2517FF -61.88%, #15F195 131.19%)',
              }}
            ></span>
            <h1 className="text-sm text-gray-600 p-2">{ownerAdd}</h1>
          </div>

          <div className="text-center">
            <h1 className="text-sm font-black uppercase text-gray-300">{daysLeft} days Left</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 h-[5spx] w-[250px] p-2">
          <hr className="  w-[250px]"></hr>
        </div>

        <div className="flex items-center justify-between  h-[50px]">
          <div className="text-left flex-1">
            <h1 className=" text-xs text-gray-600 p-2">Highest Bid</h1>
          </div>

          <div className="text-center">
            <h1 className="text-sm text-white p-2 font-semibold">{bids}M Zoo</h1>
          </div>

          <div className="text-center flex-1">
            <h1 className=" text-xs text-gray-600 p-2">{yields} Yields/Day</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardNft
