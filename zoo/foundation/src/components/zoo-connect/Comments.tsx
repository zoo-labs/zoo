import Image from 'next/image';
import Link from 'next/link';
import {FaHeart, FaRegHeart, FaShareAlt} from "react-icons/fa";
function Comments({name,img,date,content,like_text,like_flag}: {
    name: string;
    img: string;
    date: string;
    content: string;
    like_text: string;
    like_flag: boolean;
  }) {
  return (
    <div className="bg-[#1E1F23] rounded-xl p-3 mr-4">
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center border-b border-[#262934] pb-3'>
            <Image
                className='w-[40px]'
                src={img}
                width='1000'
                height='1000'
                alt=''
            />
            <div className='w-full flex flex-col space-y-1 pl-4'>
                <p className='text-sm'>{name}</p>
                <p className='text-sm'>{date}</p>
            </div>
            <button className=''>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_15_938)">
                <path d="M8.00008 6.27683C8.73341 6.27683 9.33341 5.67684 9.33341 4.9435C9.33341 4.21017 8.73341 3.61017 8.00008 3.61017C7.26675 3.61017 6.66675 4.21017 6.66675 4.9435C6.66675 5.67684 7.26675 6.27683 8.00008 6.27683ZM8.00008 7.61017C7.26675 7.61017 6.66675 8.21017 6.66675 8.9435C6.66675 9.67683 7.26675 10.2768 8.00008 10.2768C8.73341 10.2768 9.33341 9.67683 9.33341 8.9435C9.33341 8.21017 8.73341 7.61017 8.00008 7.61017ZM8.00008 11.6102C7.26675 11.6102 6.66675 12.2102 6.66675 12.9435C6.66675 13.6768 7.26675 14.2768 8.00008 14.2768C8.73341 14.2768 9.33341 13.6768 9.33341 12.9435C9.33341 12.2102 8.73341 11.6102 8.00008 11.6102Z" fill="#3C9465"/>
                </g>
                <defs>
                <clipPath id="clip0_15_938">
                <rect width="16" height="16" fill="white" transform="translate(0 0.943481)"/>
                </clipPath>
                </defs>
                </svg>
            </button>
        </div>
        <p className='text-sm'>{content}</p>
        <p className='text-sm'>{like_text}</p>
        <div className='flex items-center space-x-2 text-[#13B156]'>
            {like_flag? <FaHeart /> : <FaRegHeart />}
            <span className='text-white pr-4'>Like</span>
            <FaShareAlt />
            <span className='text-white'>Share</span>
        </div>
      </div>
    </div>
  );
}

export default Comments;
