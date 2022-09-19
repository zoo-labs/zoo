import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Learn() {
  return (
    <div className="relative flex flex-col justify-center text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full px-2 mb-4 text-base font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 md:mb-0">
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
          <Menu.Items className="absolute right-0 flex w-56 mt-2 origin-top-right divide-gray-100 rounded-md shadow-lg bg-black100 ring-1 ring-black ring-opacity-5 focus:outline-none z-999">
            <div className="px-2 py-2 lg:py-6">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/animal-list">
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Our Animals
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="https://zoolabs.gitbook.io/whitepaper">
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Whitepaper
                    </a>
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
                  <Link href="/about">
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      About
                    </a>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-2 py-2 lg:py-6">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/blog" passHref>
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Blog
                    </a>
                  </Link>
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
                  <Link href="/faqs">
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      FAQs
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="/partnerships">
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Partnerships{" "}
                    </a>
                  </Link>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href="/press"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Press
                  </a>
                )}
              </Menu.Item> */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
