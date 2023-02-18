import React from 'react'

const TwoColumComp = ({
  LeftCol = "Use 'LeftCol'  prop to change text",
  RightCol = "Use 'RightCol'  prop to change text",
  AddClass = '',
}: any) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-screen ${AddClass} `}>
      <div className=" w-full flex flex-col justify-center items-center">{LeftCol}</div>

      <div className=" w-full flex flex-col justify-center items-center">{RightCol}</div>
    </div>
  )
}

export default TwoColumComp
