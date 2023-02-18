import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const RankingsRow = ({ Rank = 1, Name = '@finessequeen', addy = '0xd8 … 3a8db', Rankid = 0 }) => {
  const router = useRouter()
  return (
    <div className=" grid grid-cols-6 border border-[#2A06F0] w-[270px] md:w-full rounded-xl p-4 mt-8">
      <div className="text-xs md:text-xl col-span-3">
        <span className="p-2">{Rank}.</span>
        {Name}
      </div>
      <div className="text-xs md:text-xl col-span-2">{addy}</div>
      <div className="">
        <button className="text-xs  bg-transparent w-full  p-2" onClick={() => router.push(`/rankings/${Rankid}`)}>
          <Image src="/icons/right-arrow.png" width={24} height={24} alt="" />
        </button>
      </div>
    </div>
  )
}

export default RankingsRow
