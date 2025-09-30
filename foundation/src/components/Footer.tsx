import Link from 'next/link';
import {FaTelegram, FaTwitter, FaInstagram, FaDiscord, FaYoutube} from "react-icons/fa";
import {BsMedium} from "react-icons/bs"
function Footer() {
  const recipientEmail = "hello@zoo.ngo";
  const subject = "Sending Love to ZOO NGO team";
  const sendEmail = () => {
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  };
  return (
    <div>
    <div className="bg-black pb-32 max-md:hidden">
        <hr />
      <div className='grid md:grid-cols-5 grid-cols-1 gap-8 2xl:px-56 xl:px-42 lg:px-28 md:px-16 max-md:px-4 pt-20'>
        <div className='flex flex-col space-y-8'>
            <p className='text-sm lg:text-lg text-white'>Zoo Labs Foundation</p>
            <p className='text-sm lg:text-md text-white'>All rights reserved. © 2025 Zoo Labs Foundation Inc. EIN: 88-3538992 - Registered 501(c)(3) Charity. Donations are tax-deductible to the extent allowed by law.</p>
            <div className='flex items-center space-x-2 text-white'>
                <Link href="https://twitter.com/zoo_labs" className="cursor-pointer hover:text-gray-300 transition-colors"><FaTwitter /></Link>
                <Link href="https://t.me/zooofficial" className="cursor-pointer hover:text-gray-300 transition-colors"><FaTelegram /></Link>
                <Link href="https://instagram.com/zoolabs.io" className="cursor-pointer hover:text-gray-300 transition-colors"><FaInstagram /></Link>
                <Link href="https://discord.gg/AqrYhChx5b" className="cursor-pointer hover:text-gray-300 transition-colors"><FaDiscord /></Link>
                <Link href="https://zoolabsofficial.medium.com" className="cursor-pointer hover:text-gray-300 transition-colors"><BsMedium /></Link>
                <Link href="https://youtu.be/6yYuYtMWgOU" className="cursor-pointer hover:text-gray-300 transition-colors"><FaYoutube /></Link>
            </div>
        </div>
        <div className='flex flex-col space-y-8'>
            <Link href="/about" className='text-sm lg:text-lg text-white'>About</Link>
            <Link href="/getinvolved" className='text-sm lg:text-lg text-white'>Get Involved</Link>
            <Link href="/donation" className='text-sm lg:text-lg text-white'>Donate</Link>
            <Link href="/getinvolved#volunteer" className='text-sm lg:text-lg text-white'>Volunteer</Link>
            <Link href="/getinvolved#volunteer" className='text-sm lg:text-lg text-white'>Initiatives</Link>
        </div>
        <div className='flex flex-col space-y-8'>
            {/* <Link href="/campaign" className='text-sm lg:text-lg text-white'>Campaign</Link> */}
            <Link href="/experiences" className='text-sm lg:text-lg text-white'>Wildlife Experiences</Link>
            <Link href="/animals/red_wolf"  className='text-sm lg:text-lg text-white'>Red Wolf</Link>
            <Link href="/animals/nubian_giraffe" className='text-sm lg:text-lg text-white'>Nubian Giraffe</Link>
            <Link href="/animals/amur_leopard" className='text-sm lg:text-lg text-white'>Amur Leopard</Link>

        </div>
        <div className='flex flex-col space-y-8'>
        <Link href="/animals/sumatran_elephant" className='text-sm lg:text-lg text-white'>Sumatran Elephant</Link>
            <Link href="/animals/javan_rhino" className='text-sm lg:text-lg text-white'>Javan Rhino</Link>
            <Link href="/animals/pygmy_hippo" className='text-sm lg:text-lg text-white'>Pygmy Hippo</Link>
            <Link href="/animals/siberian_tiger" className='text-sm lg:text-lg text-white'>Siberian Tiger</Link>
        </div>
        <div className='flex flex-col space-y-8'>
            <Link href="/terms" className='text-sm lg:text-lg text-white'>Terms of Use</Link>
            <Link href="/terms-refund" className='text-sm lg:text-lg text-white'>Terms of Refund</Link>
            <Link href="https://zoolabs.io" className='text-lg lg:text-md text-white'>Zoo Labs</Link>
            <p className='text-sm lg:text-lg text-white'>hello@zoo.ngo</p>
        </div>
      </div>
    </div>
    <div className='bg-black hidden max-md:block'>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-xl text-white'>Zoo Labs Foundation</p>
        <div className='flex items-center pt-8 space-x-8'>
          <Link href="/" className='text-lg text-white'>Home</Link>
          <Link href="/about" className='text-lg text-white'>About</Link>
          {/* <Link href="/campaign" className='text-lg text-white'>Campaign</Link> */}

        </div>
        <div className='flex items-center pt-6 space-x-8'>
            <Link href="/getinvolved" className='text-lg text-white'>Get Involved</Link>
            <Link href="/animals" className='text-lg text-white'>Animals</Link>
            <Link href="/donation" className='text-lg text-white'>Donate</Link>
        </div>
        <div className='flex items-center space-x-2 text-white pt-10'>
          <Link href="https://twitter.com/zoo_labs" className="cursor-pointer hover:text-gray-300 transition-colors"><FaTwitter /></Link>
          <Link href="https://t.me/zooofficial" className="cursor-pointer hover:text-gray-300 transition-colors"><FaTelegram /></Link>
          <Link href="https://instagram.com/zoolabs.io" className="cursor-pointer hover:text-gray-300 transition-colors"><FaInstagram /></Link>
          <Link href="https://discord.gg/AqrYhChx5b" className="cursor-pointer hover:text-gray-300 transition-colors"><FaDiscord /></Link>
          <Link href="https://zoolabsofficial.medium.com" className="cursor-pointer hover:text-gray-300 transition-colors"><BsMedium /></Link>
          <Link href="https://youtu.be/6yYuYtMWgOU" className="cursor-pointer hover:text-gray-300 transition-colors"><FaYoutube /></Link>
        </div>
        <hr className='w-full bg-white my-4'/>
        <div className='flex items-center space-x-16'>
          <Link href="/privacy" className='text-lg text-white '>Privacy Policy</Link>
          <Link href="/terms" className='text-lg text-white'>Terms of service</Link>
          <Link href="/terms-refund" className='text-lg text-white'>Terms of Refund</Link>
        </div>
        <p className='text-lg text-white pt-6 pb-16'>© 2025 Zoo Labs Foundation Inc. EIN: 88-3538992 - Registered 501(c)(3) Charity. Donations are tax-deductible to the extent allowed by law.</p>
      </div>
    </div>
    </div>
  );
}

export default Footer;
