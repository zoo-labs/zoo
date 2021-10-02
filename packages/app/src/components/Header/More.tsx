import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

import ThemeSwitcher from 'components/SideMenu/components/ThemeSwitcher'
import { MENU_ENTRY_HEIGHT } from 'components/SideMenu/config'
import useTheme from 'hooks/useTheme'
import { InfoIcon } from 'components/Svg'
import { GrCode } from 'react-icons/gr'
import { RiChat1Fill, RiChat1Line, RiCodeLine, RiLogoutBoxLine, RiLogoutCircleLine, RiPieChart2Line } from 'react-icons/ri'
import { GiPieChart } from 'react-icons/gi'
import { MoonIcon, SunIcon } from 'components/SideMenu/icons'
import useAuth from 'hooks/useAuth'
import Toggle from '../NewToggle'
import { useAnimationModeManager, useIsAnimationMode } from 'state/user/hooks'

export default function More({}) {
  const { isDark, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const [animationMode, toggleSetAnimationMode] = useAnimationModeManager()
  return (
    <Popover className='relative m-0 p-0'>
      {({ open }) => (
        <>
          <Popover.Button
            className={`${open ? 'text-primary' : 'text-secondary'} focus:outline-none hover:text-high-emphesis flex flex-nowrap rounded-xl bg-secondary hover:bg-gray-800`}
            style={{ padding: '10px', color: 'white' }}>
            <svg width='16px' height='16px' className='inline-flex items-center w-5 h-5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'>
            <Popover.Panel static className='absolute z-50  w-max px-2 mt-3 transform -translate-x-full bottom-12 top-12 left-full sm:px-0'>
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative grid gap-6 px-6 py-6 bg-gray-900 sm:gap-8 sm:p-8' style={{ backgroundColor: 'rgb(25, 27, 31)' }}>
                  {/* {solutions.map((item) =>
                    item.external ? (
                      <ExternalLink key={item.name} href={item.href} className='block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-dark-800'>
                        <p className='text-base font-medium text-high-emphesis'>{item.name}</p>
                        <p className='mt-1 text-sm text-secondary'>{item.description}</p>
                      </ExternalLink>
                    ) : (
                      <NavLink key={item.name} href={item.href}>
                        <a className='block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-dark-800'>
                          <p className='text-base font-medium text-high-emphesis'>{item.name}</p>
                          <p className='mt-1 text-sm text-secondary'>{item.description}</p>
                        </a>
                      </NavLink>
                    ),
                  )} */}

                  <div
                    className='flex items-center justify-between -m-3 transition duration-150 text-gray-500 ease-in-out rounded-md hover:text-white cursor-pointer'
                    style={{}}
                    onClick={() => window.open('https://t.me/Zoolabs')}>
                    About
                    <div className='ml-4 sm:ml-14'>
                      <InfoIcon fill='gray' />
                    </div>
                  </div>
                  <div
                    className='flex items-center justify-between -m-3 transition duration-150 text-gray-500 ease-in-out rounded-md hover:text-white cursor-pointer'
                    style={{}}
                    onClick={() => window.open('https://charts.bogged.finance/0x09E2b83Fe5485a7c8BeAa5DffD1D324A2B2D5c13')}>
                    Analytics
                    <div className='ml-4 sm:ml-14'>
                      <RiPieChart2Line fill='gray' />
                    </div>
                  </div>
                  <div className='flex items-center justify-between -m-3 transition duration-150 text-gray-500 ease-in-out rounded-md hover:text-white cursor-pointer' style={{}}>
                    Animation
                    <div className='ml-4 sm:ml-14'>
                      <Toggle id='toggle-disable-multihop-button' isActive={animationMode} toggle={() => toggleSetAnimationMode()} />
                    </div>
                  </div>
                  <div
                    className='flex items-center justify-between -m-3 transition duration-150 text-gray-500 ease-in-out rounded-md hover:text-white cursor-pointer'
                    style={{}}
                    onClick={() => window.open('https://github.com/zoo-labs')}>
                    Code
                    <div className='ml-4 sm:ml-14'>
                      <RiCodeLine fill='gray' />
                    </div>
                  </div>
                  <div
                    className='flex items-center justify-between -m-3 transition duration-150 text-gray-500 ease-in-out rounded-md hover:text-white cursor-pointer'
                    style={{}}
                    onClick={() => window.open('https://discord.com/channels/@me/878753766248177685/880493331010945095')}>
                    Discord
                    <div className='ml-4 sm:ml-14'>
                      <RiChat1Line fill='gray' />
                    </div>
                  </div>
                  {/* <div
                    onClick={() => toggleTheme()}
                    className='flex items-center justify-between -m-3 transition duration-150 text-gray-500 ease-in-out rounded-md hover:text-white cursor-pointer'
                    style={{}}>
                    Theme
                    <div className='ml-4 sm:ml-14'>
                      {isDark ? <SunIcon fill={isDark ? 'white' : 'text'} width='18px' /> : <MoonIcon fill={isDark ? 'white' : 'textDisabled'} width='18px' />}
                    </div>
                  </div> */}
                  <div
                    onClick={() => logout()}
                    className='flex items-center justify-between -m-3 transition duration-150 text-gray-500 ease-in-out rounded-md hover:text-white cursor-pointer'
                    style={{}}>
                    Log Out
                    <div className='ml-4 sm:ml-14'>
                      <RiLogoutCircleLine fill='gray' />
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
