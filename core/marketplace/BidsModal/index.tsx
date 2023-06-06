import React from 'react'
import { useEffect, useState } from 'react'

const BidsModal = ({ CloseEvent }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-[400px]  h-[500px] absolute bg-black text-white z-50 inset-0 top-1/4 left-1/3 flex flex-col items-center border border-white p-2 ">
      {/*  */}
      <div className="h-[50px] w-full grid grid-cols-2 p-2 ">
        <div className="flex justify-center items-center p-2">
          <h1>Edit Auction</h1>
        </div>
        <div className="flex flex-row-reverse p-2">
          <button onClick={CloseEvent} className="mr-5">
            X
          </button>
        </div>
      </div>
      {/* current bid div */}
      <div className="h-[100px] w-full flex flex-col p-2 ">
        <label>Current Bid</label>
        <input placeholder="1 ETH" className="bg-[#15161A] p-2 "></input>
      </div>

      {/* start date */}

      <label className="w-full text-left p-2">Start Date</label>
      <div className="grid grid-rows-2 h-[80px] w-full p-2 ">
        <div className="grid grid-cols-2">
          <div className="p-2 flex flex-col justify-center">
            <label> Date</label>
            <input className="bg-[#15161A] rounded-md text-white w-full p-2" type="date" />
          </div>

          <div className="p-2 flex flex-col justify-center ">
            <label> Time</label>
            <input className="bg-[#15161A] rounded-md w-full text-white p-2" type="time" />
          </div>
        </div>
      </div>

      {/* end date? */}
      <label className="w-full text-left p-2 mt-2">End Date</label>

      <div className="grid grid-rows-2 h-[80px] w-full p-2 ">
        <div className="grid grid-cols-2">
          <div className="p-2 flex flex-col justify-center">
            <label> Date</label>
            <input className="bg-[#15161A] rounded-md text-white w-full p-2" type="date" />
          </div>

          <div className="p-2 flex flex-col justify-center ">
            <label> Time</label>
            <input className="bg-[#15161A] rounded-md w-full text-white p-2" type="time" />
          </div>
        </div>
      </div>

      <div className="flex flex-col h-[50px] w-full p-2 items-center ">
        <button className="bg-[#2517FF] w-3/4 mt-4">Save Changes</button>
      </div>
    </div>
  )
}

export default BidsModal
