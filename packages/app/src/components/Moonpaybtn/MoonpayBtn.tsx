import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

import axios from "axios";

const MoonPayBtn = () => {
  const [IsActive, setIsActive] = useState(false);
  useEffect(() => {
    return () => {};
  }, [IsActive]);
  const handleOnClick = () => {
    setIsActive(!IsActive);
  };

  const handleSubmit = () => {
    // axios
    //   .post("/api/moonpay", {
    //     addres: address,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  return (
    <div className="text-right relative flex flex-col justify-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full px-2 text-base font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-4 md:mb-0">
            BuyBNB
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
          <Menu.Items className="flex absolute right-0 w-64 h-[400px] mt-2 origin-top-right bg-black100  divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-999">
            <div className="px-2 py-2 lg:py-6">
              <Menu.Item>
                {({ active }) => (
                  <iframe
                    allow="accelerometer; autoplay; camera; gyroscope; payment"
                    height="100%"
                    src="https://buy-staging.moonpay.io?apiKey=pk_test_123"
                    width="100%"
                  >
                    <p>Your browser does not support iframes.</p>
                  </iframe>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MoonPayBtn;
