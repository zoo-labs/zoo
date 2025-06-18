import React, { useState } from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { FaCheckCircle, FaCircle, FaRegQuestionCircle } from "react-icons/fa";
import Switch from "react-switch";
import axios from "axios";
import { useStripe } from '@stripe/react-stripe-js'
import { fetchPostJSON, fetchGetJSON } from '../../utils/api_helpers'
function Header() {
  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)'
    },
  }));
    const [checked, setChecked] = useState(false);
    const [amount, setAmount] = useState("$20");
    const stripe = useStripe();
    const handleChange = (e:boolean) => {
        setChecked(e);
    };
    const handleInputChange = (e:any) => {
      const input = e.target.value
      e.target.value = prefix + input.substr(prefix.length)
      setAmount(e.target.value);
    }
    const handleSubmit = async () => {
      if(amount == null || amount == "$")return;
      if(!checked) {
        const response = await fetchPostJSON('/api/checkout_sessions', {
          amount: Number(amount.replace('$','')),
        })
    
        if (response.statusCode === 500) {
          console.error(response.message)
          return
        }
    
        // Redirect to Checkout.
        const { error } = await stripe!.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.id,
        })
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message)
      }else {
        
        // const session_id  = await fetch(`/api/subscription/${price.id}`).then(res => res.id);
        const { data } = await axios.get(`/api/subscription/${amount}`);
        // console.log(session_id);
        await stripe!.redirectToCheckout({ sessionId: data.id });
      }
    };
    const prefix = '$';
  return (
    <div className="bg-black max-md:pt-20">
      <div className='flex max-md:flex-col items-center justify-between pt-20'>
        <div className='w-1/2 max-md:w-full max-md:px-8 flex flex-col 2xl:pl-52 xl:pl-36 lg:pl-28 md:pl-16 pr-8 lg:pb-32'>
            <p className='text-lg text-white pb-8'>End the road to extinction</p>
            <h1 className='text-white md:text-3xl lg:text-5xl xl:text-7xl max-md:text-3xl max-md:my-5 pb-9'>Donate to the Zoo Labs Foundation</h1>
            <p className='lg:text-lg md:text-md text-white pb-8'>&quot;It is our driving purpose to deepen the connection humans have with animals by creating sustainable animal sanctuaries for endangered species. Share the Zoo Sanctuary with local visitors, educators, host fundraisers/events, and get the Zoo Community as involved as possible to saving endandered animals all over the world. You could save a life todav w/ a monthlv donation or a one.-time contribution.
&quot;</p>
            <div className='lg:flex hidden items-baseline justify-between xl:space-x-16 space-x-8'>
                <div className='space-y-2'>
                  <div className='flex items-center border rounded-full border-white'>
                    <input onChange={handleInputChange} value={amount} className='w-full xl:pl-[88px] outline-none bg-transparent text-white text-center px-4 py-2 md:text-sm lg:text-md xl:text-lg' placeholder='Enter $' />
                    
                    <Switch className="border border-white rounded-full px-[2px]" offColor="#000" onColor="#000" uncheckedHandleIcon={<FaCircle size={40} className='absolute left-[1px] top-[1px]' />} checkedHandleIcon={<FaCheckCircle size={36} className='absolute left-[3px] top-[3px]' />} onChange={handleChange} height={44} width={88}  uncheckedIcon={false} checkedIcon={false} checked={checked} />
                    
                  </div>
                  <BootstrapTooltip title="If you choose the monthly option you will make a donation every month on the same date or the nearest date to the calendar date you make today. Your payment method will be charged the amount you type in now, if you wish to change the monthly amount you or discontinue donations send an email to hello@zoo.ngo." placement="top">
                    <p className='italic cursor-pointer text-xs leading-[0.5rem] float-right text-white pr-4'>Monthly&nbsp;&nbsp;<FaRegQuestionCircle /></p>
                  </BootstrapTooltip>
                </div>
                <div className='flex space-x-4'>
                  <button onClick={handleSubmit} className='min-w-[120px] h-[44px] rounded-full px-4 py-2 text-black bg-white border border-white hover:bg-gray-100 transition-colors md:text-sm lg:text-md xl:text-lg font-medium'>Donate Now</button>
                  <a href="https://www.paypal.biz/zoongo" target="_blank" rel="noopener noreferrer" className='min-w-[100px] h-[44px] rounded-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors md:text-sm lg:text-md xl:text-lg font-medium flex items-center justify-center'>PayPal</a>
                  <div className='relative group'>
                    <button className='min-w-[100px] h-[44px] rounded-full px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 transition-colors md:text-sm lg:text-md xl:text-lg font-medium'>Crypto</button>
                    <div className='absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
                      <div className='p-4 space-y-3'>
                        <div>
                          <p className='text-xs font-medium text-gray-700 mb-1'>Bitcoin (BTC):</p>
                          <button onClick={() => navigator.clipboard.writeText('3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk').then(() => alert('Bitcoin address copied!'))} className='text-xs text-gray-600 hover:text-gray-800 break-all'>3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk</button>
                        </div>
                        <div>
                          <p className='text-xs font-medium text-gray-700 mb-1'>Ethereum (ETH):</p>
                          <button onClick={() => navigator.clipboard.writeText('0xA59Ad3199E6fdd0046d259944d3d18ee379152CB').then(() => alert('Ethereum address copied!'))} className='text-xs text-gray-600 hover:text-gray-800 break-all'>0xA59Ad3199E6fdd0046d259944d3d18ee379152CB</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div className='md:w-1/2 xl:pr-32 pr-4 max-md:w-full'>
        
            {/* <Image
                className='intro-bg float-right'
                src='/images/donation_header.png'
                width='1000'
                height='1000'
                alt=''
            /> */}
            <video  autoPlay loop muted playsInline className="w-full float-right">
              <source src="/videos/pygmy_flower.mp4" type="video/mp4"/>
            </video>
        </div>
      </div>
      <div className='md:flex md:pl-16 max-md:flex space-x-4 max-md:px-4 lg:hidden w-2/3 max-md:w-full items-baseline justify-between md:pb-32'>
          
          <div className='space-y-2'>
            <div className='flex items-center border rounded-full border-white'>
              <input onChange={handleInputChange} value={amount} className='w-full sm:pl-[88px] outline-none bg-transparent text-white text-center px-4 py-2 md:text-sm lg:text-md xl:text-lg max-md:text-sm' placeholder='Enter $' />
              
              <Switch className="border border-white rounded-full px-[2px]" offColor="#000" onColor="#000" uncheckedHandleIcon={<FaCircle size={40} className='absolute left-[1px] top-[1px]' />} checkedHandleIcon={<FaCheckCircle size={40} className='absolute left-[1px] top-[1px]' />} onChange={handleChange} height={44} width={88}  uncheckedIcon={false} checkedIcon={false} checked={checked} />
              
            </div>
            <BootstrapTooltip title="If you choose the monthly option you will make a donation every month on the same date or the nearest date to the calendar date you make today. Your payment method will be charged the amount you type in now, if you wish to change the monthly amount you or discontinue donations send an email to hello@zoo.ngo." placement="top">
            <p className='italic cursor-pointer text-xs leading-[0.5rem] float-right text-white pr-4'>Monthly&nbsp;&nbsp;<FaRegQuestionCircle /></p>
            </BootstrapTooltip>
          </div>
          <div className='flex flex-col space-y-2 w-full'>
            <button onClick={handleSubmit} className='w-full h-[44px] rounded-full text-black bg-white px-4 py-2 max-md:text-xs md:text-sm border border-white hover:bg-gray-100 transition-colors font-medium'>Donate Now</button>
            <div className='flex space-x-2'>
              <a href="https://www.paypal.biz/zoongo" target="_blank" rel="noopener noreferrer" className='flex-1 h-[40px] rounded-full px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors text-xs font-medium flex items-center justify-center'>PayPal</a>
              <div className='relative group flex-1'>
                <button className='w-full h-[40px] rounded-full px-3 py-2 text-white bg-orange-500 hover:bg-orange-600 transition-colors text-xs font-medium'>Crypto</button>
                <div className='absolute top-full left-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
                  <div className='p-3 space-y-2'>
                    <div>
                      <p className='text-xs font-medium text-gray-700 mb-1'>Bitcoin (BTC):</p>
                      <button onClick={() => navigator.clipboard.writeText('3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk').then(() => alert('Bitcoin address copied!'))} className='text-xs text-gray-600 hover:text-gray-800 break-all'>3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk</button>
                    </div>
                    <div>
                      <p className='text-xs font-medium text-gray-700 mb-1'>Ethereum (ETH):</p>
                      <button onClick={() => navigator.clipboard.writeText('0xA59Ad3199E6fdd0046d259944d3d18ee379152CB').then(() => alert('Ethereum address copied!'))} className='text-xs text-gray-600 hover:text-gray-800 break-all'>0xA59Ad3199E6fdd0046d259944d3d18ee379152CB</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Header;
