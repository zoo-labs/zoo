import React from 'react'

const NftRight = ({
  NftText = 'To hatch or to hold...',
  NftName = 'Egg#4',
  transaction = '8xx902xcbx93..',
  TokenId = '43',
  Hash = '8xbsxbc9',
  TokenStandard = 'ERC-721',
}) => {
  return (
    <div className="flex flex-col p-2 w-[300px]  lg:w-[400px] ">
      <div className="p-2 ">
        <h1 className="text-xl">{NftName}</h1>
        <h1 className="text-xl mt-2">{NftText} </h1>
      </div>

      <div className="borderGrad  mt-4 m-2">
        <div className="w-full h-full bg-black">
          <h1 className="text-lg font-bold p-2">Details</h1>
          <ul>
            <li className="p-2">
              <h1 className="p-1 w-full  grid grid-cols-2">
                Transaction <span className="text-purple right-5">{transaction}</span>
              </h1>
            </li>
            <li className="p-2">
              <h1 className="p-1 w-full  grid grid-cols-2">
                Token ID <span className=" right-5">{TokenId}</span>
              </h1>
            </li>
            <li className="p-2">
              <h1 className="p-1 w-full  grid grid-cols-2">
                Hash <span className=" right-5">{Hash}</span>
              </h1>
            </li>

            <li className="p-2">
              <h1 className="p-1 w-full  grid grid-cols-2">
                Token Standard <span className="text-purple right-5">{TokenStandard}</span>
              </h1>
            </li>
          </ul>
        </div>
      </div>

      <div className="borderGrad p-2 mt-4 m-2">
        <div className="w-full h-full bg-black">
          <h1 className="p-2 text-lg font-bold">Proof of Authenticity</h1>
          <h1 className="p-3">300,000 $zoo</h1>

          <h1 className="p-3 text-purple">Ether Scan Transaction</h1>
          <h1 className="p-3 text-purple">View on IPFs</h1>
        </div>
      </div>
    </div>
  )
}

export default NftRight
