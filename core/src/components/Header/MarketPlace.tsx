import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Marketplace() {
  return (
    <div className="relative flex flex-col justify-center px-2 text-right md:px-0">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full mb-4 text-base text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 md:mb-0">
            Marketplace
            <ChevronDownIcon
              className="w-5 h-5 ml-1 -mr-1 mt-[3px] text-white-200 hover:text-white-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 flex w-56 mt-2 origin-top-right rounded-md shadow-lg bg-black100 ring-1 ring-black ring-opacity-5 focus:outline-none z-999">
            <div className="px-2 py-2 lg:py-6 ">
              {/* <Menu.Item>
                {({ active }) => (
                  <Link href="/drop" passHref>
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:text-green group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Egg Drop
                    </a>
                  </Link>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {({ active }) => (
                  <Link href="/market" passHref>
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:text-green group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      All NFTs
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="/coming-soon" passHref>
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:text-green group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Pools
                    </a>
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
