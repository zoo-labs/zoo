import React from 'react'

const WelcomeCard = ({
  tittle = 'Main Tittle Text use "tittle" prop to change ',
  subtittle = 'Subttile text use "subtitle" prop to change ',
}) => {
  return (
    <div className="h-[300px] w-[250px] lg:w-[400px] ">
      <div className=" h-[100px] p-2">
        <h1 className="p-2 text-xl ">{tittle}</h1>
      </div>

      <div className=" h-[100px] p-2">
        <h5 className="p-2 text-sm">{subtittle}</h5>
      </div>
      <div className="flex p-2  h-[100px]">
        <button className="text-xs m-2 p-2 border-white border  h-[50px] w-[125px]">Buy ZOO NFTs</button>

        <button className="text-xs m-2 p-2 border-white border  h-[50px] w-[125px]">Explore ZOO NFTs</button>
      </div>
    </div>
  )
}

export default WelcomeCard
