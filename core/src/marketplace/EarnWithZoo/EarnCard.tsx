import React from 'react'

const EarnCard = ({
  heading = 'Main Heading',
  subText = ' Sub heading Lorem empore error enim obcaecati ratione atque porro? Eum illo cumque totam assumenda enim quos.',
}) => {
  return (
    <div className="w-[300px] h-[250px] bg-transparent border-2 border-gray-600  ">
      <div className=" w-full h-[50px] flex flex-col p-2 "></div>
      <div className=" w-full h-[50px] flex flex-col p-2 ">
        <h1>{heading}</h1>
      </div>

      <div className="w-full text-gray-600  h-[150px] p-2">
        <p>{subText}</p>
      </div>
    </div>
  )
}

export default EarnCard
