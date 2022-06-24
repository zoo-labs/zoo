import Image from 'next/image'
import React from 'react'
import CollectionTableMobile from './Mobile'

const CollectionTable = ({ collections }) => {
  return (
    <>
      <div className="w-[90%] min-h-[400px]  p-2  hidden md:flex flex-col justify-center items-center ">
        <table className="w-full border-collapse">
          <thead className="w-full">
            <tr className="w-full">
              <th className="text-x-emphasis border-b text-left border-medium-emphasis pb-4">Collection</th>
              <th className="text-x-emphasis border-b text-left border-medium-emphasis pb-4">Floor</th>
              <th className="text-x-emphasis border-b border-medium-emphasis pb-4">24h Vol</th>
              <th className="text-x-emphasis border-b border-medium-emphasis pb-4">Total Vol</th>
              <th className="text-x-emphasis border-b border-medium-emphasis pb-4">Owner</th>
              <th className="text-x-emphasis border-b border-medium-emphasis pb-4">Items</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {collections?.map((_, index) => (
              <tr key={index} className="w-full text-center">
                <td className="text-white border-b border-medium-emphasis text-left py-6 flex items-center">
                  <span className="mr-8 font-bold ">{index + 1}</span>{' '}
                  <span className="flex items-center gap-6">
                    <Image src="/icons/col.webp" alt="" width={40} height={40} className="rounded-md" />
                    Collection {index}
                  </span>
                </td>
                <td className="text-white border-b text-left border-medium-emphasis py-6">0.41</td>
                <td className="text-white border-b border-medium-emphasis py-6">9,615</td>
                <td className="text-white border-b border-medium-emphasis py-6">3,309,615</td>
                <td className="text-white border-b border-medium-emphasis py-6">3,309</td>
                <td className="text-white border-b border-medium-emphasis py-6">9,899</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[90%] flex flex-col md:hidden">
        {collections?.map((_, index) => (
          <CollectionTableMobile
            key={index}
            collection={{
              index: index + 1,
            }}
          />
        ))}
      </div>
    </>
  )
}

export default CollectionTable
