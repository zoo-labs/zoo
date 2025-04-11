import React, { useState } from 'react';
import Image from 'next/image';
import "@fontsource/poppins";
function Accordion({
    header = "",
    content = "",
    open = false,
    className = "",
  }) {
  const [isOpen, setIsOpen] = useState(open);
    console.log(open);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
        className={`text-white border border-white rounded-xl ${className}`}
      >
        <div className={`flex px-4 py-3 justify-between items-center ${isOpen ? 'border-b border-white rounded-xl' : ''}`}>
            <p className="2xl:text-2xl xl:text-xl" dangerouslySetInnerHTML={{ __html: header }}></p>
            <Image
                className={`cursor-pointer ${isOpen ? '': 'rotate-180'}`}
                src="/icons/caret.svg"
                width={32}
                height={32}
                alt=""
                onClick={toggle}
            />
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'}`}>
            <p className="px-4 py-6 text-sm xl:min-h-[290px] lg:min-h-[350px] md:min-h-[270px]" dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
      </div>
  );
}

export default Accordion;
