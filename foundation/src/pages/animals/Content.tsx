import React, { useState } from 'react';
function Content({title,content}: {
    content: string;
    title: string;
  }) {
  return (
    <div className="bg-black px-64">
      <div className="flex justify-between py-20">
        <div className='relative md:w-1/2 pr-32'>
            <p className='text-white text-3xl'>{title}</p>
        </div>
        <div className='w-1/2 max-md:w-full flex justify-between space-x-16'>
            <p className='flex-1 text-white text-lg columns-2 gap-12'><span dangerouslySetInnerHTML={{__html: content}}/></p>
        </div>
      </div>
    </div>
  );
}

export default Content;
