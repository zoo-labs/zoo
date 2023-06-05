import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Learn() {
  return (
    <div className="relative flex flex-col justify-center text-right px-2 md:px-0">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full mb-4 text-base text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 md:mb-0">
            Learn
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
          <Menu.Items className="absolute right-0 flex min-w-[224px] max-w-max mt-2 origin-top-right divide-gray-100 rounded-md shadow-lg bg-black100 ring-1 ring-black ring-opacity-5 focus:outline-none z-999">
            <div className="px-2 py-2 lg:py-6">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/animal-list"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } hover:bg-black group flex rounded-md items-center w-full min-w-max px-2 py-2 text-sm`}>
                    
                      Our Animals
                    
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="https://zoolabs.gitbook.io/whitepaper"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    
                      Whitepaper
                    
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://prezi.com/i/view/fWOPqU2eZzcqYyVzb5pz"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Buy Guide
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/about"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    
                      About
                    
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/reward-calculator"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm min-w-max`}>
                    
                      Reward Calculator
                    
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-2 py-2 lg:py-6">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://zoolabsofficial.medium.com/"
                    target={"_blank"}
                    rel="noopener noreferrer"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Blog
                  </a>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href="/guides"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Guides
                  </a>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/faqs"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                    
                      FAQs
                    
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/partnerships"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm min-w-max`}>
                    
                      Zoo Foundation
                    
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/dao"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    DAO
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
