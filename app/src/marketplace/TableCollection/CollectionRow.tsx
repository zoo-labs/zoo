import React from 'react'

const CollectionRow = ({
  ColARank = '1',
  ColA = 'Use Prop "ColA" To Change ',
  ColB = 'Use Prop "ColB" To Change ',
  ColC = 'Use Prop "ColC" To Change ',
  ColD = 'Use Prop "ColD" To Change ',
  ColE = 'Use Prop "ColC" To Change',
  ColF = 'Use Prop "ColF" To Change',
}: any) => {
  return (
    <>
      <tr className="grid md:grid-cols-7">
        <td className="text-xs md:text-base  text-left col-span-2 bg-[#1F2030] p-4 border-b border-opacity-5 flex  ">
          <div className="w-1/4">{ColARank}</div>
          <div className="w-full text-xs md:text-base  text-left ">{ColA}</div>
        </td>
        <td className="text-xs md:text-base  text-left bg-[#1F2030] p-4 border-b border-opacity-5">{ColB}</td>
        <td className="text-xs md:text-base  text-left bg-[#1F2030] p-4 border-b border-opacity-5">{ColC}</td>
        <td className="text-xs md:text-base  text-left bg-[#1F2030] p-4 border-b border-opacity-5">{ColD}</td>
        <td className="text-xs md:text-base  text-left bg-[#1F2030] p-4 border-b border-opacity-5">{ColE}</td>
        <td className="text-xs md:text-base  text-left bg-[#1F2030] p-4 border-b border-opacity-5">{ColF}</td>
      </tr>
    </>
  )
}

export default CollectionRow
