import React, { useState } from 'react';
function Content({title,content}: {
    content: string;
    title: string;
  }) {
  return (
    <div className="bg-black md:px-64">
      <div className="flex max-md:flex-col max-md:px-4 justify-between py-20">
        <div className='relative md:w-1/2 max-md:w-full md:pr-32 max-md:pb-8'>
            <p className='text-white text-4xl '>{title}</p>
        </div>
        <div className='w-1/2 max-md:w-full flex justify-between space-x-16'>
            <p className='flex-1 text-white text-xl md:columns-2 gap-12'><span dangerouslySetInnerHTML={{__html: content}}/></p>
        </div>
      </div>
    </div>
  );
}

export default Content;
