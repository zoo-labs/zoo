import { ChainId, NATIVE } from "@zoolabs/sdk";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { addresses } from "../../constants";
import Image from "next/image";
import More from "./More";
import Community from "./Learn";
import Learn from "./Community";
import NavLink from "../NavLink";
import { Popover } from "@headlessui/react";
import Web3Status from "../Web3Status";
import { t } from "@lingui/macro";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { useETHBalances } from "../../state/wallet/hooks";
import { useLingui } from "@lingui/react";
import { useZoobalance } from "state/zoo/hooks";
import { CartItem } from "types/cart";
import { useAppSelector } from "state/hooks";
import CartSideNav from "components/CartSideNav";
import NetworkModal from "modals/NetworkModal";
import NetworkPopup from "modals/NetworkPopup";
import { useNetworkModalToggle } from "state/application/hooks";
import { ChevronLeftIcon } from "@heroicons/react/outline";

function DropTopBar(props: {
  banner?: boolean;
  isModal?: boolean;
  transparent?: boolean;
}): JSX.Element {
  const { i18n } = useLingui();
  const { account, chainId, library, connector } = useActiveWeb3React();
  const getZooBalance = useZoobalance();
  const toggleNetworkModal = useNetworkModalToggle();
  const { CartItems }: { CartItems: CartItem[] } = useAppSelector(
    (state) => state.store
  );
  const router = useRouter();

  let linkStyle =
    "p-2 text-baseline hover:text-green focus:text-high-emphesis md:p-3 whitespace-nowrap";

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];
  useEffect(() => {
    getZooBalance();
  }, [account, getZooBalance]);

  const chainAddresses =
    (addresses[chainId] as any) || (addresses[ChainId.BSC] as any);

  return (
    <header
      className={`absolute flex-shrink-0 w-full ${
        !props.transparent ? "bg-black" : "bg-transparent"
      } z-999`}
    >
      <Popover as="nav" className={`z-10 w-full bg-transparent`}>
        {({ open }) => (
          <>
            <div className="px-4 py-4 mx-auto max-w-7xl">
              <div className="flex items-center justify-between">
                {props.isModal ? (
                  <div className="p-3 bg-black rounded-full">
                    <ChevronLeftIcon
                      onClick={() => history.back()}
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <NavLink href="/">
                      <div className=" h-full pl-2 cursor-pointer logo w-[70px] flex">
                        <Image
                          src="/zoo.svg"
                          alt="Logo"
                          height="200px"
                          width="200px"
                        />
                      </div>
                    </NavLink>
                  </div>
                )}
                <div className="flex items-center justify-end w-full">
                  <div className=" w-3/4 text-xs flex flex-row-reverse items-center rounded p-0.5 whitespace-nowrap  font-bold select-none pointer-events-auto">
                    <More />
                    <div
                      className={`${
                        account &&
                        "flex flex-row-reverse items-center bg-[#212429] rounded-[10px] p-1"
                      }`}
                    >
                      <Web3Status
                        title={i18n._(t`Connect Wallet`)}
                        className="font-bold bg-black border border-green text-green"
                      />
                      {account && chainId && userEthBalance && (
                        <>
                          <NetworkPopup {...{ userEthBalance, NATIVE }} />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-dark-1000 lg:relative lg:p-0 lg:bg-transparent">
                    <CartSideNav />
                  </div>
                  <div className="flex -mr-2 sm:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                      <span className="sr-only">
                        {i18n._(t`Open main menu`)}
                      </span>
                      {open ? (
                        <svg
                          className="block w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="block w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      )}
                    </Popover.Button>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile View Navbar Dropdown */}
            <Popover.Panel className="sm:hidden">
              <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                <a
                  id={`marketplace`}
                  className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  href="/market"
                >
                  {i18n._(t`Marketplace`)}
                </a>
                <a
                  id={`chart`}
                  className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  href="https://dex.guru/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13-bsc"
                  target="_blank"
                  rel="noreferrer"
                >
                  {i18n._(t`Chart`)}
                </a>
                <Community />
                <Learn />
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <NetworkModal />
    </header>
  );
}

export default DropTopBar;
