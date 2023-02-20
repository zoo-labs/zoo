import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/solid'

const TableRow = ({
  ColA = 'Use Prop "ColA" To Change ',
  ColB = 'Use Prop "ColB" To Change ',
  ColC = 'Use Prop "ColC" To Change ',
  ColD = 'Use Prop "ColD" To Change ',
}) => {
  const [copied, setCopied] = useState(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(ColD)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])
  return (
    <>
      <tr className="">
        <td className=" text-xs md:text-base text-\ bg-[#1F2030] py-6 px-10 border-b border-opacity-5 flex items-center gap-4">
          <Image src="/icons/check-circle.svg" alt="" height={24} width={24} /> {ColA}
        </td>
        <td className=" text-xs md:text-base text-center bg-[#1F2030] p-4 border-b border-opacity-5">{ColB}</td>
        <td className=" text-xs md:text-base text-center bg-[#1F2030] p-4 border-b border-opacity-5">{ColC}</td>
        <td className=" text-xs md:text-base text-center bg-[#1F2030] p-4 border-b border-opacity-5">{ColD}</td>
        <td
          className=" text-xs md:text-base text-center bg-[#1F2030]  border-b border-opacity-5 cursor-pointer"
          onClick={copyToClipboard}
        >
          {copied ? (
            <CheckIcon className="text-primary-green w-6 h-6 mx-auto" />
          ) : (
            <Image src="/icons/copy.svg" alt="" width={20} height={20} />
          )}
        </td>
      </tr>
    </>
  )
}

export default TableRow
