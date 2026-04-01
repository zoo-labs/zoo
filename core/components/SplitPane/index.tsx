import React from 'react'

export default function SplitPane({ left, right }: { left: React.ReactElement; right: React.ReactElement }): React.ReactElement {
  return (
    <div className="flex flex-1 items-center flex-col md:flex-row justify-between pb-2 px-2 md:px-7">
      <div className="w-full md:w-1/2">{left}</div>
      <div className="w-full md:w-1/2">{right}</div>
    </div>
  )
}
