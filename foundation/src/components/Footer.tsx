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
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">
      <div className="max-md:hidden pb-16">
        <div className='grid md:grid-cols-5 grid-cols-1 gap-8 2xl:px-56 xl:px-42 lg:px-28 md:px-16 max-md:px-4 pt-16'>
          <div className='flex flex-col space-y-4'>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className='text-lg font-bold text-gray-900'>Zoo Labs Foundation</span>
            </div>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Non-profit 501(c)(3) research foundation dedicated to wildlife biodiversity, open-access conservation science, bioacoustics, and benevolent ecological AI.
            </p>
            <p className='text-xs text-gray-500'>
              EIN: 88-3538992. Donations are tax-deductible to the extent allowed by law.
            </p>
            <div className='flex items-center space-x-3 text-gray-600 pt-2'>
              <Link href="https://twitter.com/zoo_labs" className="cursor-pointer hover:text-emerald-600 transition-colors"><FaTwitter size={18} /></Link>
              <Link href="https://t.me/zooofficial" className="cursor-pointer hover:text-emerald-600 transition-colors"><FaTelegram size={18} /></Link>
              <Link href="https://instagram.com/zoolabs.io" className="cursor-pointer hover:text-emerald-600 transition-colors"><FaInstagram size={18} /></Link>
              <Link href="https://discord.gg/AqrYhChx5b" className="cursor-pointer hover:text-emerald-600 transition-colors"><FaDiscord size={18} /></Link>
              <Link href="https://zoolabsofficial.medium.com" className="cursor-pointer hover:text-emerald-600 transition-colors"><BsMedium size={18} /></Link>
              <Link href="https://youtu.be/6yYuYtMWgOU" className="cursor-pointer hover:text-emerald-600 transition-colors"><FaYoutube size={18} /></Link>
            </div>
          </div>
          <div className='flex flex-col space-y-3'>
            <p className='text-sm font-semibold uppercase tracking-wider text-gray-900'>Organization</p>
            <Link href="/about" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>About Us</Link>
            <Link href="/research" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Research & Science</Link>
            <Link href="/ai" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>ZenLM AI</Link>
            <Link href="/getinvolved" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Get Involved</Link>
            <Link href="/donation" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Donate</Link>
            <Link href="/healing-farm" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Healing Farm</Link>
          </div>
          <div className='flex flex-col space-y-3'>
            <p className='text-sm font-semibold uppercase tracking-wider text-gray-900'>Endangered Species</p>
            <Link href="/animals" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>All Species (3D)</Link>
            <Link href="/animals/red_wolf" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Red Wolf</Link>
            <Link href="/animals/nubian_giraffe" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Nubian Giraffe</Link>
            <Link href="/animals/amur_leopard" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Amur Leopard</Link>
            <Link href="/experiences" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Wildlife Expeditions</Link>
          </div>
          <div className='flex flex-col space-y-3'>
            <p className='text-sm font-semibold uppercase tracking-wider text-gray-900'>Species Focus</p>
            <Link href="/animals/sumatran_elephant" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Sumatran Elephant</Link>
            <Link href="/animals/javan_rhino" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Javan Rhino</Link>
            <Link href="/animals/pygmy_hippo" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Pygmy Hippo</Link>
            <Link href="/animals/siberian_tiger" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Siberian Tiger</Link>
          </div>
          <div className='flex flex-col space-y-3'>
            <p className='text-sm font-semibold uppercase tracking-wider text-gray-900'>Ecosystem</p>
            <Link href="https://zoolabs.io" className='text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors'>
              🔬 Zoo Labs (AI & Bioacoustics) ↗
            </Link>
            <Link href="https://zoo.fund" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Zoo Fund (DeSci Grants)</Link>
            <Link href="https://hanzo.ai" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Hanzo AI (Compute & Infrastructure)</Link>
            <Link href="/transparency" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Financial Transparency</Link>
            <Link href="/terms" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Terms of Use</Link>
            <Link href="/terms-refund" className='text-sm text-gray-600 hover:text-emerald-600 transition-colors'>Terms of Refund</Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 2xl:px-56 xl:px-42 lg:px-28 md:px-16 flex justify-between items-center text-xs text-gray-500">
          <p>© 2026 Zoo Labs Foundation Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-800">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-800">Terms of Service</Link>
            <a href="mailto:hello@zoo.ngo" className="hover:text-gray-800">Contact: hello@zoo.ngo</a>
          </div>
        </div>
      </div>

      <div className='hidden max-md:block px-6 py-12'>
        <div className='flex flex-col items-center text-center'>
          <p className='text-xl font-bold text-gray-900'>🌿 Zoo Labs Foundation</p>
          <p className='text-xs text-gray-600 mt-2'>Registered 501(c)(3) Charity. EIN: 88-3538992</p>
          <div className='flex flex-wrap justify-center gap-4 pt-6 text-sm text-gray-700'>
            <Link href="/" className='hover:text-emerald-600'>Home</Link>
            <Link href="/about" className='hover:text-emerald-600'>About</Link>
            <Link href="/research" className='hover:text-emerald-600'>Research</Link>
            <Link href="/animals" className='hover:text-emerald-600'>Animals</Link>
            <Link href="/experiences" className='hover:text-emerald-600'>Experiences</Link>
            <Link href="/donation" className='text-emerald-600 font-semibold'>Donate</Link>
            <Link href="https://zoolabs.io" className='text-blue-600 font-medium'>🔬 Labs ↗</Link>
          </div>
          <div className='flex items-center space-x-4 text-gray-600 pt-6'>
            <Link href="https://twitter.com/zoo_labs"><FaTwitter size={18} /></Link>
            <Link href="https://t.me/zooofficial"><FaTelegram size={18} /></Link>
            <Link href="https://instagram.com/zoolabs.io"><FaInstagram size={18} /></Link>
            <Link href="https://discord.gg/AqrYhChx5b"><FaDiscord size={18} /></Link>
            <Link href="https://youtu.be/6yYuYtMWgOU"><FaYoutube size={18} /></Link>
          </div>
          <hr className='w-full border-gray-200 my-6'/>
          <p className='text-xs text-gray-500'>© 2026 Zoo Labs Foundation Inc. Donations are tax-deductible.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
