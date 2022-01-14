import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function Learn() {
  return (
    <div className="text-right relative flex flex-col justify-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full px-2 text-base font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-4 lg:mb-0">
            Learn
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
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
          <Menu.Items className="flex absolute right-0 w-56 mt-2 origin-top-right bg-black100  divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-999">
            <div className="px-2 py-2 lg:py-6">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/animal-list"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Our Animals
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://zoolabs.gitbook.io/whitepaper/introduction/introduction"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Whitepaper
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/#about"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    About
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="px-2 py-2 lg:py-6">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/blog"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Blog
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
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
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/#faqs"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    FAQs
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/partnerships"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Partnerships
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
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
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
