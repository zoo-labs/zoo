import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Community() {
  return (
    <div className="text-right relative flex flex-col justify-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full px-2 text-base font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-4 md:mb-0">
            Community
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
          <Menu.Items className="flex absolute right-0 w-56 mt-2 origin-top-right bg-black100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-999">
            <div className="px-2 py-2 lg:py-6">
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href="/global-leaderboard"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Leaderboard
                  </a>
                )}
              </Menu.Item> */}
              {/* <Menu.Item>
                {({ active }) => (
                  <Link href="/#newsletter">
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Newsletter
                    </a>
                  </Link>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {({ active }) => (
                  <Link href="/lab-events">
                    <a
                      className={`${
                        active ? "bg-black text-white" : "text-white"
                      } hover:bg-black group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Events
                    </a>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-2 py-2 lg:py-6 ">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://discord.com/invite/43m9Sstd"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Discord
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://t.me/RealZoolabs"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Telegram
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://instagram.com/zoolabs.io?utm_medium=copy_link"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Instagram
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://mobile.twitter.com/zoo_labs"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Twitter
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://zoolabsofficial.medium.com/"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-black text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Medium
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
