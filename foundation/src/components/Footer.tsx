import React, { useState } from 'react';
import {FaTelegram, FaTwitter, FaInstagram, FaDiscord, FaYoutube} from "react-icons/fa";
import {BsMedium} from "react-icons/bs"
function Footer() {
  return (
    <div>
    <div className="bg-black pb-32 max-md:hidden">
        <hr />
      <div className='grid md:grid-cols-5 grid-cols-1 gap-8 xl:px-56 lg:px-40 md:px-32 max-md:px-4 pt-20'>
        <div className='flex flex-col space-y-8'>
            <p className='text-lg text-white'>ZOO FOUNDATION</p>
            <p className='text-md text-white'>All rights reserved.© 2023 Zoo Labs Foundation. </p>
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
            <a href="/about" className='text-lg text-white'>About</a>
            <a href="/getinvolved" className='text-lg text-white'>Get Involved</a>
            <a href="/donation" className='text-lg text-white'>Donate</a>
            <a href="#" className='text-lg text-white'>Volunteer</a>
            <a href="#" className='text-lg text-white'>Initiatives</a>
        </div>
        <div className='flex flex-col space-y-8'>
            <a href="/collect" className='text-lg text-white'>Digital Collectibles</a>
            <a href="/animals/red_wolf" className='text-lg text-white'>Red Wolf</a>
            <a href="/animals/nubian_giraffe" className='text-lg text-white'>Nubian Giraffe</a>
            <a href="/animals/amur_leopard" className='text-lg text-white'>Amur Leopard</a>
            <a href="/animals/sumatran_elephant" className='text-lg text-white'>Sumatran Elephant</a>
        </div>
        <div className='flex flex-col space-y-8'>
            <a href="/animals/javen_rhino" className='text-lg text-white'>Javan Rhino</a>
            <a href="/animals/pygmy_hippo" className='text-lg text-white'>Pygmy Hippo </a>
            <a href="/animals/siberian_tiger" className='text-lg text-white'>Siberian Tiger</a>
        </div>
        <div className='flex flex-col space-y-8'>
            <a href="/terms" className='text-lg text-white'>Terms of Use</a>
            <p className='text-md text-white'>zoolabs.io</p>
            <p className='text-md text-white'>hello@zoo.ngo</p>
        </div>
      </div>
    </div>
    <div className='bg-black hidden max-md:block'>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-xl text-white'>ZOO LABS</p>
        <div className='flex items-center pt-8 space-x-16'>
          <a href="/" className='text-lg text-white'>Home</a>
          <a href="/about" className='text-lg text-white'>About</a>
          <a href="/getinvolved" className='text-lg text-white'>Get Involved</a>
        </div>
        <div className='flex items-center pt-6 space-x-16'>
          <a href="/collect" className='text-lg text-white'>Collect</a>
            <a href="/donation" className='text-lg text-white'>Donate</a>
        </div>
        <div className='flex items-center space-x-2 text-white pt-10'>
                <a href="#"> <FaTwitter /> </a>
                <a href="#"> <FaTelegram /> </a>
                <a href="#"> <FaInstagram /> </a>
                <a href="#"> <FaDiscord /> </a>
                <a href="#"> <BsMedium /> </a>
                <a href="#"> <FaYoutube /> </a>
        </div>
        <hr className='w-full bg-white my-4'/>
        <div className='flex items-center space-x-16'>
          <a href="#" className='text-lg text-white '>Privacy Policy</a>
            <a href="/terms" className='text-lg text-white'>Term of service</a>
        </div>
        <p className='text-lg text-white pt-6 pb-16'>© 2023 Zoo Labs Foundation</p>
      </div>
    </div>
    </div>
  );
}

export default Footer;
