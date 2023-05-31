import Link from 'next/link';
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
                <Link href="#"> <FaTwitter /> </Link>
                <Link href="#"> <FaTelegram /> </Link>
                <Link href="#"> <FaInstagram /> </Link>
                <Link href="#"> <FaDiscord /> </Link>
                <Link href="#"> <BsMedium /> </Link>
                <Link href="#"> <FaYoutube /> </Link>
            </div>
        </div>
        <div className='flex flex-col space-y-8'>
            <Link href="/about" className='text-lg text-white'>About</Link>
            <Link href="/getinvolved" className='text-lg text-white'>Get Involved</Link>
            <Link href="/donation" className='text-lg text-white'>Donate</Link>
            <Link href="#" className='text-lg text-white'>Volunteer</Link>
            <Link href="#" className='text-lg text-white'>Initiatives</Link>
        </div>
        <div className='flex flex-col space-y-8'>
            <Link href="/collect" className='text-lg text-white'>Digital Collectibles</Link>
            <Link href="/animals/red_wolf" className='text-lg text-white'>Red Wolf</Link>
            <Link href="/animals/nubian_giraffe" className='text-lg text-white'>Nubian Giraffe</Link>
            <Link href="/animals/amur_leopard" className='text-lg text-white'>Amur Leopard</Link>
            <Link href="/animals/sumatran_elephant" className='text-lg text-white'>Sumatran Elephant</Link>
        </div>
        <div className='flex flex-col space-y-8'>
            <Link href="/animals/javen_rhino" className='text-lg text-white'>Javan Rhino</Link>
            <Link href="/animals/pygmy_hippo" className='text-lg text-white'>Pygmy Hippo </Link>
            <Link href="/animals/siberian_tiger" className='text-lg text-white'>Siberian Tiger</Link>
        </div>
        <div className='flex flex-col space-y-8'>
            <Link href="/terms" className='text-lg text-white'>Terms of Use</Link>
            <Link href="https://zoolabs.io" className='text-md text-white'>zoolabs.io</Link>
            <p className='text-md text-white'>hello@zoo.ngo</p>
        </div>
      </div>
    </div>
    <div className='bg-black hidden max-md:block'>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-xl text-white'>ZOO LABS</p>
        <div className='flex items-center pt-8 space-x-16'>
          <Link href="/" className='text-lg text-white'>Home</Link>
          <Link href="/about" className='text-lg text-white'>About</Link>
          <Link href="/getinvolved" className='text-lg text-white'>Get Involved</Link>
        </div>
        <div className='flex items-center pt-6 space-x-16'>
          <Link href="/collect" className='text-lg text-white'>Collect</Link>
            <Link href="/donation" className='text-lg text-white'>Donate</Link>
        </div>
        <div className='flex items-center space-x-2 text-white pt-10'>
                <Link href="#"> <FaTwitter /> </Link>
                <Link href="#"> <FaTelegram /> </Link>
                <Link href="#"> <FaInstagram /> </Link>
                <Link href="#"> <FaDiscord /> </Link>
                <Link href="#"> <BsMedium /> </Link>
                <Link href="#"> <FaYoutube /> </Link>
        </div>
        <hr className='w-full bg-white my-4'/>
        <div className='flex items-center space-x-16'>
          <Link href="#" className='text-lg text-white '>Privacy Policy</Link>
            <Link href="/terms" className='text-lg text-white'>Term of service</Link>
        </div>
        <p className='text-lg text-white pt-6 pb-16'>© 2023 Zoo Labs Foundation</p>
      </div>
    </div>
    </div>
  );
}

export default Footer;
