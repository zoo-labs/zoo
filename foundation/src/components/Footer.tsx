import React, { useState } from 'react';
import {FaTelegram, FaTwitter, FaInstagram, FaDiscord, FaYoutube} from "react-icons/fa";
import {BsMedium} from "react-icons/bs"
function Footer() {
  return (
    <div className="bg-black pb-32">
        <hr />
      <div className='grid md:grid-cols-5 grid-cols-1 gap-8 xl:px-56 lg:px-40 md:px-32 max-md:px-4 pt-20'>
        <div className='flex flex-col space-y-8'>
            <p className='text-md text-white'>ZOO FOUNDATION</p>
            <p className='text-sm text-white'>All rights reserved.© 2023 Zoo Labs Foundation. </p>
            <div className='flex items-center space-x-2 text-white'>
                <a href="#"> <FaTwitter /> </a>
                <a href="#"> <FaTelegram /> </a>
                <a href="#"> <FaInstagram /> </a>
                <a href="#"> <FaDiscord /> </a>
                <a href="#"> <BsMedium /> </a>
                <a href="#"> <FaYoutube /> </a>
            </div>
        </div>
        <div className='flex flex-col space-y-8'>
            <a href="/about" className='text-md text-white'>About</a>
            <a href="/getinvolved" className='text-md text-white'>Get Involved</a>
            <a href="/donation" className='text-md text-white'>Donate</a>
            <a href="#" className='text-md text-white'>Volunteer</a>
            <a href="#" className='text-md text-white'>Initiatives</a>
        </div>
        <div className='flex flex-col space-y-8'>
            <a href="/collect" className='text-md text-white'>Digital Collectibles</a>
            <a href="/animals/red_wolf" className='text-md text-white'>Red Wolf</a>
            <a href="/animals/nubian_giraffe" className='text-md text-white'>Nubian Giraffe</a>
            <a href="/animals/amur_leopard" className='text-md text-white'>Amur Leopard</a>
            <a href="/animals/sumatran_elephant" className='text-md text-white'>Sumatran Elephant</a>
        </div>
        <div className='flex flex-col space-y-8'>
            <a href="/animals/javen_rhino" className='text-md text-white'>Javan Rhino</a>
            <a href="/animals/rygmy_hippo" className='text-md text-white'>Pygmy Hippo </a>
            <a href="/animals/siberian_tiger" className='text-md text-white'>Siberian Tiger</a>
        </div>
        <div className='flex flex-col space-y-8'>
            <a href="/terms" className='text-md text-white'>Terms of Use</a>
            <p className='text-sm text-white'>zoolabs.io</p>
            <p className='text-sm text-white'>hello@zoo.ngo</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
