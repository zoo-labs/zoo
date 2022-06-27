/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useState } from 'react'

const CollectionTableMobile = ({ collection }) => {
  const [showMobileFull, setShowMobileFull] = useState(false)

  return (
    <div className="flex items-star gap-4 w-full">
      <p className="text-white font-semibold mt-6">{collection.index}</p>
      <div className="flex w-full items-start justify-between border-b py-4 gap-4">
        <div className="flex items-start gap-4 w-full">
          <img src="/icons/col.webp" alt="" width={40} height={40} className="rounded-md" />
          <div className="mt-2.5 w-full">
            <p className="text-white font-bold">Terraforms</p>
            <div className="mt-4">
              <p className="grid grid-cols-3 justify-between items-center mb-1.5">
                <span>Floor</span>
                <span className="font-bold text-white">0.46</span>
              </p>
              <p className="grid grid-cols-3 justify-between items-center mb-1.5">
                <span>24h Vol</span>
                <span className="font-medium">9,615.25</span>
                <span className="font-medium text-red">-32%</span>
              </p>
              <div className={`${!showMobileFull && 'hidden'}`}>
                <p className="grid grid-cols-3 justify-between items-center mb-1.5">
                  <span>Total Vol</span>
                  <span className="font-medium">3,615,978.25</span>
                </p>
                <p className="grid grid-cols-3 justify-between items-center mb-1.5">
                  <span>Owners</span>
                  <span className="font-medium">3,615</span>
                </p>
                <p className="grid grid-cols-3 justify-between items-center mb-1.5">
                  <span>Items</span>
                  <span className="font-medium">9,654</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`rounded-md p-2.5 ${showMobileFull && 'bg-[#1A1E22]'}`}
          onClick={() => setShowMobileFull(!showMobileFull)}
        >
          <svg
            viewBox="0 0 32 32"
            focusable="false"
            className="chakra-icon css-1sdtgly w-6"
            aria-hidden="true"
            style={{
              transform: showMobileFull && 'rotateX(180deg)',
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 22L6 12L7.4 10.6L16 19.2L24.6 10.6L26 12L16 22Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CollectionTableMobile
