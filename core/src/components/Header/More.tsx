import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useGif } from "context/GifContext";
import { toggleImage, toggleGif } from "context/GifContext";
import Link from "next/link";
import { useTheme } from 'next-themes'
import ExternalLink from "../ExternalLink";
import { I18n } from "@lingui/core";
import Image from "next/image";
import { classNames } from "../../functions/styling";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import NavLink from "../NavLink";
import Toggle from "../Toggle";
import { useAnimationModeManager } from "../../state/user/hooks";
import MoonPayBtn from "components/Moonpaybtn/MoonpayBtn";

const items = (i18n: I18n) => [
  {
    name: i18n._(t`About`),
    description: i18n._(t`Documentation for users of Sushi.`),
    href: "https://docs.sushi.com",
    external: true,
  },
  {
    name: i18n._(t`Dev`),
    description: i18n._(t`Documentation for developers of Sushi.`),
    href: "https://dev.sushi.com",
    external: true,
  },
  {
    name: i18n._(t`Open Source`),
    description: i18n._(t`Sushi is a supporter of Open Source.`),
    href: "https://github.com/sushiswap",
    external: true,
  },
  {
    name: i18n._(t`Tools`),
    description: i18n._(t`Tools to optimize your workflow.`),
    href: "/tools",
    external: false,
  },
  {
    name: i18n._(t`Discord`),
    description: i18n._(t`Join the community on Discord.`),
    href: "https://discord.gg/KsXtbu5g",
    external: true,
  },
  {
    name: i18n._(t`Vesting`),
    description: i18n._(t`Weekly unlocks from the vesting period.`),
    href: "/vesting",
    external: false,
  },
];

export default function Menu() {
  const { i18n } = useLingui();
  const solutions = items(i18n);
  const [animationMode, toggleSetAnimationMode] = useAnimationModeManager();
  const { theme, setTheme } = useTheme()
  const { state, dispatch } = useGif();

  const toggleGifMode = () => {
    if (state.gifMode === "gif") {
      toggleImage(dispatch);
    } else {
      toggleGif(dispatch);
    }
  };

  const handleToggleImage = () => {
    toggleImage(dispatch);
  };

  return (
    <Popover className="relative ml-auto md:m-0">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              `text-${theme=='dark' ? "white" : "black"}`,
              "focus:outline-none hover:opacity-70"
            )}
          >
            <svg
              width="16px"
              height="16px"
              className="inline-flex items-center w-5 h-5 ml-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-50 w-screen max-w-xs px-2 mt-3 transform -translate-x-full bottom-12 lg:top-12 left-full sm:px-0"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className={`relative grid gap-6 px-5 py-6 bg-${theme=='dark' ? "dark-900" : "light-100"} sm:gap-8 sm:p-8`}>
                  <div className={`flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-${theme==='dark' ? "white" : "black"}`}>
                    {state.gifMode === "gif" ? "3D" : "Gif"} Mode
                    <div className="ml-4 sm:ml-14">
                      <Toggle
                        id="toggle-disable-multihop-button"
                        isActive={state.gifMode === "gif"}
                        toggle={() => toggleGifMode()}
                      />
                    </div>
                  </div>
                  <Link
                    href="/wallet"
                    className={`flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-${theme=='dark' ? "white" : "black"}`}
                    legacyBehavior>
                    Wallet<div className="ml-4 sm:ml-14">                        <svg
                        width="31"
                        height="30"
                        viewBox="0 0 31 30"
                        className="w-5 h-5"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.2326 8.84315H6.07012V8.11665L22.0531 6.83801V8.11665H24.2326V5.93715C24.2326 4.33885 22.938 3.21713 21.3571 3.44235L6.76756 5.52595C5.18525 5.75262 3.89062 7.24485 3.89062 8.84315V23.3731C3.89063 24.1439 4.19679 24.883 4.74177 25.428C5.28675 25.973 6.02591 26.2791 6.79662 26.2791H24.2326C25.0033 26.2791 25.7425 25.973 26.2875 25.428C26.8325 24.883 27.1386 24.1439 27.1386 23.3731V11.7491C27.1386 10.9784 26.8325 10.2393 26.2875 9.6943C25.7425 9.14932 25.0033 8.84315 24.2326 8.84315V8.84315ZM22.0531 19.0229C21.7668 19.0228 21.4833 18.9663 21.2188 18.8566C20.9544 18.747 20.7141 18.5863 20.5117 18.3838C20.3093 18.1813 20.1488 17.9409 20.0393 17.6763C19.9298 17.4118 19.8735 17.1282 19.8736 16.8419C19.8737 16.5556 19.9302 16.2721 20.0399 16.0076C20.1495 15.7432 20.3102 15.5029 20.5127 15.3005C20.7152 15.0981 20.9556 14.9376 21.2202 14.8281C21.4847 14.7186 21.7683 14.6623 22.0546 14.6624C22.6328 14.6626 23.1873 14.8925 23.596 15.3015C24.0048 15.7105 24.2343 16.2651 24.2341 16.8434C24.2339 17.4216 24.004 17.9761 23.595 18.3848C23.186 18.7935 22.6314 19.0231 22.0531 19.0229Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>

                  </Link>

                  <div
                    className={`flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-${theme=='dark' ? "white" : "black"}`}
                    onClick={() =>
                      window.open(
                        "https://charts.bogged.finance/0x09E2b83Fe5485a7c8BeAa5DffD1D324A2B2D5c13"
                      )
                    }
                  >
                    Analytics
                    <div className="ml-4 sm:ml-14">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                    </div>
                  </div>
                  {/* <div
                    className="flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-white"
                  >
                    Animation
                    <div className="ml-4 sm:ml-14">
                      <Toggle
                        id="toggle-disable-multihop-button"
                        isActive={animationMode}
                        toggle={() => toggleSetAnimationMode()}
                      />
                    </div>
                  </div> */}
                  <div
                    className={`flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-${theme=='dark' ? "white" : "black"}`}
                    onClick={() => window.open("https://github.com/zoo-labs")}
                  >
                    Code
                    <div className="ml-4 sm:ml-14">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-${theme=='dark' ? "white" : "black"}`}
                    onClick={() =>
                      window.open(
                        "https://discord.com/channels/@me/878753766248177685/880493331010945095"
                      )
                    }
                  >
                    Discord
                    <div className="ml-4 sm:ml-14">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-${theme=='dark' ? "white" : "black"}`}
                    onClick={() =>
                      window.open(
                        "https://dex.guru/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13-bsc"
                      )
                    }
                  >
                    Chart
                    <div className="ml-4 sm:ml-14">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                  </div>
                  {/* <div
                    className="flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-white"
                  >

                  </div> */}
                  {/* <div
                    onClick={() => toggleTheme()}
                    className='flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-white'
                    Theme
                    <div className='ml-4 sm:ml-14'>
                      {isDark ? <SunIcon fill={isDark ? 'white' : 'text'} width='18px' /> : <MoonIcon fill={isDark ? 'white' : 'textDisabled'} width='18px' />}
                    </div>
                  </div> */}
                  {/* <div
                    onClick={() => logout}
                    className='flex items-center justify-between -m-3 text-gray-500 transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-white'
                    Log Out
                    <div className='ml-4 sm:ml-14'>
                      <RiLogoutCircleLine fill='gray' />
                    </div>
                  </div> */}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
