import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Link from "next/link";
import { classNames } from "../../functions/styling";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import {
  AVAILABLE_NETWORKS,
  DEFAULT_METAMASK_CHAIN_ID,
  NETWORK_ICON,
  NETWORK_LABEL,
  SUPPORTED_NETWORKS,
} from "config/networks";
import Image from "next/image";
import cookie from "cookie-cutter";

export default function NetworkPopup({ userEthBalance, NATIVE }) {
  const { chainId, library, account } = useActiveWeb3React();

  if (!chainId) return null;
  return (
    <Popover className="relative ml-auto cursor-pointer md:m-0">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-high-emphesis" : "text-white",
              "py-2 pl-1 mr-2 font-semibold cursor-pointer"
            )}
          >
            {userEthBalance?.toFixed(3)} {NATIVE[chainId]?.symbol || "ETH"}
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
                <div className="relative grid gap-6 px-5 py-6 bg-dark-900 sm:gap-8 sm:p-8">
                  {AVAILABLE_NETWORKS.map((key: number, i: number) => {
                    if (chainId === key) {
                      return (
                        <button
                          key={i}
                          className="flex items-center -m-3 hover:text-gray-500 transition duration-150 ease-in-out  cursor-pointer text-white py-3 px-4 border-b border-[#484C53] relative"
                        >
                          <Image
                            src={NETWORK_ICON[key]}
                            alt={`Switch to ${NETWORK_LABEL[key]} Network`}
                            className="rounded-full"
                            width="32px"
                            height="32px"
                          />

                          <p className="ml-4 text-lg font-semibold">
                            {NETWORK_LABEL[key]}
                          </p>
                          <div className="absolute w-2 h-2 rounded-full bg-green right-4 inset-y-6" />
                        </button>
                      );
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          const params = SUPPORTED_NETWORKS[key];
                          cookie.set("chainId", key);

                          if (DEFAULT_METAMASK_CHAIN_ID.includes(key)) {
                            library?.send("wallet_switchEthereumChain", [
                              { chainId: params.chainId },
                              account,
                            ]);
                          } else {
                            library?.send("wallet_addEthereumChain", [
                              params,
                              account,
                            ]);
                          }
                        }}
                        className="flex items-center -m-3 hover:text-gray-500 transition duration-150 ease-in-out  cursor-pointer text-white py-3 px-4 border-b border-[#484C53]"
                      >
                        <Image
                          src={NETWORK_ICON[key]}
                          alt="Switch Network"
                          className="rounded-full"
                          width="32px"
                          height="32px"
                        />
                        <div className="ml-4 text-lg font-medium">
                          {NETWORK_LABEL[key]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
