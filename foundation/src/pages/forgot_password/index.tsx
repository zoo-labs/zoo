import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiMessageDetail, BiMailSend } from "react-icons/bi";
export default function ZooConnect() {
  return (
    <Layout>
        <Seo />
        <Navbar />
        <div className='bg-black py-32 text-white'>
          <div className='md:w-[500px] mx-auto w-full rounded-3xl px-12 md:border border-white py-8 flex flex-col'>
            <p className='text-white text-2xl text-center pb-8'>Forgot Password</p>
            <p className='text-white text-md text-center'>Select which contact details should we use to reset your password</p>
            <div className='border border-[#262934] bg-[#1E1F23] space-x-4 mt-8 rounded-xl p-4 flex items-center'>
              <div className='w-[50px] h-[50px] p-[10px] bg-[#ffffff19] rounded-full'>
                <BiMessageDetail size={30} />
              </div>
              <div className='flex flex-col space-y-2'>
                <p>via SMS:</p>
                <p>+1573*****57</p>
              </div>
            </div>
            <div className='border border-[#262934] bg-[#1E1F23] space-x-4 mt-8 rounded-xl p-4 flex items-center'>
              <div className='w-[50px] h-[50px] p-[10px] bg-[#ffffff19] rounded-full'>
                <BiMailSend size={30} />
              </div>
              <div className='flex flex-col space-y-2'>
                <p>via EMAIL:</p>
                <p>woo******@gmail.com</p>
              </div>
            </div>
            <button className='mt-8 rounded-full py-2 px-4 text-lg text-black bg-white'>Continue</button>
          </div>
          <div className='md:w-[500px] mx-auto w-full rounded-3xl px-12 md:border border-white py-8 flex flex-col'>
            <p className='text-white text-2xl text-center pb-8'>Forgot Password</p>
            <p className='text-white text-md text-center pb-8'>Code has been send to +6282******39</p>
            <div className='flex items-center justify-between'>
              <input className='w-[50px] bg-[#262934] h-[50px] text-center text-xl rounded-full outline-none  border border-[#262934] text-white' maxLength={1}/>
              <input className='w-[50px] bg-[#262934] h-[50px] text-center text-xl rounded-full outline-none  border border-[#262934] text-white' maxLength={1}/>
              <input className='w-[50px] bg-[#262934] h-[50px] text-center text-xl rounded-full outline-none  border border-[#262934] text-white' maxLength={1}/>
              <input className='w-[50px] bg-[#262934] h-[50px] text-center text-xl rounded-full outline-none  border border-[#262934] text-white' maxLength={1}/>
            </div>
            <button className='mt-8 rounded-full py-2 px-4 text-lg text-black bg-white'>Verify</button>
          </div>
        </div>
        <Footer />
    </Layout>
  );
}
