import React from 'react'

const CollectionTable = ({
  children,
  TitleA = 'Use "TableA" prop To change',
  TitleB = 'Use "TableB" prop To change',
  TitleC = 'Use "TableC" prop To change',
  TitleD = 'Use "TableD" prop To change',
  TitleE = 'Use "TableE" prop To change',
  TitleF = 'Use "TableF" prop To change',
  TitleMain = 'Use "TitleMain" prop To change',
}) => {
  return (
    <div className="w-full bg-transparent min-h-[800px]">
      <h3 className="mb-12 text-center mt-10 text-2xl text-white font-normal">{TitleMain}</h3>

      <table className="w-full rounded-2xl p-2 ">
        <thead className="p-2 bg-[#292A3E]">
          <tr className="grid grid-cols-7">
            <th className="text-xs lg:text-base  text-left ml-10 col-span-2 p-4 text-white  ">{TitleA}</th>
            <th className="text-xs lg:text-base  text-left p-4 text-white  ">{TitleB}</th>
            <th className="text-xs lg:text-base  text-left p-4 text-white  ">{TitleC}</th>
            <th className="text-xs lg:text-base  text-left p-4 text-white  ">{TitleD}</th>
            <th className="text-xs lg:text-base  text-left p-4 text-white  ">{TitleE}</th>
            <th className="text-xs lg:text-base  text-left p-4 text-white  ">{TitleF}</th>
          </tr>
        </thead>
        <tbody className="p-2">{children}</tbody>
      </table>
    </div>
  )
}

export default CollectionTable
